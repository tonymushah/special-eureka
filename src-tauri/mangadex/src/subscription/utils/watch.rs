use async_graphql::Context as GQLContext;
use tauri::Runtime;
use tokio::sync::watch::{Receiver, Sender};
use tokio_stream::{wrappers::WatchStream, Stream, StreamExt};

use std::{
    future::Future,
    ops::Deref,
    pin::Pin,
    task::{Context, Poll},
};

use crate::utils::{get_watches_from_graphql_context, watch::Watches};

pub struct WatchSubscriptionStream<T>
where
    T: Clone + 'static + Send + Sync,
{
    recv: WatchStream<T>,
    _recv: Receiver<T>,
}

impl<T> Unpin for WatchSubscriptionStream<T> where T: Clone + 'static + Send + Sync {}

impl<T> Clone for WatchSubscriptionStream<T>
where
    T: Clone + 'static + Send + Sync,
{
    /// Create a separate watch subscription stream but stops when the window is destroyed or
    fn clone(&self) -> Self {
        Self::new(self._recv.clone())
    }
}
impl<T> WatchSubscriptionStream<T>
where
    T: Clone + 'static + Send + Sync,
{
    pub fn new(recv: Receiver<T>) -> Self {
        Self {
            recv: WatchStream::new(recv.clone()),
            _recv: recv,
        }
    }

    pub fn from_async_graphql_context<F, R>(
        ctx: &GQLContext<'_>,
        provider: F,
    ) -> crate::Result<Self>
    where
        R: Runtime,
        F: FnOnce(&Watches) -> Receiver<T>,
    {
        let watches = get_watches_from_graphql_context::<R>(ctx)?;
        Ok(Self::new(provider(&watches)))
    }
    pub fn from_async_graphql_context_watch_as_ref<W, R>(
        ctx: &GQLContext<'_>,
    ) -> crate::Result<Self>
    where
        R: Runtime,
        W: Deref<Target = Sender<T>>,
        Watches: AsRef<W>,
    {
        let watches = get_watches_from_graphql_context::<R>(ctx)?;
        let to_use: &W = watches.as_ref();
        Ok(Self::new(to_use.subscribe()))
    }
}

impl<T> Stream for WatchSubscriptionStream<T>
where
    T: Clone + 'static + Send + Sync,
{
    type Item = T;

    fn poll_next(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Option<Self::Item>> {
        let res = self.recv.next();
        Box::pin(res).as_mut().poll(cx)
    }
}
