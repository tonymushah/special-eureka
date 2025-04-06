use std::{sync::Arc, time::Duration};

use crate::{
    app_state::watch::weak_download_manager,
    subscription::utils::WatchSubscriptionStream,
    utils::{
        abort::AbortHandleGuard,
        download::{get_next_task_value, NextTaskValue},
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
        manga::{
            task::{MangaDonwloadingState as DownloadingState, MangaDownloadTaskState},
            MangaDownloadManager,
        },
        traits::managers::TaskManagerAddr,
        GetManager,
    },
    prelude::MangaDownloadTask,
    DownloadManager, OwnedError,
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
pub enum MangaDownloadState {
    Pending,
    Downloading(DownloadingState),
    Error(OwnedError),
    Done,
    Canceled,
    OfflineAppStateNotLoaded,
}

impl NextTaskValue for MangaDownloadState {
    type DownloadingState = DownloadingState;
    fn done() -> Self {
        Self::Done
    }
    fn canceled() -> Self {
        Self::Canceled
    }
    fn downloading(value: Self::DownloadingState) -> Self {
        Self::Downloading(value)
    }
    fn error(error: OwnedError) -> Self {
        Self::Error(error)
    }
    fn offline_app_state_not_loaded() -> Self {
        Self::OfflineAppStateNotLoaded
    }
    fn pending() -> Self {
        Self::Pending
    }
}

impl From<MangaDownloadTaskState> for MangaDownloadState {
    fn from(value: MangaDownloadTaskState) -> Self {
        match value {
            MangaDownloadTaskState::Pending => Self::Pending,
            MangaDownloadTaskState::Loading(state) => Self::Downloading(state),
            MangaDownloadTaskState::Error(owned_error) => Self::Error(owned_error),
            MangaDownloadTaskState::Done(_) => Self::Done,
            MangaDownloadTaskState::Canceled => Self::Canceled,
        }
    }
}

#[derive(Debug, Enum, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum MangaDonwloadingState {
    Preloading,
    FetchingData,
}

impl From<DownloadingState> for MangaDonwloadingState {
    fn from(value: DownloadingState) -> Self {
        match value {
            DownloadingState::FetchingData => Self::FetchingData,
            DownloadingState::Preloading => Self::Preloading,
        }
    }
}

#[Object]
impl MangaDownloadState {
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
    pub async fn downloading(&self) -> Option<MangaDonwloadingState> {
        if let Self::Downloading(d) = self {
            Some((*d).into())
        } else {
            None
        }
    }
}

fn get_manga_download_state_rx<R: Runtime, M: Manager<R> + Clone + Send + 'static>(
    app: &M,
    id: Uuid,
) -> crate::Result<Receiver<MangaDownloadState>> {
    let maybe_manager = weak_download_manager(app)?;
    let (tx, rx) = watch(MangaDownloadState::Pending);
    let mut is_mounted_stream =
        WatchSubscriptionStream::<_>::from_tauri_manager::<IsAppStateMountedWatch, _, _>(app)?;
    tokio::spawn(async move {
        let is_readed = Arc::new(RwLock::new(false));
        loop {
            let maybe_manager = maybe_manager.clone();
            let is_readed = is_readed.clone();
            let handle = get_next_task_value::<MangaDownloadManager, MangaDownloadTask, _>(
                maybe_manager,
                is_readed.clone(),
                id,
            );
            let _abort = AbortHandleGuard::new(handle.abort_handle());
            let to_send = select! {
                Some(is_mounted) = is_mounted_stream.next() => {
                    if is_mounted {
                        continue;
                    }else {
                        MangaDownloadState::OfflineAppStateNotLoaded
                    }
                },
                join_res = handle => {
                    match join_res {
                        Ok(Some(res)) => res,
                        Ok(None) => MangaDownloadState::OfflineAppStateNotLoaded,
                        Err(err) => {
                            eprintln!("{:?}", err);
                            continue;
                        },
                    }
                },
                else => break
            };
            if matches!(to_send, MangaDownloadState::OfflineAppStateNotLoaded) {
                *is_readed.write().await = false;
            }
            // Prevent from sending the same data to the channel
            if matches!(
                (&to_send, &*tx.borrow()),
                (
                    MangaDownloadState::OfflineAppStateNotLoaded,
                    MangaDownloadState::OfflineAppStateNotLoaded,
                )
            ) {
                sleep(Duration::from_millis(500)).await;
                continue;
            }
            // println!("{id} - {:?}", to_send);
            if tx.send(to_send).is_err() {
                break;
            }
        }
    });
    Ok(rx)
}

pub struct MangaDownloadSubs;

#[Subscription]
impl MangaDownloadSubs {
    pub async fn listen_to_manga_tasks<'ctx>(
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
            <Addr<DownloadManager> as GetManager<MangaDownloadManager>>::get(&offline_read).await?;
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
        manga_id: Uuid,
    ) -> Result<impl Stream<Item = MangaDownloadState> + 'ctx> {
        let window = ctx.get_window::<tauri::Wry>()?.clone();
        Ok(WatchSubscriptionStream::new(get_manga_download_state_rx(
            &window, manga_id,
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
                                yield MangaDownloadState::OfflineAppStateNotLoaded;
                            }
                        }else {
                            let _ = tx.send_replace(None);
                            is_readed = false;
                            yield MangaDownloadState::OfflineAppStateNotLoaded;
                        }
                    }
                    Some(manager) = async{ (*rx.borrow()).clone() } => {
                        match GetManager::<MangaDownloadManager>::get(&manager).await {
                            Ok(manager) => {
                                match manager.new_task(MangaDownloadMessage::new(manga_id)).await {
                                    Ok(task) => {
                                        match task.subscribe().await {
                                            Ok(mut sub) => {
                                                if is_readed {
                                                    let _ = sub.changed().await;
                                                }else {
                                                    is_readed = true;
                                                }
                                                let data: MangaDownloadState = {
                                                    (*sub.borrow()).clone().into()
                                                };
                                                yield data
                                            },
                                            Err(err) => yield MangaDownloadState::Error(err.into())
                                        }
                                    },
                                    Err(err) => {
                                        yield MangaDownloadState::Error(ManagerError::MailBox(err).into())
                                    }
                                }
                            },
                            Err(err) => {
                                yield MangaDownloadState::Error(ManagerError::MailBox(err).into())
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
