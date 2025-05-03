use std::{fmt::Debug, sync::Arc, time::Duration};

use actix::{dev::ToEnvelope, Actor, Addr, Handler, WeakAddr};
use eureka_mmanager::{
    download::{
        messages::{SubcribeMessage, TaskStateMessage},
        traits::{
            managers::TaskManagerAddr,
            task::{State, Subscribe},
        },
    },
    prelude::{AsyncSubscribe, GetManager},
    DownloadManager, Error as ManagerError, OwnedError,
};
use tauri::{Manager, Runtime};
use tokio::{
    select,
    sync::{
        watch::{channel as watch, Receiver},
        RwLock,
    },
    task::JoinHandle,
    time::sleep,
};
use tokio_stream::StreamExt;
use uuid::Uuid;

use crate::{
    app_state::watch::weak_download_manager, subscription::utils::WatchSubscriptionStream,
    utils::abort::AbortHandleGuard,
};

use super::watch::is_appstate_mounted::IsAppStateMountedWatch;

type ArcRwLock<T> = Arc<RwLock<T>>;

pub trait NextTaskValue {
    type DownloadingState;
    fn pending() -> Self;
    fn downloading(value: Self::DownloadingState) -> Self;
    fn error(error: OwnedError) -> Self;
    fn done() -> Self;
    fn canceled() -> Self;
    fn offline_app_state_not_loaded() -> Self;
    fn is_pending(&self) -> bool;
    fn is_done(&self) -> bool;
    fn is_canceled(&self) -> bool;
    fn is_offline_app_state_not_loaded(&self) -> bool;
}

pub fn get_next_task_value<M, T, O>(
    maybe_manager: ArcRwLock<Option<WeakAddr<DownloadManager>>>,
    is_readed: ArcRwLock<bool>,
    id: Uuid,
    deferred: bool,
) -> JoinHandle<Option<O>>
where
    O: NextTaskValue + Send + 'static,
    T: Actor
        + Handler<TaskStateMessage>
        + State
        + Subscribe
        + Handler<SubcribeMessage<<T as State>::State>>,
    <T as State>::State: Into<O> + 'static + Send + Sync + Clone,
    <T as Actor>::Context:
        ToEnvelope<T, SubcribeMessage<<T as State>::State>> + ToEnvelope<T, TaskStateMessage>,
    <T as Actor>::Context: ToEnvelope<T, TaskStateMessage>,

    Addr<M>: TaskManagerAddr<Task = T>,
    <Addr<M> as TaskManagerAddr>::DownloadMessage: From<Uuid>,
    Addr<DownloadManager>: GetManager<M>,
    M: actix::Actor,
{
    tokio::spawn(async move {
        let manager = maybe_manager
            .read()
            .await
            .as_ref()
            .and_then(|m| m.upgrade())?;
        match GetManager::<M>::get(&manager).await {
            Ok(manager) => {
                let task = if deferred {
                    match manager.get_task(id).await {
                        Ok(t) => t?,
                        Err(err) => return O::error(ManagerError::MailBox(err).into()).into(),
                    }
                } else {
                    match manager.new_task(id.into()).await {
                        Ok(t) => t,
                        Err(err) => return O::error(ManagerError::MailBox(err).into()).into(),
                    }
                };
                drop(manager);
                match task.subscribe().await {
                    Ok(mut sub) => {
                        if deferred {
                            drop(task);
                        }
                        if *is_readed.read().await {
                            if sub.changed().await.is_err() {
                                return None;
                            }
                        } else {
                            *is_readed.write().await = true;
                        }
                        let data = { (*sub.borrow()).clone().into() };
                        Some(data)
                    }
                    Err(err) => O::error(err.into()).into(),
                }
            }
            Err(err) => O::error(ManagerError::MailBox(err).into()).into(),
        }
    })
}

pub fn get_download_state_rx<M, T, O, R, A>(
    app: &A,
    id: Uuid,
    deferred: bool,
) -> crate::Result<Receiver<O>>
where
    R: Runtime,
    A: Manager<R> + Clone + Send + 'static,
    O: NextTaskValue + Send + 'static + Debug + Sync,
    T: Actor
        + Handler<TaskStateMessage>
        + State
        + Subscribe
        + Handler<SubcribeMessage<<T as State>::State>>,
    <T as State>::State: Into<O> + 'static + Send + Sync + Clone,
    <T as Actor>::Context:
        ToEnvelope<T, SubcribeMessage<<T as State>::State>> + ToEnvelope<T, TaskStateMessage>,
    <T as Actor>::Context: ToEnvelope<T, TaskStateMessage>,

    Addr<M>: TaskManagerAddr<Task = T>,
    <Addr<M> as TaskManagerAddr>::DownloadMessage: From<Uuid>,
    Addr<DownloadManager>: GetManager<M>,
    M: actix::Actor,
{
    let maybe_manager = weak_download_manager(app)?;
    let (tx, rx) = watch(O::pending());
    let mut is_mounted_stream =
        WatchSubscriptionStream::<_>::from_tauri_manager::<IsAppStateMountedWatch, R, A>(app)?;
    tokio::spawn(async move {
        let is_readed = Arc::new(RwLock::new(false));
        loop {
            let maybe_manager = maybe_manager.clone();
            let is_readed = is_readed.clone();
            let handle =
                get_next_task_value::<M, T, _>(maybe_manager, is_readed.clone(), id, deferred);
            let _abort = AbortHandleGuard::new(handle.abort_handle());
            let to_send = select! {
                _ = tx.closed() => {
                    #[cfg(debug_assertions)]
                    log::debug!("closed xD");
                    break;
                },
                Some(is_mounted) = is_mounted_stream.next() => {
                    if is_mounted {
                        continue;
                    }else {
                        O::offline_app_state_not_loaded().into()
                    }
                },
                join_res = handle => {
                    match join_res {
                        Ok(res) => res,
                        Err(err) => {
                            eprintln!("{:?}", err);
                            continue;
                        },
                    }
                },
                else => break
            };
            let Some(to_send) = to_send else {
                sleep(Duration::from_millis(1000)).await;
                continue;
            };
            if to_send.is_offline_app_state_not_loaded() {
                *is_readed.write().await = false;
            }
            // Prevent from sending the same data to the channel
            if {
                matches!(
                    (
                        to_send.is_offline_app_state_not_loaded(),
                        tx.borrow().is_offline_app_state_not_loaded()
                    ),
                    (true, true),
                )
            } {
                sleep(Duration::from_millis(1000)).await;
                continue;
            }
            #[cfg(debug_assertions)]
            log::debug!("{id} - {:?}", to_send);
            if tx.send(to_send).is_err() {
                break;
            }
        }
    });
    Ok(rx)
}
