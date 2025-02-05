pub mod chapters;
pub mod covers;
pub mod favicon;

use std::{
    error::Error,
    ops::{Deref, DerefMut},
    sync::Mutex,
    thread::JoinHandle,
};

use reqwest::header::{ACCESS_CONTROL_ALLOW_ORIGIN, CONTENT_TYPE};
use tauri::{
    http::{status::StatusCode, Request, Response},
    plugin::{Builder, Plugin},
    utils::mime_type::MimeType,
    AppHandle, Manager, Runtime, State,
};
use url::Url;

use crate::app_state::OfflineAppState;

use self::{chapters::handle_chapters, covers::handle_covers, favicon::handle_favicon};

#[derive(Debug, Default)]
pub enum SchemeResponseError {
    BadRequest(Vec<u8>),
    NotFound(Vec<u8>),
    NotLoaded,
    #[default]
    InvalidURLInput,
    InternalError(Box<dyn Error>),
}

impl From<SchemeResponseError> for Response<Vec<u8>> {
    fn from(value: SchemeResponseError) -> Self {
        match value {
            SchemeResponseError::BadRequest(body) => tauri::http::Response::builder()
                .header(ACCESS_CONTROL_ALLOW_ORIGIN, "*")
                .status(StatusCode::BAD_REQUEST)
                .header(CONTENT_TYPE, MimeType::Txt.to_string().as_str())
                .body(body)
                .unwrap(),
            SchemeResponseError::NotFound(body) => tauri::http::Response::builder()
                .header(ACCESS_CONTROL_ALLOW_ORIGIN, "*")
                .status(StatusCode::NOT_FOUND)
                .header(CONTENT_TYPE, MimeType::Txt.to_string().as_str())
                .body(body)
                .unwrap(),
            SchemeResponseError::NotLoaded => tauri::http::Response::builder()
                .header(ACCESS_CONTROL_ALLOW_ORIGIN, "*")
                .status(StatusCode::INTERNAL_SERVER_ERROR)
                .header(CONTENT_TYPE, MimeType::Txt.to_string().as_str())
                .body(b"Offline App State is not loaded".to_vec())
                .unwrap(),
            SchemeResponseError::InvalidURLInput => tauri::http::Response::builder()
                .status(StatusCode::NOT_ACCEPTABLE)
                .header(ACCESS_CONTROL_ALLOW_ORIGIN, "*")
                .header(CONTENT_TYPE, MimeType::Txt.to_string().as_str())
                .body(String::from("invalid url input").into_bytes())
                .unwrap(),
            SchemeResponseError::InternalError(error) => tauri::http::Response::builder()
                .header(ACCESS_CONTROL_ALLOW_ORIGIN, "*")
                .status(StatusCode::INTERNAL_SERVER_ERROR)
                .header(CONTENT_TYPE, MimeType::Txt.to_string().as_str())
                .body(error.to_string().into())
                .unwrap(),
        }
    }
}

trait IntoResponse {
    fn into_response(self) -> Response<Vec<u8>>;
}

impl IntoResponse for Response<Vec<u8>> {
    fn into_response(self) -> Response<Vec<u8>> {
        self
    }
}

impl IntoResponse for SchemeResponseError {
    fn into_response(self) -> Response<Vec<u8>> {
        self.into()
    }
}

impl<T: IntoResponse, E: IntoResponse> IntoResponse for Result<T, E> {
    fn into_response(self) -> Response<Vec<u8>> {
        match self {
            Ok(d) => d.into_response(),
            Err(er) => er.into_response(),
        }
    }
}

type SchemeResponseResult<T> = Result<T, SchemeResponseError>;

impl<E: Error + 'static> From<E> for SchemeResponseError {
    fn from(err: E) -> Self {
        SchemeResponseError::InternalError(Box::new(err))
    }
}

pub fn parse_uri(req: &Request<Vec<u8>>) -> SchemeResponseResult<Url> {
    Ok(Url::parse(req.uri().to_string().as_str())?)
}
pub fn get_offline_app_state<R: Runtime>(
    app: &AppHandle<R>,
) -> SchemeResponseResult<State<'_, OfflineAppState>> {
    app.try_state::<OfflineAppState>()
        .ok_or(SchemeResponseError::NotLoaded)
}

struct ResponsesThreads(Vec<JoinHandle<()>>);

impl Deref for ResponsesThreads {
    type Target = Vec<JoinHandle<()>>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ResponsesThreads {
    fn deref_mut(&mut self) -> &mut Self::Target {
        self.0.retain(|e| !e.is_finished());
        &mut self.0
    }
}

fn handle<R: Runtime>(app: AppHandle<R>, req: Request<Vec<u8>>) -> Response<Vec<u8>> {
    match parse_uri(&req) {
        Ok(uri) => {
            let not_found = SchemeResponseError::NotFound(
                String::from("The given domain is not defined").into_bytes(),
            )
            .into();
            if let Some(domain) = uri.domain() {
                match domain {
                    "chapter" => handle_chapters(&app, &req).into_response(),
                    "covers" => handle_covers(&app, &req).into_response(),
                    "favicons" => handle_favicon(&app, &req).into_response(),
                    _ => not_found,
                }
            } else {
                not_found
            }
        }
        Err(error) => error.into(),
    }
}

type ResponsesThreadsMut = Mutex<ResponsesThreads>;

pub fn register_scheme<R: Runtime>(
    app: &AppHandle<R>,
    config: serde_json::Value,
) -> crate::PluginSetupResult<()> {
    Builder::<R, ()>::new("mangadex-scheme")
        .register_asynchronous_uri_scheme_protocol("mangadex", |context, req, responder| {
            let app = context.app_handle().clone();
            let j_hoindle = std::thread::spawn(move || {
                responder.respond(handle(app, req));
            });
            if let Some(hs) = context.app_handle().try_state::<ResponsesThreadsMut>() {
                if hs.is_poisoned() {
                    hs.clear_poison();
                }
                if let Ok(mut lock) = hs.lock() {
                    lock.push(j_hoindle);
                }
            } else {
                context
                    .app_handle()
                    .manage(Mutex::new(ResponsesThreads(vec![j_hoindle])));
            }
        })
        .build()
        .initialize(app, config)
}
