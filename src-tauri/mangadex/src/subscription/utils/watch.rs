use async_graphql::Context as GQLContext;
use tauri::{Runtime, Window};
use tokio::{
    select,
    sync::watch::{Receiver, Sender},
};
use tokio_stream::{wrappers::WatchStream, Stream, StreamExt};
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

use super::cancel_token::WindowCancellationToken;

pub struct WatchSubscriptionStream<R, T>
where
    R: Runtime,
    T: Clone + 'static + Send + Sync,
{
    win_cancel_token: WindowCancellationToken<R>,
    recv: WatchStream<T>,
    _recv: Receiver<T>,
}

impl<R, T> Deref for WatchSubscriptionStream<R, T>
where
    R: Runtime,
    T: Clone + 'static + Send + Sync,
{
    type Target = WindowCancellationToken<R>;
    fn deref(&self) -> &Self::Target {
        &self.win_cancel_token
    }
}

impl<R, T> Unpin for WatchSubscriptionStream<R, T>
where
    R: Runtime,
    T: Clone + 'static + Send + Sync,
{
}

impl<R, T> Clone for WatchSubscriptionStream<R, T>
where
    R: Runtime,
    T: Clone + 'static + Send + Sync,
{
    /// Create a separate watch subscription stream but stops when the window is destroyed or
    fn clone(&self) -> Self {
        Self::new(self._recv.clone(), self.window().clone(), self.sub_id())
    }
}
impl<R, T> WatchSubscriptionStream<R, T>
where
    R: Runtime,
    T: Clone + 'static + Send + Sync,
{
    pub fn new(recv: Receiver<T>, window: Window<R>, sub_id: Uuid) -> Self {
        Self {
            recv: WatchStream::new(recv.clone()),
            _recv: recv,
            win_cancel_token: WindowCancellationToken::new(window, sub_id),
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
        let cancel_token = self.cancel_token().child_token();
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
