use crate::{
    Result,
    subscription::download_state::NextTaskValue,
    utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
};

use actix::Addr;
use async_graphql::{Context, Enum, Object, Subscription};
use async_stream::stream;
use eureka_mmanager::{
    DownloadManager, OwnedError,
    download::{
        GetManager,
        manga::{
            MangaDownloadManager,
            task::{MangaDonwloadingState as DownloadingState, MangaDownloadTaskState},
        },
        traits::managers::TaskManagerAddr,
    },
    prelude::MangaDownloadTask,
};
use futures_util::stream::Pending;
use tauri::{Manager, Runtime};
use tokio::{select, sync::watch::Receiver};
use tokio_stream::Stream;
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

    fn is_pending(&self) -> bool {
        matches!(self, Self::Pending)
    }

    fn is_done(&self) -> bool {
        matches!(self, Self::Done)
    }

    fn is_canceled(&self) -> bool {
        matches!(self, Self::Canceled)
    }

    fn is_offline_app_state_not_loaded(&self) -> bool {
        matches!(self, Self::OfflineAppStateNotLoaded)
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
            if let Ok(tasks) = manager.tasks_id().await {
                yield tasks
            }
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
        deferred: bool,
    ) -> Result<impl Stream<Item = MangaDownloadState> + 'ctx> {
        Err::<Pending<_>, _>(crate::Error::Unimplemented)
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
