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
use async_graphql::{Context, Object, SimpleObject, Subscription};
use async_stream::stream;
use eureka_mmanager::{
    download::{
        chapter::{
            task::{ChapterDownloadTaskState, ChapterDownloadingState as DownloadingState},
            ChapterDownloadManager, ChapterDownloadMessage,
        },
        GetManager,
    },
    prelude::{AsyncSubscribe, TaskManagerAddr},
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
pub enum ChapterDownloadState {
    Pending,
    Done,
    Downloading(DownloadingState),
    Canceled,
    Error(OwnedError),
    OfflineAppStateNotLoaded,
}

impl From<ChapterDownloadTaskState> for ChapterDownloadState {
    fn from(value: ChapterDownloadTaskState) -> Self {
        match value {
            eureka_mmanager::download::state::DownloadTaskState::Pending => Self::Pending,
            eureka_mmanager::download::state::DownloadTaskState::Loading(s) => Self::Downloading(s),
            eureka_mmanager::download::state::DownloadTaskState::Error(owned_error) => {
                Self::Error(owned_error)
            }
            eureka_mmanager::download::state::DownloadTaskState::Done(_) => Self::Done,
            eureka_mmanager::download::state::DownloadTaskState::Canceled => Self::Canceled,
        }
    }
}

pub struct ChapterDownloadingState(DownloadingState);

impl From<DownloadingState> for ChapterDownloadingState {
    fn from(value: DownloadingState) -> Self {
        Self(value)
    }
}

#[derive(SimpleObject)]
pub struct ChapterImageFetchingStatus {
    filename: String,
    index: usize,
    len: usize,
}

#[Object]
impl ChapterDownloadingState {
    pub async fn is_preloading(&self) -> bool {
        matches!(self.0, DownloadingState::Preloading)
    }
    pub async fn is_fetching_data(&self) -> bool {
        matches!(self.0, DownloadingState::FetchingData)
    }
    pub async fn fetching_image(&self) -> Option<ChapterImageFetchingStatus> {
        if let DownloadingState::FetchingImage {
            filename,
            index,
            len,
        } = self.0.clone()
        {
            Some(ChapterImageFetchingStatus {
                filename,
                index,
                len,
            })
        } else {
            None
        }
    }
    pub async fn is_fetching_at_home_data(&self) -> bool {
        matches!(self.0, DownloadingState::FetchingAtHomeData)
    }
}

#[Object]
impl ChapterDownloadState {
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
    pub async fn downloading(&self) -> Option<ChapterDownloadingState> {
        if let Self::Downloading(d) = self {
            Some(d.clone().into())
        } else {
            None
        }
    }
}

fn get_chapter_download_state_rx<R: Runtime, M: Manager<R> + Clone + Send + 'static>(
    app: &M,
    id: Uuid,
) -> crate::Result<Receiver<ChapterDownloadState>> {
    let maybe_manager = weak_download_manager(app)?;
    let (tx, rx) = watch(ChapterDownloadState::Pending);
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
                        let to_send: ChapterDownloadState = {
                            match GetManager::<ChapterDownloadManager>::get(&manager).await {
                                Ok(manager) => {
                                    match manager.new_task(ChapterDownloadMessage::new(id)).await {
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
                                                    let data: ChapterDownloadState =
                                                        { (*sub.borrow()).clone().into() };
                                                    data
                                                }
                                                Err(err) => ChapterDownloadState::Error(err.into()),
                                            }
                                        }
                                        Err(err) => ChapterDownloadState::Error(
                                            ManagerError::MailBox(err).into(),
                                        ),
                                    }
                                }
                                Err(err) => {
                                    ChapterDownloadState::Error(ManagerError::MailBox(err).into())
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
                        ChapterDownloadState::OfflineAppStateNotLoaded
                    }
                },
                join_res = handle => {
                    match join_res {
                        Ok(Some(res)) => res,
                        Ok(None) => ChapterDownloadState::OfflineAppStateNotLoaded,
                        Err(err) => {
                            eprintln!("{:?}", err);
                            continue;
                        },
                    }
                },
                else => break
            };
            if matches!(to_send, ChapterDownloadState::OfflineAppStateNotLoaded) {
                *is_readed.write().await = false;
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

pub struct ChapterDownloadSubs;

#[Subscription]
impl ChapterDownloadSubs {
    pub async fn listen_to_chapter_tasks<'ctx>(
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
            <Addr<DownloadManager> as GetManager<ChapterDownloadManager>>::get(&offline_read)
                .await?;
        let notify = manager.notify().await?;
        let stream = stream! {
            loop {
                select! {
                    _ = notify.notified() => {
                        if let Ok(tasks) = manager.tasks_id().await {
                            yield tasks
                        }
                    }
                    else => break
                }
            }
        };
        Ok(stream)
    }
    pub async fn listen_to_download_state<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        chapter_id: Uuid,
    ) -> Result<impl Stream<Item = ChapterDownloadState> + 'ctx> {
        let window = ctx.get_window::<tauri::Wry>()?.clone();
        Ok(WatchSubscriptionStream::new(get_chapter_download_state_rx(
            &window, chapter_id,
        )?))
        /* let stream = stream! {
            let mut is_readed = false;
            loop {
                select! {
                    Some(mounted) = is_mounted.next() => {
                        if mounted {
                            let olar = maybe_offline.read().await;
                            if let Some(offline) = (*olar).as_ref() {
                                let _ = tx.send_replace(Some(offline.app_state.clone()));
                            }else {
                                yield ChapterDownloadState::OfflineAppStateNotLoaded;
                            }
                        }else {
                            let _ = tx.send_replace(None);
                            is_readed = false;
                            yield ChapterDownloadState::OfflineAppStateNotLoaded;
                        }
                    }
                    Some(manager) = async{ (*rx.borrow()).clone() } => {
                        match GetManager::<ChapterDownloadManager>::get(&manager).await {
                            Ok(manager) => {
                                match manager.new_task(ChapterDownloadMessage::new(chapter_id)).await {
                                    Ok(task) => {
                                        match task.subscribe().await {
                                            Ok(mut sub) => {
                                                if is_readed {
                                                    let _ = sub.changed().await;
                                                }else {
                                                    is_readed = true;
                                                }
                                                let data: ChapterDownloadState = {
                                                    (*sub.borrow()).clone().into()
                                                };
                                                yield data
                                            },
                                            Err(err) => yield ChapterDownloadState::Error(err.into())
                                        }
                                    },
                                    Err(err) => {
                                        yield ChapterDownloadState::Error(ManagerError::MailBox(err).into())
                                    }
                                }
                            },
                            Err(err) => {
                                yield ChapterDownloadState::Error(ManagerError::MailBox(err).into())
                            }
                        }
                    }
                    else => break
                }
            }
            println!("Leaves streams")
        };
        Ok(stream)
         */
    }
}
