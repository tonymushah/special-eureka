use crate::{Result, objects::oauth::ClientInfo};
use async_graphql::{Context, Subscription};
use tokio_stream::Stream;

use super::utils::WatchSubscriptionStream;

#[derive(Debug, Clone, Copy)]
pub struct OauthSubscriptions;

#[Subscription]
impl OauthSubscriptions {
    pub async fn listen<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Option<ClientInfo>> + 'ctx> {
        WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
            w.client_info.subscribe()
        })
    }
}
