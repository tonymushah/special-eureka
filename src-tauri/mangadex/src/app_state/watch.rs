use std::sync::Arc;

use actix::WeakAddr;
use eureka_mmanager::DownloadManager;
use tauri::{Manager, Runtime};
use tokio::sync::{
    watch::{self, Receiver},
    RwLock,
};
use tokio_stream::StreamExt;

use crate::{
    subscription::utils::WatchSubscriptionStream,
    utils::{
        traits_utils::MangadexTauriManagerExt, watch::is_appstate_mounted::IsAppStateMountedWatch,
    },
};

/// Need to be used inside of an tokio runtime
pub fn weak_download_manager_watch<R: Runtime, M: Manager<R> + Clone + Send + 'static>(
    app: &M,
) -> crate::Result<Receiver<Option<WeakAddr<DownloadManager>>>> {
    let (tx, rx) = watch::channel(None::<WeakAddr<DownloadManager>>);
    let mut is_mounted_stream =
        WatchSubscriptionStream::<_>::from_tauri_manager::<IsAppStateMountedWatch, _, _>(app)?;
    let app = app.clone();
    tokio::spawn(async move {
        while let Some(mounted) = is_mounted_stream.next().await {
            if mounted {
                if let Ok(offline) = app.get_offline_app_state() {
                    if tx
                        .send(
                            offline
                                .read()
                                .await
                                .as_ref()
                                .map(|i| i.app_state.downgrade()),
                        )
                        .is_err()
                    {
                        break;
                    }
                } else {
                    break;
                }
            } else if tx.send(None).is_err() {
                break;
            }
        }
    });
    Ok(rx)
}

type ArcRwLock<T> = Arc<RwLock<T>>;

pub fn weak_download_manager<R: Runtime, M: Manager<R> + Clone + Send + 'static>(
    app: &M,
) -> crate::Result<ArcRwLock<Option<WeakAddr<DownloadManager>>>> {
    let maybe_manager = Arc::new(RwLock::new(None::<WeakAddr<DownloadManager>>));
    {
        let maybe_manager = Arc::downgrade(&maybe_manager);
        let mut wrx_stream = WatchSubscriptionStream::new(weak_download_manager_watch(app)?);
        tokio::spawn(async move {
            while let Some(weak_manager) = wrx_stream.next().await {
                if let Some(maybe_manager) = maybe_manager.upgrade() {
                    *maybe_manager.write().await = weak_manager;
                } else {
                    break;
                }
            }
        });
    }
    Ok(maybe_manager)
}
