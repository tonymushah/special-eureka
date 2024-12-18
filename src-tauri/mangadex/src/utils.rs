use mangadex_api::MangaDexClient;
use once_cell::sync::OnceCell;
use std::io::Result;
use tauri::{AppHandle, Runtime, State, Window};

use crate::app_state::{LastTimeTokenWhenFecthed, OfflineAppState};

use self::{store::MangaDexStoreState, watch::Watches};
static mut INDENTIFIER: OnceCell<String> = OnceCell::new();

pub mod collection;
pub mod download_state;
pub mod source;
pub mod store;
pub mod traits_utils;
pub mod watch;

pub use collection::Collection;

use traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt};

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
    get_app_handle_from_async_graphql::<R>(ctx)?.get_mangadex_client()
}

pub(crate) fn get_watches_from_graphql_context<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> crate::Result<State<'ctx, Watches>> {
    get_app_handle_from_async_graphql::<R>(ctx)?.get_watches()
}

pub(crate) fn get_app_handle_from_async_graphql<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> crate::Result<&'ctx AppHandle<R>> {
    ctx.get_app_handle()
}

pub(crate) fn get_window_from_async_graphql<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> crate::Result<&'ctx Window<R>> {
    ctx.get_window()
}

pub(crate) fn get_offline_app_state<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> crate::Result<State<'ctx, OfflineAppState>> {
    get_app_handle_from_async_graphql::<R>(ctx)?.get_offline_app_state()
}

pub(crate) fn get_last_time_token_when_fetched<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> crate::Result<State<'ctx, LastTimeTokenWhenFecthed>> {
    get_app_handle_from_async_graphql::<R>(ctx)?.get_last_time_token_when_fetched()
}

pub(crate) async fn get_mangadex_client_from_graphql_context_with_auth_refresh<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> crate::Result<State<'ctx, MangaDexClient>> {
    get_app_handle_from_async_graphql::<R>(ctx)?
        .get_mangadex_client_with_auth_refresh()
        .await
}

pub(crate) async fn mount_offline_app_state<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> crate::Result<bool> {
    get_app_handle_from_async_graphql::<R>(ctx)?
        .mount_offline_app_state()
        .await?;
    Ok(true)
}

pub(crate) async fn unmount_offline_app_state<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> crate::Result<bool> {
    get_app_handle_from_async_graphql::<R>(ctx)?
        .unmount_offline_app_state()
        .await?;
    Ok(true)
}

pub(crate) fn get_store<'ctx, R: Runtime>(
    ctx: &async_graphql::Context<'ctx>,
) -> crate::Result<State<'ctx, MangaDexStoreState<R>>> {
    get_app_handle_from_async_graphql::<R>(ctx)?.get_mangadex_store()
}
