use std::{
    fs::File,
    io::{BufWriter, Write},
    ops::Add,
    time::Duration,
};

use async_graphql::Schema;
use mangadex_api::MangaDexClient;
use mangadex_api_schema_rust::v5::{oauth::ClientInfo as Info, AuthTokens};
use mangadex_api_types_rust::MangaDexDateTime;
use reqwest::{
    header::{HeaderMap, HeaderValue, USER_AGENT},
    Client,
};
use serde::Deserialize;
use serde_json::Value;
use tauri::{plugin::Result, AppHandle, Manager, Runtime};
use tauri_plugin_store::Store;
use tokio::time::Instant;

use crate::{
    app_state::{LastTimeTokenWhenFecthed, OfflineAppState},
    ins_handle::{check_plus_notify, init_ins_chapter_handle, set_ins_chapter_checker_handle},
    scheme::register_scheme,
    store::{
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
    },
    utils::{
        set_indentifier,
        store::MangaDexStoreState,
        watch::{SendData, Watches},
    },
    M, Q, S,
};

#[derive(Debug, Clone, Deserialize)]
struct PluginConfig {
    #[serde(default)]
    user_agent: Option<String>,
    #[serde(default)]
    timeout: Option<f64>,
    sdl_export_path: String,
}

fn register_uri_scheme_protocol<R: Runtime>(app: &AppHandle<R>, config: Value) -> Result<()> {
    register_scheme(app, config)
}

fn register_mangadex_client<R: Runtime>(
    app: &tauri::AppHandle<R>,
    config: &PluginConfig,
) -> Result<()> {
    let mut default_headers = HeaderMap::new();
    let default_user_agent = String::from("special-eureka 0.2.0");
    default_headers.append(
        USER_AGENT,
        HeaderValue::from_str(config.user_agent.as_ref().unwrap_or(&default_user_agent))?,
    );
    let mut cli_builder = Client::builder().default_headers(default_headers);
    if let Some(timeout) = config.timeout {
        cli_builder = cli_builder.timeout(Duration::from_secs_f64(timeout));
    }
    app.manage(MangaDexClient::new(cli_builder.build()?));
    Ok(())
}

fn init_client_state<R: Runtime>(
    app: &tauri::AppHandle<R>,
    store: &Store<R>,
) -> tauri::plugin::Result<()> {
    let watches = app.state::<Watches>();
    let cis = ClientInfoStore::extract_from_store(store)?;
    let r_token_store = RefreshTokenStore::extract_from_store(store)?;
    let last_time_fetched: LastTimeTokenWhenFecthed = Default::default();
    let ltf = last_time_fetched.clone();
    let client = app.state::<MangaDexClient>();
    let _ci = client.clone();
    if let Some(info) = cis.as_ref().map(|i| -> Info { i.clone().into() }) {
        tauri::async_runtime::block_on(async move {
            _ci.set_client_info(&info).await?;
            Ok::<(), mangadex_api_types_rust::error::Error>(())
        })?;
    }
    if let Some(auth_tokens) = r_token_store.as_ref().and_then(|i| -> Option<AuthTokens> {
        if i.expires_in.as_ref() < MangaDexDateTime::default().as_ref() {
            None
        } else {
            Some(i.clone().into())
        }
    }) {
        tauri::async_runtime::block_on(async move {
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
            Ok::<(), mangadex_api_types_rust::error::Error>(())
        })?;
    }
    app.manage(last_time_fetched);
    Ok(())
}

fn init_watches_states<R: Runtime>(
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

fn init_states<R: Runtime>(
    app: &tauri::AppHandle<R>,
    _config: &serde_json::Value,
) -> tauri::plugin::Result<()> {
    let mut store = get_store_builder(app.app_handle())?.build();
    let _ = store.load();
    init_watches_states(app, &store)?;
    init_client_state(app, &store)?;
    app.manage(OfflineAppState::default());
    app.manage(MangaDexStoreState::new_from_store(store));
    Ok(())
}

fn ins_handle<R: Runtime>(app: &tauri::AppHandle<R>) -> tauri::plugin::Result<()> {
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
fn export_sdl(schema: &Schema<Q, M, S>, config: &PluginConfig) -> tauri::plugin::Result<()> {
    let mut file_bufw = BufWriter::new(File::create(config.sdl_export_path.as_str())?);
    file_bufw.write_all(schema.sdl().as_bytes())?;
    file_bufw.flush()?;
    Ok(())
}

pub fn setup<R: Runtime>(
    app: &AppHandle<R>,
    config: Value,
    schema: &Schema<Q, M, S>,
) -> tauri::plugin::Result<()> {
    let plug_config: PluginConfig = serde_json::from_value(config.clone())?;
    #[cfg(debug_assertions)]
    export_sdl(schema, &plug_config)?;
    register_mangadex_client(app, &plug_config)?;
    init_states(app, &config)?;
    register_uri_scheme_protocol(app, config)?;
    ins_handle(app)?;
    Ok(())
}
