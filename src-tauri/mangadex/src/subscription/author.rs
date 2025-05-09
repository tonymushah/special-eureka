use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use crate::objects::author::attributes::AuthorAttributes;

use super::utils::{FilterWatchOptionDataById, WatchSubscriptionStream};

#[derive(Debug, Clone, Copy)]
pub struct AuthorSubscriptions;

#[Subscription]
impl AuthorSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        author_id: Uuid,
    ) -> Result<impl Stream<Item = AuthorAttributes> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
                w.author.subscribe()
            })?
            .option_filter_by_id(author_id),
        )
    }
}
