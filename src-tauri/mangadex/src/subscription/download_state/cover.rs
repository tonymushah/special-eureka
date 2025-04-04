use std::{sync::Arc, time::Duration};

use crate::{
    app_state::watch::weak_download_manager,
    subscription::utils::WatchSubscriptionStream,
    utils::{
        abort::AbortHandleGuard,
        traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
        watch::is_appstate_mounted::IsAppStateMountedWatch,
    },
    Result,
};

use actix::Addr;
use async_graphql::{Context, Enum, Object, Subscription};
use async_stream::stream;
use eureka_mmanager::{
    download::{
        cover::{
            task::{CoverDownloadTaskState, CoverDownloadingState as DownloadingState},
            CoverDownloadManager, CoverDownloadMessage,
        },
        traits::managers::TaskManagerAddr,
        GetManager,
    },
    prelude::AsyncSubscribe,
    DownloadManager, Error as ManagerError, OwnedError,
};
use tauri::{Manager, Runtime};
use tokio::{
    select,
    sync::{
        watch::{channel as watch, Receiver},
        RwLock,
    },
    time::sleep,
};
use tokio_stream::{Stream, StreamExt};
use uuid::Uuid;

#[derive(Debug, Clone)]
pub enum CoverDownloadState {
    Pending,
    Done,
    Downloading(DownloadingState),
    Canceled,
    Error(OwnedError),
    OfflineAppStateNotLoaded,
}

impl From<CoverDownloadTaskState> for CoverDownloadState {
    fn from(value: CoverDownloadTaskState) -> Self {
        match value {
            CoverDownloadTaskState::Pending => Self::Pending,
            CoverDownloadTaskState::Loading(state) => Self::Downloading(state),
            CoverDownloadTaskState::Error(owned_error) => Self::Error(owned_error),
            CoverDownloadTaskState::Done(_) => Self::Done,
            CoverDownloadTaskState::Canceled => Self::Canceled,
        }
    }
}

#[derive(Debug, Clone, Copy, Enum, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum CoverDownloadingState {
    Preloading,
    FetchingData,
    FetchingImage,
}

impl From<DownloadingState> for CoverDownloadingState {
    fn from(value: DownloadingState) -> Self {
        match value {
            DownloadingState::Preloading => Self::Preloading,
            DownloadingState::FetchingData => Self::FetchingData,
            DownloadingState::FetchingImage => Self::FetchingImage,
        }
    }
}

#[Object]
impl CoverDownloadState {
    pub async fn is_pending(&self) -> bool {
        matches!(self, Self::Pending)
    }
    pub async fn is_done(&self) -> bool {
        matches!(self, Self::Done)
    }
    pub async fn is_canceled(&self) -> bool {
        matches!(self, Self::Canceled)
    }
    pub async fn is_offline_app_state_not_loaded(&self) -> bool {
        matches!(self, Self::OfflineAppStateNotLoaded)
    }
    pub async fn error(&self) -> Option<String> {
        if let Self::Error(err) = self {
            Some(err.to_string())
        } else {
            None
        }
    }
    pub async fn downloading(&self) -> Option<CoverDownloadingState> {
        if let Self::Downloading(d) = self {
            Some((*d).into())
        } else {
            None
        }
    }
}

fn get_cover_download_state_rx<R: Runtime, M: Manager<R> + Clone + Send + 'static>(
    app: &M,
    id: Uuid,
) -> crate::Result<Receiver<CoverDownloadState>> {
    let maybe_manager = weak_download_manager(app)?;
    let (tx, rx) = watch(CoverDownloadState::Pending);
    let mut is_mounted_stream =
        WatchSubscriptionStream::<_>::from_tauri_manager::<IsAppStateMountedWatch, _, _>(app)?;
    tokio::spawn(async move {
        let is_readed = Arc::new(RwLock::new(false));
        loop {
            let maybe_manager = maybe_manager.clone();
            let is_readed = is_readed.clone();
            let handle = {
                let is_readed = is_readed.clone();
                tokio::spawn(async move {
                    if let Some(manager) = maybe_manager
                        .read()
                        .await
                        .as_ref()
                        .and_then(|w| w.upgrade())
                    {
                        let to_send: CoverDownloadState = {
                            match GetManager::<CoverDownloadManager>::get(&manager).await {
                                Ok(manager) => {
                                    match manager.new_task(CoverDownloadMessage::new(id)).await {
                                        Ok(task) => {
                                            // Drop the manager preventing it from not dropping on other places
                                            drop(manager);
                                            match task.subscribe().await {
                                                Ok(mut sub) => {
                                                    // Drop the task because we don't need it anymore
                                                    drop(task);
                                                    if *is_readed.read().await {
                                                        if sub.changed().await.is_err() {
                                                            return None;
                                                        }
                                                    } else {
                                                        *is_readed.write().await = true;
                                                    }
                                                    let data: CoverDownloadState =
                                                        { (*sub.borrow()).clone().into() };
                                                    data
                                                }
                                                Err(err) => CoverDownloadState::Error(err.into()),
                                            }
                                        }
                                        Err(err) => CoverDownloadState::Error(
                                            ManagerError::MailBox(err).into(),
                                        ),
                                    }
                                }
                                Err(err) => {
                                    CoverDownloadState::Error(ManagerError::MailBox(err).into())
                                }
                            }
                        };

                        Some(to_send)
                    } else {
                        None
                    }
                })
            };
            let _abort = AbortHandleGuard::new(handle.abort_handle());
            let to_send = select! {
                Some(is_mounted) = is_mounted_stream.next() => {
                    if is_mounted {
                        continue;
                    }else {
                        CoverDownloadState::OfflineAppStateNotLoaded
                    }
                },
                join_res = handle => {
                    match join_res {
                        Ok(Some(res)) => res,
                        Ok(None) => CoverDownloadState::OfflineAppStateNotLoaded,
                        Err(err) => {
                            eprintln!("{:?}", err);
                            continue;
                        },
                    }
                },
                else => break
            };
            if matches!(to_send, CoverDownloadState::OfflineAppStateNotLoaded) {
                *is_readed.write().await = false;
            }
            // Prevent from sending the same data to the channel
            if let (
                CoverDownloadState::OfflineAppStateNotLoaded,
                CoverDownloadState::OfflineAppStateNotLoaded,
            ) = (&to_send, &*tx.borrow())
            {
                continue;
            }
            // println!("{id} - {:?}", to_send);
            if tx.send(to_send).is_err() {
                break;
            }
            sleep(Duration::from_millis(500)).await;
        }
    });
    Ok(rx)
}

