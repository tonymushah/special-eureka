use async_graphql::Error;
use mangadex_api::MangaDexClient;
use mangadex_desktop_api2::AppState;
use once_cell::sync::OnceCell;
use std::io::Result;
use tauri::{AppHandle, Manager, Runtime, State};
use tauri_plugin_store::Store;
use tokio::time::{Duration, Instant};

use crate::{
    app_state::{LastTimeTokenWhenFecthed, OfflineAppState},
    store::get_store_builder,
};
static mut INDENTIFIER: OnceCell<String> = OnceCell::new();

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
) -> async_graphql::Result<State<'ctx, MangaDexClient>> {
    get_app_handle_from_async_graphql::<R>(ctx)?
        .try_state::<MangaDexClient>()
        .ok_or(async_graphql::Error::new("MangaDexClient not found"))
}

pub(crate) fn get_app_handle_from_async_graphql<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> async_graphql::Result<&'ctx AppHandle<R>> {
    ctx.data::<AppHandle<R>>()
}

pub(crate) fn get_offline_app_state<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> async_graphql::Result<State<'ctx, OfflineAppState>> {
    get_app_handle_from_async_graphql::<R>(ctx)?
        .try_state::<OfflineAppState>()
        .ok_or(async_graphql::Error::new("OfflineAppState not found"))
}

pub(crate) fn get_last_time_token_when_fetched<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> async_graphql::Result<State<'ctx, LastTimeTokenWhenFecthed>> {
    get_app_handle_from_async_graphql::<R>(ctx)?
        .try_state::<LastTimeTokenWhenFecthed>()
        .ok_or(async_graphql::Error::new(
            "LastTimeTokenWhenFecthed not found",
        ))
}

pub(crate) async fn get_mangadex_client_from_graphql_context_with_auth_refresh<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> async_graphql::Result<State<'ctx, MangaDexClient>> {
    let client = get_mangadex_client_from_graphql_context::<R>(ctx)?;
    let last_time_fetched = get_last_time_token_when_fetched::<R>(ctx)?;
    let should_fetched: bool = {
        let last_time_fetched_inner = last_time_fetched.read().await;
        let inner = last_time_fetched_inner.ok_or("You're not logged in")?;
        #[cfg(debug_assertions)]
        println!("{:#?}", inner);
        inner < Instant::now()
    };

    if should_fetched {
        #[cfg(debug_assertions)]
        println!("Should be fetched");
        let time = client.oauth().refresh().send().await?.expires_in;
        let _ = last_time_fetched.write().await.replace(
            Instant::now()
                .checked_add(Duration::from_millis(time as u64))
                .ok_or(Error::new(
                    "Error on calculating the next time to fetch the token",
                ))?,
        );
    }
    Ok(client)
}

pub(crate) async fn mount_offline_app_state<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> async_graphql::Result<bool> {
    let client = get_mangadex_client_from_graphql_context::<R>(ctx)?;
    let offline_app_state = get_offline_app_state::<R>(ctx)?;
    let mut offline_app_state_write = offline_app_state.write().await;
    let mut app_state = AppState::init().await?;
    app_state.http_client = client.get_http_client().clone();
    offline_app_state_write.replace(app_state);
    Ok(true)
}

pub(crate) async fn unmount_offline_app_state<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> async_graphql::Result<bool> {
    let offline_app_state = get_offline_app_state::<R>(ctx)?;
    let mut offline_app_state_write = offline_app_state.write().await;
    let _ = offline_app_state_write.take();
    Ok(true)
}

pub(crate) async fn get_store<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> async_graphql::Result<Store<R>> {
    let app = get_app_handle_from_async_graphql::<R>(ctx)?;
    let mut store = get_store_builder(app.clone())
        .map_err(|e| async_graphql::Error::new(e.to_string()))?
        .build();
    let _ = store.load();
    Ok(store)
}
