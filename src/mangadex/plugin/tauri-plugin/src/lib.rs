use std::sync::Arc;

use app_state::OfflineAppState;
use async_graphql::{EmptyMutation, EmptySubscription, Schema};
use mangadex_api::MangaDexClient;
use mangadex_desktop_api2::AppState;
use query::Query;
use reqwest::{
    header::{HeaderMap, HeaderValue, USER_AGENT},
    Client,
};
use tauri::http::header::InvalidHeaderValue;
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

impl<R> MizukiPluginTrait<R, Q, M, S> for MangadexDesktopApi
where
    R: Runtime,
{
    fn name(&self) -> &'static str {
        "mangadex-desktop-api"
    }

    fn schema(&self) -> async_graphql::Schema<Q, M, S> {
        self.schema.clone()
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
}
