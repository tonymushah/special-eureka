use std::{io::Read, ops::Add, path::PathBuf};

use app_state::{LastTimeTokenWhenFecthed, OfflineAppState};
use async_graphql::{EmptySubscription, Schema};
use bytes::{Bytes, BytesMut};
use mangadex_api::{MangaDexClient, CDN_URL};
use mangadex_api_schema_rust::v5::{oauth::ClientInfo as Info, AuthTokens};
use mangadex_api_types_rust::MangaDexDateTime;
use mutation::Mutation;
use regex::Regex;
use store::{
    get_store_builder,
    types::{
        structs::{client_info::ClientInfoStore, refresh_token::RefreshTokenStore},
        ExtractFromStore,
    },
};
// use mangadex_desktop_api2::AppState;
use query::Query;
use reqwest::{
    header::{HeaderMap, HeaderValue, USER_AGENT},
    Client, StatusCode,
};
use tauri::{
    http::{header::InvalidHeaderValue, MimeType},
    plugin::Plugin,
};
use tauri::{plugin::Builder, Manager, Runtime};
pub mod intelligent_notification_system;
pub mod utils;
use ins_handle::{check_plus_notify, init_ins_chapter_handle, set_ins_chapter_checker_handle};
use serde::{ser::Serializer, Serialize};
use tauri_plugin_store::Store;
use tokio::time::{Duration, Instant};
use url::Url;
use utils::set_indentifier;
pub mod ins_handle;
pub type Result<T> = std::result::Result<T, Error>;
use mizuki::MizukiPluginTrait;
use uuid::Uuid;

pub mod app_state;
pub mod mutation;
pub mod objects;
pub mod query;
pub mod store;

type Q = Query;
type M = Mutation;
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
    pub last_time_fetched: LastTimeTokenWhenFecthed,
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
            schema: Schema::new(Query, Mutation, EmptySubscription),
            client: MangaDexClient::new(cli),
            offline_app_state: Default::default(),
            last_time_fetched: Default::default(),
        }
    }
}

