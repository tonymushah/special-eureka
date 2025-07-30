use std::task::{Poll, ready};

use actix::{WeakRecipient, prelude::*};
use eureka_mmanager::{
    download::{
        cover::{CoverDownloadMessage, task::CoverDownloadTaskState},
        messages::TaskSubscriberMessages,
    },
    prelude::{AsyncSubscribe, GetCoverDownloadManager},
    recipients::MaybeWeakRecipient,
};
use futures_util::StreamExt;
use tauri::{
    AppHandle, Runtime,
    async_runtime::{Receiver, Sender, channel},
};
use tokio_stream::wrappers::WatchStream;
use uuid::Uuid;

use crate::{
    subscription::download_state::cover::CoverDownloadState,
    utils::{
        abort::AbortHandleGuard,
        traits_utils::{MangaDexActixArbiterHandleExt, MangadexTauriManagerExt},
    },
};

type SharedState = super::SharedState<Box<TaskSubscriberMessages<CoverDownloadTaskState>>>;

struct CoverDownloadStreamActor {
    tx: Sender<SharedState>,
}

impl Actor for CoverDownloadStreamActor {
    type Context = Context<Self>;
}

impl Handler<TaskSubscriberMessages<CoverDownloadTaskState>> for CoverDownloadStreamActor {
    type Result = ();

    fn handle(
        &mut self,
        msg: TaskSubscriberMessages<CoverDownloadTaskState>,
        _ctx: &mut Self::Context,
    ) -> Self::Result {
        let tx = self.tx.clone();
        async move { tx.send(SharedState::Task(msg.into())).await }
            .into_actor(self)
            .map(|d, _, ctx| {
                if d.is_err() {
                    ctx.stop();
                }
            })
            .wait(_ctx);
    }
}

impl Handler<super::OfflineAppStateNotLoadedMsg> for CoverDownloadStreamActor {
    type Result = ();
    fn handle(
        &mut self,
        _: super::OfflineAppStateNotLoadedMsg,
        ctx: &mut Self::Context,
    ) -> Self::Result {
        let tx = self.tx.clone();
        async move { tx.send(SharedState::OfflineAppStateNotLoaded).await }
            .into_actor(self)
            .map(|d, _, ctx| {
                if d.is_err() {
                    ctx.stop();
                }
            })
            .wait(ctx);
    }
}

pub struct CoverDownloadStream {
    rx: Receiver<SharedState>,
    actor: Addr<CoverDownloadStreamActor>,
    _handle: AbortHandleGuard,
}

impl Stream for CoverDownloadStream {
    type Item = CoverDownloadState;
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
                        return Poll::Ready(Some(CoverDownloadState::OfflineAppStateNotLoaded));
                    }
                }
            } else {
                return Poll::Ready(None);
            }
        }
    }
}

impl CoverDownloadStream {
    pub fn recipient(&self) -> WeakRecipient<TaskSubscriberMessages<CoverDownloadTaskState>> {
        self.actor.downgrade().recipient()
    }
    pub async fn get_from_app<R: Runtime>(app: &AppHandle<R>, id: Uuid) -> crate::Result<Self> {
        let (tx, rx) = channel::<SharedState>(super::CHANNEL_SIZE);

        let actor = {
            let atx = CoverDownloadStreamActor { tx };
            app.get_actix_system()?
                .arbiter()
                .spawn_fn_with_data(move || atx.start())
                .await?
        };
        let recipient = actor
            .downgrade()
            .recipient::<TaskSubscriberMessages<CoverDownloadTaskState>>();
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
                                    .get_cover_manager()
                                    .await?
                                    .send(CoverDownloadMessage::new(id))
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
