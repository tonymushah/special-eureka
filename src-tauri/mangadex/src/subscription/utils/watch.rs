use async_graphql::Context as GQLContext;
use tauri::{EventHandler, Runtime, Window, WindowEvent};
use tokio::{
    select,
    sync::watch::{Receiver, Sender},
};
use tokio_stream::{wrappers::WatchStream, Stream, StreamExt};
use tokio_util::sync::CancellationToken;
use uuid::Uuid;

use std::{
    future::Future,
    ops::Deref,
    pin::Pin,
    task::{Context, Poll},
};

use crate::utils::{
    get_watches_from_graphql_context, get_window_from_async_graphql, watch::Watches,
};

pub struct WatchSubscriptionStream<R, T>
where
    R: Runtime,
    T: Clone + 'static + Send + Sync,
{
    window: Window<R>,
    recv: WatchStream<T>,
    cancel_token: CancellationToken,
    sub_id_handler: EventHandler,
}

impl<R, T> Unpin for WatchSubscriptionStream<R, T>
where
    R: Runtime,
    T: Clone + 'static + Send + Sync,
{
}

impl<R, T> Drop for WatchSubscriptionStream<R, T>
where
    R: Runtime,
    T: Clone + 'static + Send + Sync,
{
    fn drop(&mut self) {
        // println!("unlisten");
        self.window.unlisten(self.sub_id_handler);
    }
}

impl<R, T> WatchSubscriptionStream<R, T>
where
    R: Runtime,
    T: Clone + 'static + Send + Sync,
{
    pub fn new(recv: Receiver<T>, window: Window<R>, sub_id: Uuid) -> Self {
        let cancel_token = CancellationToken::new();
        {
            let window_event_cancel_token = cancel_token.clone();
            window.on_window_event(move |e| {
                if let WindowEvent::Destroyed = e {
                    // println!("Destroyed");
                    window_event_cancel_token.cancel();
                }
            });
        }
        let sub_id_handler = {
            let window_event_cancel_token = cancel_token.clone();
            window.listen("sub_end", move |e| {
                if let Some(id) =
                    e.payload()
                        .map(|p| p.trim().replace('\"', ""))
                        .and_then(|payload| {
                            Uuid::parse_str(&payload)
                                /*
                                    .map_err(|er| {
                                        #[cfg(debug_assertions)]
                                        eprintln!("{:#?}", er);
                                        er
                                    })
                                */
                                .ok()
                        })
                {
                    if id == sub_id {
                        // println!("sub_end");
                        window_event_cancel_token.cancel();
                    }
                }
            })
        };
        Self {
            window,
            recv: WatchStream::new(recv),
            cancel_token,
            sub_id_handler,
        }
    }

    pub fn from_async_graphql_context<F>(
        ctx: &GQLContext<'_>,
        sub_id: Uuid,
        provider: F,
    ) -> crate::Result<Self>
    where
        F: FnOnce(&Watches) -> Receiver<T>,
    {
        let window = get_window_from_async_graphql::<R>(ctx)?.clone();
        let watches = get_watches_from_graphql_context::<R>(ctx)?;
        Ok(Self::new(provider(&watches), window, sub_id))
    }
    pub fn from_async_graphql_context_watch_as_ref<W>(
        ctx: &GQLContext<'_>,
        sub_id: Uuid,
    ) -> crate::Result<Self>
    where
        W: Deref<Target = Sender<T>>,
        Watches: AsRef<W>,
    {
        let window = get_window_from_async_graphql::<R>(ctx)?.clone();
        let watches = get_watches_from_graphql_context::<R>(ctx)?;
        let to_use: &W = watches.as_ref();
        Ok(Self::new(to_use.subscribe(), window, sub_id))
    }
}

impl<R, T> Stream for WatchSubscriptionStream<R, T>
where
    R: Runtime,
    T: Clone + 'static + Send + Sync,
{
    type Item = T;

    fn poll_next(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Option<Self::Item>> {
        let cancel_token = self.cancel_token.child_token();
        let recv_stream = self.recv.next();
        let res = async {
            select! {
                _ = cancel_token.cancelled_owned() => {
                    // println!("end");
                    None
                }
                res = recv_stream => {
                    // println!("new value");
                    res
                }
                else => {
                    // println!("end");
                    None
                }
            }
        };
        Box::pin(res).as_mut().poll(cx)
    }
}
