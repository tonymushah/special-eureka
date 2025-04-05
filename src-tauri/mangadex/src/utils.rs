use mangadex_api::MangaDexClient;
use std::future::Future;
use tauri::{AppHandle, Runtime, State, Window};

use crate::app_state::{LastTimeTokenWhenFecthed, OfflineAppState};

use self::{store::MangaDexStoreState, watch::Watches};

pub mod abort;
pub mod collection;
pub mod download;
pub mod download_state;
pub mod source;
pub mod store;
pub mod traits_utils;
pub mod watch;

pub use collection::Collection;

use traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt};

pub(crate) fn get_mangadex_client_from_graphql_context<'ctx, R: Runtime>(
    ctx: &'ctx async_graphql::Context<'ctx>,
) -> crate::Result<State<'ctx, MangaDexClient>> {
    get_app_handle_from_async_graphql::<R>(ctx)?.get_mangadex_client()
}

pub(crate) fn get_watches_from_graphql_context<'ctx, R: Runtime>(
    ctx: &'ctx async_graphql::Context<'ctx>,
) -> crate::Result<State<'ctx, Watches>> {
    get_app_handle_from_async_graphql::<R>(ctx)?.get_watches()
}

pub(crate) fn get_app_handle_from_async_graphql<'ctx, R: Runtime>(
    ctx: &'ctx async_graphql::Context<'ctx>,
) -> crate::Result<&'ctx AppHandle<R>> {
    ctx.get_app_handle()
}

#[allow(dead_code)]
pub(crate) fn get_window_from_async_graphql<'ctx, R: Runtime>(
    ctx: &'ctx async_graphql::Context<'ctx>,
) -> crate::Result<&'ctx Window<R>> {
    ctx.get_window()
}

pub(crate) fn get_offline_app_state<'ctx, R: Runtime>(
    ctx: &'ctx async_graphql::Context<'ctx>,
) -> crate::Result<State<'ctx, OfflineAppState>> {
    get_app_handle_from_async_graphql::<R>(ctx)?.get_offline_app_state()
}

pub(crate) fn get_last_time_token_when_fetched<'ctx, R: Runtime>(
    ctx: &'ctx async_graphql::Context<'ctx>,
) -> crate::Result<State<'ctx, LastTimeTokenWhenFecthed>> {
    get_app_handle_from_async_graphql::<R>(ctx)?.get_last_time_token_when_fetched()
}

pub(crate) async fn get_mangadex_client_from_graphql_context_with_auth_refresh<'ctx, R: Runtime>(
    ctx: &'ctx async_graphql::Context<'ctx>,
) -> crate::Result<State<'ctx, MangaDexClient>> {
    get_app_handle_from_async_graphql::<R>(ctx)?
        .get_mangadex_client_with_auth_refresh()
        .await
}

pub(crate) async fn mount_offline_app_state<'ctx, R: Runtime>(
    ctx: &'ctx async_graphql::Context<'ctx>,
) -> crate::Result<bool> {
    get_app_handle_from_async_graphql::<R>(ctx)?
        .mount_offline_app_state()
        .await?;
    Ok(true)
}

pub(crate) async fn unmount_offline_app_state<'ctx, R: Runtime>(
    ctx: &'ctx async_graphql::Context<'ctx>,
) -> crate::Result<bool> {
    get_app_handle_from_async_graphql::<R>(ctx)?
        .unmount_offline_app_state()
        .await?;
    Ok(true)
}

pub(crate) fn get_store<'ctx, R: Runtime>(
    ctx: &'ctx async_graphql::Context<'ctx>,
) -> crate::Result<State<'ctx, MangaDexStoreState<R>>> {
    get_app_handle_from_async_graphql::<R>(ctx)?.get_mangadex_store()
}

pub fn block_on<F>(fut: F) -> F::Output
where
    F: Future + Send + 'static,
    F::Output: Send + 'static,
{
    std::thread::spawn(move || tauri::async_runtime::block_on(fut))
        .join()
        .unwrap()
}