pub struct CoverDownloadSubs;

#[Subscription]
impl CoverDownloadSubs {
    pub async fn listen_to_cover_tasks<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Vec<Uuid>> + 'ctx> {
        let window = ctx.get_window::<tauri::Wry>()?.clone();
        let maybe_offline = (*window.get_offline_app_state()?).clone();
        let offline_read = maybe_offline
            .read()
            .await
            .as_ref()
            .map(|e| e.app_state.clone())
            .ok_or(crate::Error::OfflineAppStateNotLoaded)?;
        let manager =
            <Addr<DownloadManager> as GetManager<CoverDownloadManager>>::get(&offline_read).await?;
        let notify = manager.notify().await?;
        let stream = stream! {
            loop {
                select! {
                    _ = notify.notified() => {
                        if let Ok(tasks) = manager.tasks_id().await {
                            yield tasks
                        }
                    },
                    else => break
                }
            }
        };
        Ok(stream)
    }
    pub async fn listen_to_download_state<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        cover_id: Uuid,
    ) -> Result<impl Stream<Item = CoverDownloadState> + 'ctx> {
        let window = ctx.get_window::<tauri::Wry>()?.clone();
        Ok(WatchSubscriptionStream::new(get_cover_download_state_rx(
            &window, cover_id,
        )?))
        /*
        let mut is_mounted = WatchSubscriptionStream::<_>::from_async_graphql_context_watch_as_ref::<
            IsAppStateMountedWatch,
            tauri::Wry,
        >(ctx)?;
        let (tx, rx) = watch::<Option<Addr<DownloadManager>>>(None);
        let maybe_offline = (*window.get_offline_app_state()?).clone();
        let stream = stream! {
            let mut is_readed = false;
            loop {
                select! {
                    Some(mounted) = is_mounted.next() => {
                        if mounted {
                            let olar = maybe_offline.read().await;
                            if let Some(offline) = (*olar).as_ref() {
                                let _ = tx.send_replace(Some(offline.app_state.clone()));
                            }else {
                                yield CoverDownloadState::OfflineAppStateNotLoaded;
                            }
                        }else {
                            let _ = tx.send_replace(None);
                            is_readed = false;
                            yield CoverDownloadState::OfflineAppStateNotLoaded;
                        }
                    }
                    Some(manager) = async{ (*rx.borrow()).clone() } => {
                        match GetManager::<CoverDownloadManager>::get(&manager).await {
                            Ok(manager) => {
                                match manager.new_task(CoverDownloadMessage::new(cover_id)).await {
                                    Ok(task) => {
                                        match task.subscribe().await {
                                            Ok(mut sub) => {
                                                if is_readed {
                                                    let _ = sub.changed().await;
                                                }else {
                                                    is_readed = true;
                                                }
                                                let data: CoverDownloadState = {
                                                    (*sub.borrow()).clone().into()
                                                };
                                                yield data
                                            },
                                            Err(err) => yield CoverDownloadState::Error(err.into())
                                        }
                                    },
                                    Err(err) => {
                                        yield CoverDownloadState::Error(ManagerError::MailBox(err).into())
                                    }
                                }
                            },
                            Err(err) => {
                                yield CoverDownloadState::Error(ManagerError::MailBox(err).into())
                            }
                        }
                    }
                }
            }
        };
        Ok(stream)
        */
    }
}
