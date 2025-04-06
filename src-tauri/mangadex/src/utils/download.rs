use std::sync::Arc;

use actix::{dev::ToEnvelope, Actor, Addr, Handler, WeakAddr};
use eureka_mmanager::{
    download::{
        messages::SubcribeMessage,
        messages::TaskStateMessage,
        traits::{
            managers::TaskManagerAddr,
            task::{State, Subscribe},
        },
    },
    prelude::{AsyncSubscribe, GetManager},
    DownloadManager, Error as ManagerError, OwnedError,
};
use tokio::{sync::RwLock, task::JoinHandle};
use uuid::Uuid;

pub mod chapter;
pub mod cover;
pub mod manga;

type ArcRwLock<T> = Arc<RwLock<T>>;

pub trait NextTaskValue {
    type DownloadingState;
    fn pending() -> Self;
    fn downloading(value: Self::DownloadingState) -> Self;
    fn error(error: OwnedError) -> Self;
    fn done() -> Self;
    fn canceled() -> Self;
    fn offline_app_state_not_loaded() -> Self;
}

pub fn get_next_task_value<M, T, O>(
    maybe_manager: ArcRwLock<Option<WeakAddr<DownloadManager>>>,
    is_readed: ArcRwLock<bool>,
    id: Uuid,
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
            Ok(manager) => match manager.new_task(id.into()).await {
                Ok(task) => {
                    drop(manager);
                    match task.subscribe().await {
                        Ok(mut sub) => {
                            drop(task);
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
            },
            Err(err) => O::error(ManagerError::MailBox(err).into()).into(),
        }
    })
}
