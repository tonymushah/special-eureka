use std::{
    sync::{Arc, RwLock},
    task::{Poll, Waker},
};

use actix::{WeakRecipient, prelude::*};
use eureka_mmanager::{
    download::{
        manga::{MangaDownloadMessage, task::MangaDownloadTaskState},
        messages::TaskSubscriberMessages,
    },
    prelude::{AsyncSubscribe, GetMangaDownloadManager},
    recipients::MaybeWeakRecipient,
};
use futures_util::StreamExt;
use tauri::{AppHandle, Runtime};
use tokio_stream::wrappers::WatchStream;
use uuid::Uuid;

use crate::{
    subscription::download_state::manga::MangaDownloadState,
    utils::{
        abort::AbortHandleGuard,
        traits_utils::{MangaDexActixArbiterHandleExt, MangadexTauriManagerExt},
    },
};

type SharedState = Arc<RwLock<Option<TaskSubscriberMessages<MangaDownloadTaskState>>>>;

#[derive(Default)]
struct MangaDownloadStreamActor {
    current_state: SharedState,
    waker: Option<Waker>,
}

impl Actor for MangaDownloadStreamActor {
    type Context = Context<Self>;
}

impl Handler<TaskSubscriberMessages<MangaDownloadTaskState>> for MangaDownloadStreamActor {
    type Result = ();

    fn handle(
        &mut self,
        msg: TaskSubscriberMessages<MangaDownloadTaskState>,
        _ctx: &mut Self::Context,
    ) -> Self::Result {
        self.current_state.clear_poison();
        if let Ok(mut write) = self.current_state.write() {
            write.replace(msg);
        }
        if let Some(waker) = &self.waker {
            waker.wake_by_ref();
        }
    }
}

#[derive(Message)]
#[rtype(result = "()")]
struct SendWaker(Waker);

impl Handler<SendWaker> for MangaDownloadStreamActor {
    type Result = ();
    fn handle(&mut self, msg: SendWaker, _ctx: &mut Self::Context) -> Self::Result {
        match self.waker.as_mut() {
            Some(waker) => waker.clone_from(&msg.0),
            None => self.waker = Some(msg.0),
        }
    }
}

pub struct MangaDownloadStream {
    current_state: SharedState,
    actor: Addr<MangaDownloadStreamActor>,
    app_state_watch: WatchStream<bool>,
    _handle: AbortHandleGuard,
}

impl Stream for MangaDownloadStream {
    type Item = MangaDownloadState;
    fn poll_next(
        mut self: std::pin::Pin<&mut Self>,
        cx: &mut std::task::Context<'_>,
    ) -> Poll<Option<Self::Item>> {
        self.actor.do_send(SendWaker(cx.waker().clone()));

        if let Poll::Ready(Some(false)) = Box::pin(&mut self.app_state_watch).poll_next_unpin(cx) {
            return Poll::Ready(Some(MangaDownloadState::OfflineAppStateNotLoaded));
        }

        self.current_state.clear_poison();
        match self.current_state.read() {
            Ok(data) => {
                if let Some(msg) = data.as_ref() {
                    match msg {
                        TaskSubscriberMessages::State(state) => {
                            Poll::Ready(Some(state.clone().into()))
                        }
                        _ => Poll::Pending,
                    }
                } else {
                    Poll::Pending
                }
            }
            Err(_) => Poll::Ready(None),
        }
    }
}

impl MangaDownloadStream {
    pub fn recipient(&self) -> WeakRecipient<TaskSubscriberMessages<MangaDownloadTaskState>> {
        self.actor.downgrade().recipient()
    }
    pub async fn get_from_app<R: Runtime>(app: &AppHandle<R>, id: Uuid) -> crate::Result<Self> {
        let current_state = SharedState::default();
        let actor = {
            let atx = MangaDownloadStreamActor {
                current_state: current_state.clone(),
                waker: None,
            };
            app.get_actix_system()?
                .arbiter()
                .spawn_fn_with_data(move || atx.start())
                .await?
        };
        let recipient = actor
            .downgrade()
            .recipient::<TaskSubscriberMessages<MangaDownloadTaskState>>();
        Ok(Self {
            current_state,
            actor,
            app_state_watch: WatchStream::new(app.get_watches()?.is_appstate_mounted.subscribe()),
            _handle: {
                let app = app.clone();
                AbortHandleGuard::new(
                    tokio::spawn(async move {
                        let mut rcv =
                            WatchStream::new(app.get_watches()?.is_appstate_mounted.subscribe());
                        while (rcv.next().await).is_some() {
                            if let Some(stt) = app.get_offline_app_state()?.read().await.as_ref() {
                                stt.app_state
                                    .get_manga_manager()
                                    .await?
                                    .send(MangaDownloadMessage::new(id))
                                    .await?
                                    .subscribe(MaybeWeakRecipient::Weak(recipient.clone()))
                                    .await?;
                            } else if let Some(rec) = recipient.upgrade() {
                                rec.do_send(TaskSubscriberMessages::Dropped);
                            }
                        }
                        Ok::<_, crate::Error>(())
                    })
                    .abort_handle(),
                )
            },
        })
    }
}
