use crate::{
    subscription::utils::{cancel_token::WindowCancellationToken, WatchSubscriptionStream},
    utils::{
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
            MangaDownloadManager, MangaDownloadMessage,
        },
        traits::managers::TaskManagerAddr,
        GetManager,
    },
    prelude::AsyncSubscribe,
    DownloadManager, Error as ManagerError, OwnedError,
};
use tokio::{select, sync::watch::channel as watch};
use tokio_stream::{Stream, StreamExt};
use uuid::Uuid;

pub enum MangaDownloadState {
    Pending,
    Downloading(DownloadingState),
    Error(OwnedError),
    Done,
    Canceled,
    OfflineAppStateNotLoaded,
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
        sub_id: Uuid,
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
        let cancel_tok = WindowCancellationToken::new(window, sub_id);
        let stream = stream! {
            let cancel_tok = cancel_tok;
            let token = cancel_tok.cancel_token();
            loop {
                select! {
                    _ = token.cancelled() => {
                        break;
                    },
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
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = MangaDownloadState> + 'ctx> {
        let window = ctx.get_window::<tauri::Wry>()?.clone();
        let mut is_mounted =
            WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context_watch_as_ref::<
                IsAppStateMountedWatch,
            >(ctx, sub_id)?;
        let cancel_token = is_mounted.cancel_token();
        let (tx, rx) = watch::<Option<Addr<DownloadManager>>>(None);
        let maybe_offline = (*window.get_offline_app_state()?).clone();
        let stream = stream! {
            let mut is_readed = false;
            loop {
                select! {
                    _ = cancel_token.clone().cancelled_owned() => {
                        break;
                    }
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
    }
}
