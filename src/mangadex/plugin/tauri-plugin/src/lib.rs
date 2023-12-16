use std::{path::PathBuf, sync::Arc};

use app_state::OfflineAppState;
use async_graphql::{BatchRequest, EmptyMutation, EmptySubscription, Schema};
use mangadex_api::MangaDexClient;
use mangadex_desktop_api2::AppState;
use query::Query;
use reqwest::{
    header::{HeaderMap, HeaderValue, USER_AGENT},
    Client, StatusCode,
};
use tauri::{
    http::{header::InvalidHeaderValue, MimeType},
    plugin::Plugin,
};
use tauri::{
    plugin::{Builder, TauriPlugin},
    Manager, Runtime,
};
pub mod intelligent_notification_system;
pub mod utils;
use ins_handle::{
    check_plus_notify, init_ins_chapter_handle, reset_ins_handle, set_ins_chapter_checker_handle,
};
use serde::{ser::Serializer, Deserialize, Serialize};
use tokio::sync::RwLock;
use utils::set_indentifier;
pub mod ins_handle;
pub type Result<T> = std::result::Result<T, Error>;
use mizuki::MizukiPluginTrait;
pub mod app_state;
pub mod mutation;
pub mod objects;
pub mod query;

type Q = Query;
type M = EmptyMutation;
type S = EmptySubscription;

#[derive(Clone, serde::Serialize)]
struct ExportPayload {
    message: String,
}

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("an io error occured {0}")]
    Io(#[from] std::io::Error),
    #[error("An internal manager error occures : {0}")]
    InternalServerError(#[from] mangadex_desktop_api2::Error),
    #[error("Internal Tauri Error : {0}")]
    TauriError(#[from] tauri::Error),
    #[error("Serde json serialization error : {0}")]
    SerdeJsonError(#[from] serde_json::Error),
    #[error("reqwest crate error : {0}")]
    ReqwestError(#[from] reqwest::Error),
    #[error("invalid header value : {0}")]
    InvalidHeaderValue(#[from] InvalidHeaderValue),
}

impl Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

pub struct MangadexDesktopApi {
    pub schema: Schema<Q, M, S>,
    pub client: MangaDexClient,
    pub offline_app_state: OfflineAppState,
}

impl Default for MangadexDesktopApi {
    fn default() -> Self {
        let mut default_headers = HeaderMap::new();
        default_headers.append(
            USER_AGENT,
            HeaderValue::from_str("special-eureka 0.1.7").unwrap(),
        );
        let cli = Client::builder()
            .default_headers(default_headers)
            .build()
            .unwrap();
        Self {
            schema: Schema::new(Query, EmptyMutation, EmptySubscription),
            client: MangaDexClient::new(cli),
            offline_app_state: OfflineAppState(Arc::new(RwLock::new(None))),
        }
    }
}

impl MangadexDesktopApi {
    pub fn export_sdl(&self, path: PathBuf) -> std::io::Result<()> {
        <Self as MizukiPluginTrait<tauri::Wry, Q, M, S>>::export_sdl(self, path)
    }
}

impl<R> MizukiPluginTrait<R, Q, M, S> for MangadexDesktopApi
where
    R: Runtime,
{
    fn schema(&self) -> async_graphql::Schema<Q, M, S> {
        self.schema.clone()
    }
}

impl<R> Plugin<R> for MangadexDesktopApi
where
    R: Runtime,
{
    fn name(&self) -> &'static str {
        "mangadex-desktop-api"
    }
    fn initialize(
        &mut self,
        app: &tauri::AppHandle<R>,
        _config: serde_json::Value,
    ) -> tauri::plugin::Result<()> {
        let identifier = app.config().tauri.bundle.identifier.clone();
        match set_indentifier(identifier) {
            Ok(_) => (),
            Err(err) => {
                panic!("{}", err.to_string());
            }
        };
        #[cfg(debug_assertions)]
        {
            let schema = self.schema.clone();
            Builder::<R, ()>::new("mangadex-graphiql")
                .register_uri_scheme_protocol("mangadex", move |app, r| match r.uri() {
                    "graphql" => {
                        let schema = schema.clone();
                        let window = r
                            .headers()
                            .iter()
                            .find(|(k, _)| "window" == *k)
                            .map(|(_, v)| v)
                            .and_then(move |i| app.get_window(i.to_str().ok()?))
                            .ok_or(std::io::Error::new(
                                std::io::ErrorKind::NotFound,
                                "Window header not found",
                            ))?;
                        tauri::async_runtime::block_on(async move {
                            let mut resp = tauri::http::ResponseBuilder::new();
                            let req: BatchRequest = serde_json::from_slice(r.body())?;
                            let res = schema
                                .clone()
                                .execute_batch(req.data(app.clone()).data(window.clone()))
                                .await;
                            for (n, v) in res.http_headers_iter() {
                                resp = resp.header(n, v);
                            }
                            resp.mimetype(MimeType::Json.to_string().as_str())
                                .status(StatusCode::ACCEPTED)
                                .body(serde_json::to_vec(&res)?)
                        })
                    }
                    _ => tauri::http::ResponseBuilder::new()
                        .status(StatusCode::NOT_FOUND)
                        .mimetype(MimeType::Txt.to_string().as_str())
                        .body(Vec::new()),
                })
                .build()
                .initialize(app, _config)?;
        }

        app.manage(self.offline_app_state.clone());
        app.manage(self.client.clone());
        init_ins_chapter_handle()?;
        set_ins_chapter_checker_handle(std::thread::spawn(|| loop {
            match check_plus_notify() {
                Ok(()) => (),
                Err(error) => {
                    println!("{}", error.to_string());
                }
            }
            std::thread::sleep(std::time::Duration::from_millis(500));
        }))?;
        Ok(())
    }
    fn extend_api(&mut self, invoke: tauri::Invoke<R>) {
        <Self as MizukiPluginTrait<R, Q, M, S>>::extend_api(self, invoke);
    }
}
