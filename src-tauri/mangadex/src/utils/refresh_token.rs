use std::{
    ops::Deref,
    sync::Arc,
    time::{Duration, Instant},
};

use deduplicate::{Deduplicate, DeduplicateFuture};
use futures_util::{FutureExt, TryFutureExt};
use tauri::{AppHandle, Manager, Runtime, State};

use crate::utils::{traits_utils::MangadexTauriManagerExt, watch::SendData};

#[derive(Debug, Clone, thiserror::Error)]
#[error("{0}")]
pub struct AbstractRefreshTokenDedupError(pub String);

type DedupRes = Result<(), AbstractRefreshTokenDedupError>;

type Dedup = Deduplicate<
    Box<dyn Fn(()) -> DeduplicateFuture<DedupRes> + Send + Sync + 'static>,
    (),
    DedupRes,
>;

pub struct RefreshTokenTask<R>
where
    R: Runtime,
{
    pub handle: AppHandle<R>,
    dedup: Arc<Dedup>,
}

impl<R: Runtime> Deref for RefreshTokenTask<R> {
    type Target = Dedup;
    fn deref(&self) -> &Self::Target {
        &self.dedup
    }
}

async fn refresh_token<R: Runtime>(app: AppHandle<R>) -> crate::Result<()> {
    let client = app.get_mangadex_client()?;
    let last_time_fetched = app.get_last_time_token_when_fetched()?;
    let watches = app.get_watches()?;
    let should_fetched: bool = {
        let inner = last_time_fetched
            .get()
            .await
            .ok_or(crate::Error::NotLoggedIn)?;

        #[cfg(debug_assertions)]
        {
            super::print_instant(inner.into());
        }

        inner < Instant::now().into()
    };

    if should_fetched {
        #[cfg(debug_assertions)]
        log::debug!("Should be fetched");
        app.get_specific_rate_limit()?.refresh().await;
        match client.oauth().refresh().send().await {
            Ok(res) => {
                let _ = last_time_fetched
                    .replace(
                        (Instant::now() + (Duration::from_millis(res.expires_in as u64))).into(),
                    )
                    .await;
                let _ = watches.is_logged.send_data(true);
            }
            Err(err) => {
                let _ = watches.is_logged.send_data(false);
                log::error!("{}", err);
                return Err(err.into());
            }
        }
    }
    Ok(())
}

impl<R: Runtime> RefreshTokenTask<R> {
    pub fn new(app: AppHandle<R>) -> Self {
        let dedup: Dedup = {
            let new_app = app.clone();
            Deduplicate::new(Box::new(move |_| {
                let new_app = new_app.clone();
                let fut = refresh_token(new_app)
                    .map_err(|d| AbstractRefreshTokenDedupError(d.to_string()))
                    .map(Some);
                Box::pin(fut)
            }))
        };
        Self {
            handle: app,
            dedup: Arc::new(dedup),
        }
    }
    pub fn get_state_from_manager<'a, M: Manager<R>>(manager: &'a M) -> State<'a, Self> {
        if let Some(state) = manager.try_state() {
            state
        } else {
            manager.manage(Self::new(manager.app_handle().clone()));
            manager.state()
        }
    }
}
