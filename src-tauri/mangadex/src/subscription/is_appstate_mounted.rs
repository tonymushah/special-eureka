use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::Stream;

use super::utils::WatchSubscriptionStream;

#[derive(Debug, Clone, Copy)]
pub struct IsAppStateMountedSubscriptions;

#[Subscription]
impl IsAppStateMountedSubscriptions {
    pub async fn listen<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
            w.is_appstate_mounted.subscribe()
        })
    }
}
