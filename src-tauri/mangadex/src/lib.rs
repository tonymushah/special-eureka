use std::{
    ops::Add,
    path::{Path, PathBuf},
};

use app_state::{LastTimeTokenWhenFecthed, OfflineAppState};
use async_graphql::Schema;
use mangadex_api::MangaDexClient;
use mangadex_api_schema_rust::v5::{oauth::ClientInfo as Info, AuthTokens};
use mangadex_api_types_rust::MangaDexDateTime;
use mutation::Mutation;
use scheme::{chapters::handle_chapters, covers::handle_covers, invalid_url_input, not_found};
use store::{
    get_store_builder,
    types::{
        enums::{
            direction::{reading::ReadingDirectionStore, sidebar::SidebarDirectionStore},
            reading_mode::ReadingModeStore,
        },
        structs::{
            chapter_language::ChapterLanguagesStore, client_info::ClientInfoStore,
            refresh_token::RefreshTokenStore,
        },
        ExtractFromStore,
    },
};
// use mangadex_desktop_api2::AppState;
use ins_handle::{check_plus_notify, init_ins_chapter_handle, set_ins_chapter_checker_handle};
use query::Query;
use reqwest::{
    header::{HeaderMap, HeaderValue, USER_AGENT},
    Client,
};
use serde::{ser::Serializer, Serialize};
use tauri::{http::header::InvalidHeaderValue, plugin::Plugin};
use tauri::{plugin::Builder, Manager, Runtime};
use tauri_plugin_store::Store;
use tokio::time::{Duration, Instant};
use url::Url;
use utils::{
    set_indentifier,
    store::MangaDexStoreState,
    watch::{SendData, Watches},
};

pub type Result<T> = std::result::Result<T, Error>;
use mizuki::MizukiPluginTrait;
use subscription::Subscriptions;

pub mod app_state;
pub mod ins_handle;
pub mod intelligent_notification_system;
pub mod mutation;
pub mod objects;
pub mod query;
pub mod scheme;
pub mod store;
pub mod subscription;
pub mod utils;

type Q = Query;
type M = Mutation;
type S = Subscriptions;

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
            schema: Schema::new(Query, Mutation, Subscriptions),
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
            .register_uri_scheme_protocol("mangadex", move |app, req| {
                if let Ok(uri) = Url::parse(req.uri()) {
                    if uri.domain() == Some("chapter") {
                        handle_chapters(app, req)
                    } else if uri.domain() == Some("covers") {
                        handle_covers(app, req)
                    } else {
                        not_found(String::from("The given domain is not defined").into_bytes())
                    }
                } else {
                    invalid_url_input()
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
        let watches = app.state::<Watches>();
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

                if let Ok(Ok(res)) = tokio::time::timeout(Duration::from_secs(5), async {
                    client.oauth().refresh().send().await
                })
                .await
                {
                    let mut last_time_fetched_write = ltf.write().await;
                    let _ = last_time_fetched_write
                        .replace(Instant::now().add(Duration::from_secs(res.expires_in as u64)));
                    let _ = watches.is_logged.send_data(true);
                } else {
                    let mut last_time_fetched_write = ltf.write().await;
                    let _ = last_time_fetched_write.replace(Instant::now());
                    let _ = watches.is_logged.send_data(false);
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
        self.init_watches_states(app, &store)?;
        self.init_client_state(app, &store)?;
        app.manage(self.offline_app_state.clone());
        app.manage(MangaDexStoreState::new_from_store(store));
        Ok(())
    }
    pub fn init_watches_states<R: Runtime>(
        &self,
        app: &tauri::AppHandle<R>,
        store: &Store<R>,
    ) -> tauri::plugin::Result<()> {
        let watches = Watches::default();
        let _ = watches
            .reading_mode
            .send_data(ReadingModeStore::extract_from_store(store)?);
        let _ = watches
            .chapter_languages
            .send_data(ChapterLanguagesStore::extract_from_store(store)?);
        let _ = watches
            .page_direction
            .send_data(ReadingDirectionStore::extract_from_store(store)?);
        let _ = watches
            .sidebar_direction
            .send_data(SidebarDirectionStore::extract_from_store(store)?);
        app.manage(watches);
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
        #[cfg(debug_assertions)]
        self.export_sdl(Path::new("../src/lib/mangadex/schemas.graphqls").to_path_buf())?;
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
