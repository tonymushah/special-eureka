use std::{ops::Add, time::Duration};

use mangadex_api::MangaDexClient;
use mangadex_api_schema_rust::v5::{oauth::ClientInfo as Info, AuthTokens};
use mangadex_api_types_rust::MangaDexDateTime;
use tauri::{Manager, Runtime};
use tauri_plugin_store::Store;
use tokio::time::Instant;

use crate::{
    app_state::LastTimeTokenWhenFecthed,
    store::types::{
        structs::{client_info::ClientInfoStore, refresh_token::RefreshTokenStore},
        ExtractFromStore,
    },
    utils::watch::{SendData, Watches},
};

pub fn init_client_state<R: Runtime>(
    app: &tauri::AppHandle<R>,
    store: &Store<R>,
) -> crate::PluginSetupResult<()> {
    let app_clone = app.clone();
    let cis = ClientInfoStore::extract_from_store(store)?;
    let r_token_store = RefreshTokenStore::extract_from_store(store)?;
    let last_time_fetched: LastTimeTokenWhenFecthed = Default::default();
    let ltf = last_time_fetched.clone();
    let client = app.state::<MangaDexClient>();
    let _ci = (*client).clone();
    if let Some(info) = cis.as_ref().map(|i| -> Info { i.clone().into() }) {
        crate::utils::block_on(async move {
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
        log::debug!("valid auth tokens");
        tauri::async_runtime::spawn(async move {
            let client = app_clone.state::<MangaDexClient>();
            let watches = app_clone.state::<Watches>();
            client.set_auth_tokens(&auth_tokens).await?;

            match client.oauth().refresh().send().await {
                Ok(res) => {
                    let mut last_time_fetched_write = ltf.write().await;
                    let _ = last_time_fetched_write
                        .replace(Instant::now().add(Duration::from_secs(res.expires_in as u64)));
                    let _ = watches.is_logged.send_data(true);
                }
                Err(err) => {
                    let mut last_time_fetched_write = ltf.write().await;
                    let _ = last_time_fetched_write.replace(Instant::now());
                    let _ = watches.is_logged.send_data(false);
                    log::error!("{}", err);
                }
            }
            Ok::<(), mangadex_api_types_rust::error::Error>(())
        });
    }
    app.manage(last_time_fetched);
    Ok(())
}
