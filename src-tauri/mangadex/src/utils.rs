use mangadex_api::MangaDexClient;
use once_cell::sync::OnceCell;
use std::{io::Result, ops::Add};
use tauri::{AppHandle, Manager, Runtime, State, Window};
use tokio::time::{Duration, Instant};

use crate::app_state::{inner::AppStateInner, LastTimeTokenWhenFecthed, OfflineAppState};

use self::{
    store::MangaDexStoreState,
    watch::{SendData, Watches},
};
static mut INDENTIFIER: OnceCell<String> = OnceCell::new();

pub mod download_state;
pub mod source;
pub mod store;
pub mod watch;

pub fn set_indentifier(identifier: String) -> Result<()> {
    match std::thread::spawn(move || -> Result<()> {
        unsafe {
            match INDENTIFIER.set(identifier) {
                Ok(_) => Ok(()),
                Err(_) => Err(std::io::Error::new(
                    std::io::ErrorKind::AlreadyExists,
                    "The identifier already setted",
                )),
            }
        }
    })
    .join()
    {
        Ok(res) => res,
        Err(_) => Err(std::io::Error::new(
            std::io::ErrorKind::Other,
            "Error on loading notification handle",
        )),
    }
}

pub fn get_indentifier() -> Result<&'static String> {
    let data_: &'static String;
    unsafe {
        match INDENTIFIER.get() {
            None => {
                return Err(std::io::Error::new(
                    std::io::ErrorKind::NotFound,
                    "Identifier not found",
                ))
            }
            Some(data) => {
                data_ = data;
            }
        }
    }
    Ok(data_)
}

pub fn get_notification_handle_mut() -> Result<&'static mut String> {
    let data_: &'static mut String;
    unsafe {
        match INDENTIFIER.get_mut() {
            None => {
                return Err(std::io::Error::new(
                    std::io::ErrorKind::NotFound,
                    "Identifier not found",
                ))
            }
            Some(data) => {
                data_ = data;
            }
        }
    }
    Ok(data_)
}

pub(crate) fn get_mangadex_client_from_graphql_context<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> crate::Result<State<'ctx, MangaDexClient>> {
    get_app_handle_from_async_graphql::<R>(ctx)?
        .try_state::<MangaDexClient>()
        .ok_or(crate::Error::MangaDexClientNotFound)
}

pub(crate) fn get_watches_from_graphql_context<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> crate::Result<State<'ctx, Watches>> {
    get_app_handle_from_async_graphql::<R>(ctx)?
        .try_state::<Watches>()
        .ok_or(crate::Error::WatchesNotFound)
}

pub(crate) fn get_app_handle_from_async_graphql<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> crate::Result<&'ctx AppHandle<R>> {
    ctx.data::<AppHandle<R>>()
        .map_err(|_| crate::Error::CannotAsyncGraphqlContextData)
}

pub(crate) fn get_window_from_async_graphql<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> crate::Result<&'ctx Window<R>> {
    ctx.data::<Window<R>>()
        .map_err(|_| crate::Error::CannotAsyncGraphqlContextData)
}

pub(crate) fn get_offline_app_state<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> crate::Result<State<'ctx, OfflineAppState>> {
    get_app_handle_from_async_graphql::<R>(ctx)?
        .try_state::<OfflineAppState>()
        .ok_or(crate::Error::OfflineAppStateNotLoaded)
}

pub(crate) fn get_last_time_token_when_fetched<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> crate::Result<State<'ctx, LastTimeTokenWhenFecthed>> {
    get_app_handle_from_async_graphql::<R>(ctx)?
        .try_state::<LastTimeTokenWhenFecthed>()
        .ok_or(crate::Error::LastTimeTokenWhenFecthedNotFound)
}

pub(crate) async fn get_mangadex_client_from_graphql_context_with_auth_refresh<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> crate::Result<State<'ctx, MangaDexClient>> {
    let client = get_mangadex_client_from_graphql_context::<R>(ctx)?;
    let last_time_fetched = get_last_time_token_when_fetched::<R>(ctx)?;
    let watches = get_watches_from_graphql_context::<R>(ctx)?;
    let should_fetched: bool = {
        let last_time_fetched_inner = last_time_fetched.read().await;
        let inner = last_time_fetched_inner.ok_or(crate::Error::NotLoggedIn)?;
        #[cfg(debug_assertions)]
        println!("{:#?}", inner);
        inner < Instant::now()
    };

    if should_fetched {
        #[cfg(debug_assertions)]
        println!("Should be fetched");
        if let Ok(res) = client.oauth().refresh().send().await {
            let _ = last_time_fetched
                .write()
                .await
                .replace(Instant::now().add(Duration::from_millis(res.expires_in as u64)));
            let _ = watches.is_logged.send_data(true);
        } else {
            let _ = watches.is_logged.send_data(false);
        }
    }
    Ok(client)
}

pub(crate) async fn mount_offline_app_state<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> crate::Result<bool> {
    let watches = get_watches_from_graphql_context::<R>(ctx)?;
    let offline_app_state = get_offline_app_state::<R>(ctx)?;
    let mut offline_app_state_write = offline_app_state.write().await;
    if offline_app_state_write.is_some() {
        return Err(crate::Error::OfflineAppStateAlreadyLoaded);
    }
    offline_app_state_write.replace(AppStateInner::init::<R>(ctx).await?);
    let _ = watches.is_appstate_mounted.send_data(true);
    Ok(true)
}

pub(crate) async fn unmount_offline_app_state<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> crate::Result<bool> {
    let watches = get_watches_from_graphql_context::<R>(ctx)?;
    let offline_app_state = get_offline_app_state::<R>(ctx)?;
    let mut offline_app_state_write = offline_app_state.write().await;
    if offline_app_state_write.is_none() {
        return Err(crate::Error::OfflineAppStateNotLoaded);
    }
    let _ = offline_app_state_write.take();
    let _ = watches.is_appstate_mounted.send_data(false);
    Ok(true)
}

pub(crate) async fn get_store<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> crate::Result<State<'ctx, MangaDexStoreState<R>>> {
    let app = get_app_handle_from_async_graphql::<R>(ctx)?;
    app.try_state::<MangaDexStoreState<R>>()
        .ok_or(crate::Error::MangaDexStoreNotFound)
}
