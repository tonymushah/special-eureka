use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use super::utils::WatchSubscriptionStream;

#[derive(Debug, Clone, Copy)]
pub struct IsLoggedSubscriptions;

#[Subscription]
impl IsLoggedSubscriptions {
    pub async fn listen<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(
                ctx,
                sub_id,
                |w| w.is_logged.subscribe(),
            )?,
        )
    }
}
