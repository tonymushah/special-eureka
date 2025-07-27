use std::task::{Poll, ready};

use actix::{WeakRecipient, prelude::*};
use eureka_mmanager::{
    download::{
        chapter::{ChapterDownloadMessage, task::ChapterDownloadTaskState},
        messages::TaskSubscriberMessages,
    },
    prelude::{AsyncSubscribe, GetChapterDownloadManager},
    recipients::MaybeWeakRecipient,
};
use futures_util::{FutureExt, StreamExt};
use tauri::{
    AppHandle, Runtime,
    async_runtime::{Receiver, Sender, channel},
};
use tokio_stream::wrappers::WatchStream;
use uuid::Uuid;

use crate::{
    subscription::download_state::chapter::ChapterDownloadState,
    utils::{
        abort::AbortHandleGuard,
        traits_utils::{MangaDexActixArbiterHandleExt, MangadexTauriManagerExt},
    },
};

pub struct ChapterDownloadStream {
    rx: Receiver<SharedState>,
    actor: Addr<ChapterDownloadStreamActor>,
    _handle: AbortHandleGuard,
}

impl ChapterDownloadStream {
    pub fn recipient(&self) -> WeakRecipient<TaskSubscriberMessages<ChapterDownloadTaskState>> {
        self.actor.downgrade().recipient()
    }
    pub async fn get_from_app<R: Runtime>(app: &AppHandle<R>, id: Uuid) -> crate::Result<Self> {
        let (tx, rx) = channel::<SharedState>(super::CHANNEL_SIZE);
        let actor = {
            let atx = ChapterDownloadStreamActor { tx };
            app.get_actix_system()?
                .arbiter()
                .spawn_fn_with_data(move || atx.start())
                .await?
        };
        let recipient = actor
            .downgrade()
            .recipient::<TaskSubscriberMessages<ChapterDownloadTaskState>>();
        let offline_app_state_not_loaded_rx = actor
            .downgrade()
            .recipient::<super::OfflineAppStateNotLoadedMsg>();
        Ok(Self {
            rx,
            actor,
            _handle: {
                let app = app.clone();
                AbortHandleGuard::new(
                    tokio::spawn(async move {
                        let mut rcv =
                            WatchStream::new(app.get_watches()?.is_appstate_mounted.subscribe());
                        while (rcv.next().await).is_some() {
                            if let Some(stt) = app.get_offline_app_state()?.read().await.as_ref() {
                                stt.app_state
                                    .get_chapter_manager()
                                    .await?
                                    .send(ChapterDownloadMessage::new(id))
                                    .await?
                                    .subscribe(MaybeWeakRecipient::Weak(recipient.clone()))
                                    .await?;
                            } else if let Some(rec) = offline_app_state_not_loaded_rx.upgrade() {
                                rec.do_send(super::OfflineAppStateNotLoadedMsg);
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

impl Stream for ChapterDownloadStream {
    type Item = ChapterDownloadState;
    fn poll_next(
        mut self: std::pin::Pin<&mut Self>,
        cx: &mut std::task::Context<'_>,
    ) -> Poll<Option<Self::Item>> {
        loop {
            let data = ready!(self.rx.poll_recv(cx));
            if let Some(msg) = data {
                match msg {
                    SharedState::Task(msg) => match *msg {
                        TaskSubscriberMessages::State(state) => {
                            return dbg!(Poll::Ready(Some(state.into())));
                        }
                        _ => continue,
                    },
                    SharedState::OfflineAppStateNotLoaded => {
                        return Poll::Ready(Some(ChapterDownloadState::OfflineAppStateNotLoaded));
                    }
                }
            } else {
                return Poll::Ready(None);
            }
        }
    }
}

type SharedState = super::SharedState<Box<TaskSubscriberMessages<ChapterDownloadTaskState>>>;

struct ChapterDownloadStreamActor {
    tx: Sender<SharedState>,
}

impl Actor for ChapterDownloadStreamActor {
    type Context = Context<Self>;
}

impl Handler<TaskSubscriberMessages<ChapterDownloadTaskState>> for ChapterDownloadStreamActor {
    type Result = ();

    fn handle(
        &mut self,
        msg: TaskSubscriberMessages<ChapterDownloadTaskState>,
        _ctx: &mut Self::Context,
    ) -> Self::Result {
        let tx = self.tx.clone();
        async move { tx.send(SharedState::Task(msg.into())).await }
            .map(|d| {
                if let Err(err) = d {
                    log::error!("{err}");
                }
            })
            .into_actor(self)
            .wait(_ctx);
    }
}

impl Handler<super::OfflineAppStateNotLoadedMsg> for ChapterDownloadStreamActor {
    type Result = ();
    fn handle(
        &mut self,
        _: super::OfflineAppStateNotLoadedMsg,
        ctx: &mut Self::Context,
    ) -> Self::Result {
        let tx = self.tx.clone();
        async move { tx.send(SharedState::OfflineAppStateNotLoaded).await }
            .map(|d| {
                if let Err(err) = d {
                    log::error!("{err}");
                }
            })
            .into_actor(self)
            .wait(ctx);
    }
}
