use crate::{objects::oauth::ClientInfo, Result};
use async_graphql::{Context, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use super::utils::WatchSubscriptionStream;

#[derive(Debug, Clone, Copy)]
pub struct OauthSubscriptions;

#[Subscription]
impl OauthSubscriptions {
    pub async fn listen<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = Option<ClientInfo>> + 'ctx> {
        WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(ctx, sub_id, |w| {
            w.client_info.subscribe()
        })
    }
}
