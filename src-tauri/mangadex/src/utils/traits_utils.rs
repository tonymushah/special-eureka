use mangadex_api::MangaDexClient;
use tauri::{AppHandle, Manager, Runtime, State, Window};
use tokio::time::{Duration, Instant};

use std::future::Future;

use crate::{
    app_state::{inner::AppStateInner, LastTimeTokenWhenFecthed, OfflineAppState},
    utils::watch::SendData,
};

use super::{store::MangaDexStoreState, watch::Watches};

pub trait MangadexTauriManagerExt<R>: Manager<R> + Sync
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
    fn get_mangadex_store(&self) -> crate::Result<State<'_, MangaDexStoreState<R>>> {
        self.try_state().ok_or(crate::Error::MangaDexStoreNotFound)
    }
    fn get_mangadex_client_with_auth_refresh(
        &self,
    ) -> impl Future<Output = crate::Result<State<'_, MangaDexClient>>> + Send {
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
    fn unmount_offline_app_state(&self) -> impl Future<Output = crate::Result<()>> + Send {
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
        Self: std::marker::Sized,
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
}

impl<R, M> MangadexTauriManagerExt<R> for M
where
    R: Runtime,
    M: Manager<R> + Sync,
{
}

pub trait MangadexAsyncGraphQLContextExt<'a, 'b> {
    fn get_app_handle<R: Runtime>(&'a self) -> crate::Result<&'b AppHandle<R>>;
    fn get_window<R: Runtime>(&'a self) -> crate::Result<&'b Window<R>>;
}

impl<'a, 'ctx> MangadexAsyncGraphQLContextExt<'a, 'ctx> for async_graphql::Context<'ctx> {
    fn get_app_handle<R: Runtime>(&'a self) -> crate::Result<&'ctx AppHandle<R>> {
        self.data::<AppHandle<R>>()
            .map_err(|_| crate::Error::NoAccessAppHandleGQLCtx)
    }
    fn get_window<R: Runtime>(&'a self) -> crate::Result<&'ctx Window<R>> {
        self.data::<Window<R>>()
            .map_err(|_| crate::Error::NoAccessWindowGQLCtx)
    }
}