impl MangadexDesktopApi {
    pub fn export_sdl(&self, path: PathBuf) -> std::io::Result<()> {
        <Self as MizukiPluginTrait<tauri::Wry, Q, M, S>>::export_sdl(self, path)
    }
    pub fn register_uri_scheme_protocol<R: Runtime>(
        &self,
        app: &tauri::AppHandle<R>,
        config: serde_json::Value,
    ) -> tauri::plugin::Result<()> {
        Builder::<R, ()>::new("mangadex-graphiql")
            .register_uri_scheme_protocol("mangadex", move |app, r| {
                let bad_request = tauri::http::ResponseBuilder::new()
                    .header("access-control-allow-origin", "*")
                    .status(StatusCode::BAD_REQUEST)
                    .mimetype(MimeType::Txt.to_string().as_str())
                    .body(Vec::new());
                let not_found = tauri::http::ResponseBuilder::new()
                    .header("access-control-allow-origin", "*")
                    .status(StatusCode::NOT_FOUND)
                    .mimetype(MimeType::Txt.to_string().as_str())
                    .body(Vec::new());
                let not_loaded = tauri::http::ResponseBuilder::new()
                    .header("access-control-allow-origin", "*")
                    .status(StatusCode::INTERNAL_SERVER_ERROR)
                    .mimetype(MimeType::Txt.to_string().as_str())
                    .body(b"Offline App State is not loaded".to_vec());
                if let Some(offline_app_state) = app.try_state::<OfflineAppState>() {
                    let app_state_read = offline_app_state.blocking_read();
                    if let Some(app_state) = app_state_read.as_ref() {
                        if let Ok(uri) = Url::parse(r.uri()) {
                            if uri.domain() == Some("chapter") {
                                if let Ok(regex) = Regex::new(r"(?x)/(?P<chapter_id>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/(?P<mode>data|data-saver)/(?P<filename>\w*.*)") {
                                    if let Some(res) = regex.captures(uri.path()) {
                                        if let Some(chapter_id) = res.name("chapter_id").and_then(|id| Uuid::parse_str(id.as_str()).ok()) {
                                            let chapter_util = app_state.chapter_utils().with_id(chapter_id);
                                                if let Some(mode) = res.name("mode").and_then(|mode| {
                                                    match mode.as_str() {
                                                        "data" => Some(ChapterMode::Data),
                                                        "data-saver" => Some(ChapterMode::DataSaver),
                                                        _ => None
                                                    }
                                                }) {
                                                    if let Some(filename) = res.name("filename").map(|f| f.as_str()) {
                                                        let body: Bytes = {
                                                            let mut to_res = BytesMut::new();
                                                                match mode {
                                                                    ChapterMode::Data => {
                                                                        let res = chapter_util.get_data_image(filename).and_then(|mut buf_reader| {
                                                                            buf_reader.read_exact(&mut to_res)?;
                                                                            Ok(())
                                                                        });
                                                                        if res.is_err() {
                                                                            return not_found;
                                                                        }
                                                                    }
                                                                    ChapterMode::DataSaver => {
                                                                    let res = chapter_util.get_data_saver_image(filename).and_then(|mut buf_reader| {
                                                                    buf_reader.read_exact(&mut to_res)?;
                                                                    Ok(())
                                                                    });
                                                                    if res.is_err() {
                                                                        return not_found;
                                                                    }
                                                                }
                                                            };
                                                        to_res.into()
                                                    };
                                                    tauri::http::ResponseBuilder::new()
                                                        .header("access-control-allow-origin", "*")
                                                        .status(StatusCode::OK)
                                                        // TODO Add jpeg mimetype
                                                        .mimetype("image/jpeg")
                                                        .body(body.to_vec())
                                                }else {
                                                    not_found
                                                }
                                            }else {
                                                not_found
                                            }
                                        }else {
                                            not_found
                                        }
                                    }else {
                                        not_found
                                    }
                                }else {
                                    bad_request
                                }
                            } else if uri.domain() == Some("covers") {
                                let _client = app.try_state::<MangaDexClient>();
                                if let Some(client) = _client {
                                    if let Ok(regex) = Regex::new(r"(?x)/(?P<cover_id>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/(?P<filename>\w*.*)") {
                                        if let Some(res) = regex.captures(uri.path()) {
                                            if let Some(cover_id) = res.name("cover_id").and_then(|id| Uuid::parse_str(id.as_str()).ok()) {
                                                if let Some(filename) = res.name("filename").map(|f| f.as_str()) {
                                                    let body: Bytes = {
                                                        let cover_utils = app_state.cover_utils().with_id(cover_id);
                                                        let mut to_res = BytesMut::new();
                                                        if let Some(manga_id) = uri.query_pairs().find(|(k, _)| k == "mangaId").map(|(_,v)| {v.to_string()}).and_then(|id| Uuid::parse_str(&id).ok()) {
                                                            let cli = client.get_http_client().blocking_read().client.clone();
                                                            let url = {
                                                                let filename_ = uri.query_pairs().find(|(k, _)| k == "mode").map(|(_,v)| {v.to_string()}).and_then(|m| match m.as_str() {
                                                                    "256" => Some(256),
                                                                    "512" => Some(512),
                                                                    _ => None
                                                                }).map(|quality| format!("{filename}.{quality}.png")).unwrap_or(filename.to_string());

                                                                Url::parse(format!("{CDN_URL}/covers/{manga_id}/{filename_}").as_str())
                                                            };
                                                            
                                                            if let Ok(res) = tauri::async_runtime::block_on(async move {
                                                                let b = cli.get(url?).send().await?.bytes().await?;
                                                                Ok::<Bytes, mangadex_api_types_rust::error::Error>(b)
                                                            }) {
                                                                to_res.extend_from_slice(&res);
                                                            }else {
                                                                let _ = cover_utils.get_image_buf_reader().and_then(|mut buf_reader| {
                                                                    buf_reader.read_exact(&mut to_res)?;
                                                                    Ok(())
                                                                });
                                                            }
                                                        }else {
                                                            let _ = cover_utils.get_image_buf_reader().and_then(|mut buf_reader| {
                                                                    buf_reader.read_exact(&mut to_res)?;
                                                                    Ok(())
                                                                });
                                                        }
                                                        to_res.into()
                                                    };
                                                    if body.is_empty() {
                                                        not_found
                                                    } else {
                                                        tauri::http::ResponseBuilder::new()
                                                            .header("access-control-allow-origin", "*")
                                                            .status(StatusCode::OK)
                                                            // TODO Add jpeg mimetype
                                                            .mimetype("image/jpeg")
                                                            .body(body.to_vec())
                                                    }
                                                }else {
                                                    not_found
                                                }
                                            }else {
                                                not_found
                                            }
                                        }else {
                                            not_found
                                        }
                                    }else {
                                        not_found
                                    }
                                }else {
                                    not_found
                                }
                            }else {
                                not_found
                            }
                        } else {
                            bad_request
                        }
                    }else {
                        not_loaded
                    }
                } else {
                    not_loaded
                }
            })
            .build()
            .initialize(app, config)
    }
    pub fn init_client_state<R: Runtime>(
        &mut self,
        app: &tauri::AppHandle<R>,
        store: &Store<R>,
    ) -> tauri::plugin::Result<()> {
        let cis = ClientInfoStore::extract_from_store(store)?;
        let r_token_store = RefreshTokenStore::extract_from_store(store)?;
        let last_time_fetched = self.last_time_fetched.clone();
        let ltf = last_time_fetched.clone();
        let mut client = self.client.clone();
        if let Some(info) = cis.as_ref().map(|i| -> Info { i.clone().into() }) {
            client = tauri::async_runtime::block_on(async move {
                client.set_client_info(&info).await?;
                Ok::<MangaDexClient, mangadex_api_types_rust::error::Error>(client)
            })?;
        }
        if let Some(auth_tokens) = r_token_store.as_ref().and_then(|i| -> Option<AuthTokens> {
            if i.expires_in.as_ref() < MangaDexDateTime::default().as_ref() {
                None
            } else {
                Some(i.clone().into())
            }
        }) {
            client = tauri::async_runtime::block_on(async move {
                client.set_auth_tokens(&auth_tokens).await?;
                if let Ok(res) = client.oauth().refresh().send().await {
                    let mut last_time_fetched_write = ltf.write().await;
                    let _ = last_time_fetched_write
                        .replace(Instant::now().add(Duration::from_secs(res.expires_in as u64)));
                } else {
                    let mut last_time_fetched_write = ltf.write().await;
                    let _ = last_time_fetched_write.replace(Instant::now());
                }
                Ok::<MangaDexClient, mangadex_api_types_rust::error::Error>(client)
            })?;
        }
        app.manage(client);
        app.manage(last_time_fetched);
        Ok(())
    }
    pub fn init_states<R: Runtime>(
        &mut self,
        app: &tauri::AppHandle<R>,
        _config: &serde_json::Value,
    ) -> tauri::plugin::Result<()> {
        let mut store = get_store_builder(app.app_handle())?.build();
        let _ = store.load();

        self.init_client_state(app, &store)?;
        app.manage(self.offline_app_state.clone());

        Ok(())
    }
    pub fn ins_handle<R: Runtime>(&self, app: &tauri::AppHandle<R>) -> tauri::plugin::Result<()> {
        let identifier = app.config().tauri.bundle.identifier.clone();
        match set_indentifier(identifier) {
            Ok(_) => (),
            Err(err) => {
                panic!("{}", err.to_string());
            }
        };

        init_ins_chapter_handle()?;
        set_ins_chapter_checker_handle(std::thread::spawn(|| loop {
            match check_plus_notify() {
                Ok(()) => (),
                Err(error) => {
                    println!("{}", error);
                }
            }
            std::thread::sleep(std::time::Duration::from_millis(500));
        }))?;
        Ok(())
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
        config: serde_json::Value,
    ) -> tauri::plugin::Result<()> {
        self.init_states(app, &config)?;
        self.register_uri_scheme_protocol(app, config)?;
        self.ins_handle(app)
    }
    fn extend_api(&mut self, invoke: tauri::Invoke<R>) {
        <Self as MizukiPluginTrait<R, Q, M, S>>::extend_api(self, invoke);
    }
}

/*
    <https://regex101.com/r/rI3jhp/1>
    might be usefule in the future

*/

enum ChapterMode {
    Data,
    DataSaver,
}
