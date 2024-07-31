pub mod chapters;
pub mod covers;

use std::error::Error;

use tauri::{
    http::{status::StatusCode, MimeType, Request},
    plugin::{Builder, Plugin},
    AppHandle, Manager, Runtime, State,
};
use url::Url;

use crate::app_state::OfflineAppState;

use self::{chapters::handle_chapters, covers::handle_covers};

type SchemeResponse = Result<tauri::http::Response, Box<dyn std::error::Error>>;

#[derive(Debug, Default)]
pub enum SchemeResponseError {
    BadRequest(Vec<u8>),
    NotFound(Vec<u8>),
    NotLoaded,
    #[default]
    InvalidURLInput,
    InternalError(Box<dyn Error>),
}

impl From<SchemeResponseError> for SchemeResponse {
    fn from(value: SchemeResponseError) -> Self {
        match value {
            SchemeResponseError::BadRequest(body) => tauri::http::ResponseBuilder::new()
                .header("access-control-allow-origin", "*")
                .status(StatusCode::BAD_REQUEST)
                .mimetype(MimeType::Txt.to_string().as_str())
                .body(body),
            SchemeResponseError::NotFound(body) => tauri::http::ResponseBuilder::new()
                .header("access-control-allow-origin", "*")
                .status(StatusCode::NOT_FOUND)
                .mimetype(MimeType::Txt.to_string().as_str())
                .body(body),
            SchemeResponseError::NotLoaded => tauri::http::ResponseBuilder::new()
                .header("access-control-allow-origin", "*")
                .status(StatusCode::INTERNAL_SERVER_ERROR)
                .mimetype(MimeType::Txt.to_string().as_str())
                .body(b"Offline App State is not loaded".to_vec()),
            SchemeResponseError::InvalidURLInput => tauri::http::ResponseBuilder::new()
                .status(StatusCode::NOT_ACCEPTABLE)
                .header("access-control-allow-origin", "*")
                .mimetype(MimeType::Txt.to_string().as_str())
                .body(String::from("invalid url input").into_bytes()),
            SchemeResponseError::InternalError(error) => tauri::http::ResponseBuilder::new()
                .status(StatusCode::INTERNAL_SERVER_ERROR)
                .header("access-control-allow-origin", "*")
                .mimetype(MimeType::Txt.to_string().as_str())
                .body(error.to_string().into()),
        }
    }
}

pub type SchemeResponseResult<T, E = SchemeResponseError> = Result<T, E>;

impl<E: Error + 'static> From<E> for SchemeResponseError {
    fn from(value: E) -> Self {
        Self::InternalError(Box::new(value))
    }
}

trait IntoResponse {
    fn into_response(self) -> SchemeResponse;
}

impl IntoResponse for SchemeResponseError {
    fn into_response(self) -> SchemeResponse {
        self.into()
    }
}

impl IntoResponse for SchemeResponse {
    fn into_response(self) -> SchemeResponse {
        self
    }
}

impl<T: IntoResponse, E: IntoResponse> IntoResponse for Result<T, E> {
    fn into_response(self) -> SchemeResponse {
        match self {
            Ok(d) => d.into_response(),
            Err(er) => er.into_response(),
        }
    }
}

impl<E: IntoResponse> IntoResponse for Result<tauri::http::Response, E> {
    fn into_response(self) -> SchemeResponse {
        match self {
            Ok(resp) => Ok(resp),
            Err(err) => err.into_response(),
        }
    }
}

pub fn parse_uri(req: &Request) -> SchemeResponseResult<Url> {
    Ok(Url::parse(req.uri())?)
}
pub fn get_offline_app_state<R: Runtime>(
    app: &AppHandle<R>,
) -> SchemeResponseResult<State<'_, OfflineAppState>> {
    app.try_state::<OfflineAppState>()
        .ok_or(SchemeResponseError::NotLoaded)
}

pub fn register_scheme<R: Runtime>(
    app: &AppHandle<R>,
    config: serde_json::Value,
) -> tauri::plugin::Result<()> {
    Builder::<R, ()>::new("mangadex-graphiql")
        .register_uri_scheme_protocol("mangadex", move |app, req| match parse_uri(req) {
            Ok(uri) => {
                if uri.domain() == Some("chapter") {
                    handle_chapters(app, req).into_response()
                } else if uri.domain() == Some("covers") {
                    handle_covers(app, req).into_response()
                } else {
                    SchemeResponseError::NotFound(
                        String::from("The given domain is not defined").into_bytes(),
                    )
                    .into()
                }
            }
            Err(error) => error.into(),
        })
        .build()
        .initialize(app, config)
}
