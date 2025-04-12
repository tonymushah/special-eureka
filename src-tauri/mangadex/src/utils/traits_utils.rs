use actix::{ArbiterHandle, System};
use mangadex_api::MangaDexClient;
use mizuki::AsyncGQLContextExt;
use tauri::{AppHandle, Manager, Runtime, State, Webview, Window};
use tokio::{
    sync::oneshot::channel as oneshot,
    time::{Duration, Instant},
};
use tokio_util::sync::CancellationToken;

use std::future::Future;

use crate::{
    app_state::{inner::AppStateInner, LastTimeTokenWhenFecthed, OfflineAppState},
    rate_limit::SpecificRateLimits,
    utils::watch::SendData,
};

use super::{store::MangaDexStoreState, watch::Watches};

pub trait MangadexTauriManagerExt<R>: Manager<R>
where
    R: Runtime,
{
    fn get_mangadex_client(&self) -> crate::Result<State<'_, MangaDexClient>> {
        self.try_state().ok_or(crate::Error::MangaDexClientNotFound)
    }
    fn get_watches(&self) -> crate::Result<State<'_, Watches>> {
        self.try_state().ok_or(crate::Error::WatchesNotFound)
    }
    fn get_offline_app_state(&self) -> crate::Result<State<'_, OfflineAppState>> {
        self.try_state()
            .ok_or(crate::Error::OfflineAppStateNotLoaded)
    }
    fn get_last_time_token_when_fetched(
        &self,
    ) -> crate::Result<State<'_, LastTimeTokenWhenFecthed>> {
        self.try_state()
            .ok_or(crate::Error::LastTimeTokenWhenFecthedNotFound)
    }
    fn get_actix_system(&self) -> crate::Result<State<'_, System>> {
        self.try_state()
            .ok_or(crate::Error::ActixSystemNotRegistered)
    }
    fn get_mangadex_store(&self) -> crate::Result<State<'_, MangaDexStoreState<R>>> {
        self.try_state().ok_or(crate::Error::MangaDexStoreNotFound)
    }
    fn get_mangadex_client_with_auth_refresh(
        &self,
    ) -> impl Future<Output = crate::Result<State<'_, MangaDexClient>>> + Send
    where
        Self: Sync,
    {
        async {
            let client = self.get_mangadex_client()?;
            let last_time_fetched = self.get_last_time_token_when_fetched()?;
            let watches = self.get_watches()?;
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
                        .replace(Instant::now() + (Duration::from_millis(res.expires_in as u64)));
                    let _ = watches.is_logged.send_data(true);
                } else {
                    let _ = watches.is_logged.send_data(false);
                }
            }
            Ok(client)
        }
    }
    fn unmount_offline_app_state(&self) -> impl Future<Output = crate::Result<()>> + Send
    where
        Self: Sync,
    {
        async {
            let watches = self.get_watches()?;
            let offline_app_state = self.get_offline_app_state()?;
            let mut offline_app_state_write = offline_app_state.write().await;
            if offline_app_state_write.is_none() {
                return Err(crate::Error::OfflineAppStateNotLoaded);
            }
            let _ = offline_app_state_write.take();
            let _ = watches.is_appstate_mounted.send_data(false);
            Ok(())
        }
    }
    fn mount_offline_app_state(&self) -> impl Future<Output = crate::Result<()>> + Send
    where
        Self: Sized + Sync,
    {
        async {
            let watches = self.get_watches()?;
            let offline_app_state = self.get_offline_app_state()?;
            let mut offline_app_state_write = offline_app_state.write().await;
            if offline_app_state_write.is_some() {
                return Err(crate::Error::OfflineAppStateAlreadyLoaded);
            }
            offline_app_state_write.replace(AppStateInner::init(self).await?);
            let _ = watches.is_appstate_mounted.send_data(true);
            Ok(())
        }
    }
    fn get_specific_rate_limit(&self) -> crate::Result<State<'_, SpecificRateLimits>> {
        self.try_state()
            .ok_or(crate::Error::NotManagedSpecificRateLimit)
    }
}

impl<R, M> MangadexTauriManagerExt<R> for M
where
    R: Runtime,
    M: Manager<R>,
{
}

pub trait MangadexAsyncGraphQLContextExt {
    fn get_app_handle<R: Runtime>(&self) -> crate::Result<&AppHandle<R>>;
    fn get_window<R: Runtime>(&self) -> crate::Result<&Window<R>>;
    fn get_webview<R: Runtime>(&self) -> crate::Result<&Webview<R>>;
    fn get_subscription_cancel_token<R: Runtime>(&self) -> crate::Result<&CancellationToken>;
}

impl MangadexAsyncGraphQLContextExt for async_graphql::Context<'_> {
    fn get_app_handle<R: Runtime>(&self) -> crate::Result<&AppHandle<R>> {
        self.app_handle::<R>()
            .ok_or(crate::Error::NoAccessAppHandleGQLCtx)
    }
    fn get_window<R: Runtime>(&self) -> crate::Result<&Window<R>> {
        self.window::<R>().ok_or(crate::Error::NoAccessWindowGQLCtx)
    }
    fn get_subscription_cancel_token<R: Runtime>(&self) -> crate::Result<&CancellationToken> {
        self.cancel_token()
            .ok_or(crate::Error::NoAccessSubCancelTokenGQLCtx)
    }
    fn get_webview<R: Runtime>(&self) -> crate::Result<&Webview<R>> {
        self.webview::<R>()
            .ok_or(crate::Error::NoAccessWebviewGQLCtx)
    }
}

pub trait MangaDexActixArbiterHandleExt: Sync {
    fn spawn_with_data<F>(&self, task: F) -> impl Future<Output = crate::Result<F::Output>> + Send
    where
        F: Future + Send + 'static,
        F::Output: Send + 'static;
    fn spawn_fn_with_data<F, T>(&self, task: F) -> impl Future<Output = crate::Result<T>> + Send
    where
        F: FnOnce() -> T + Send + 'static,
        T: Send + 'static;
}

impl MangaDexActixArbiterHandleExt for ArbiterHandle {
    async fn spawn_fn_with_data<F, T>(&self, task: F) -> crate::Result<T>
    where
        F: FnOnce() -> T + Send + 'static,
        T: Send + 'static,
    {
        let (rx, tx) = oneshot::<T>();
        println!("Spawning...");
        self.spawn_fn(move || {
            println!("executing task...");
            let res = task();
            println!("executed!");
            let _ = rx.send(res);
        });
        tx.await
            .map_err(|_| crate::Error::SpawnDataResultMissingActixArbiter)
    }
    async fn spawn_with_data<F>(&self, task: F) -> crate::Result<F::Output>
    where
        F: Future + Send + 'static,
        F::Output: Send + 'static,
    {
        let (rx, tx) = oneshot::<F::Output>();
        println!("Spawning...");
        self.spawn(async move {
            println!("executing task...");
            let res = task.await;
            println!("executed!");
            let _ = rx.send(res);
        });
        tx.await
            .map_err(|_| crate::Error::SpawnDataResultMissingActixArbiter)
    }
}
