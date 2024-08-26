use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use crate::objects::rating::RatingItemAttributes;

use super::utils::{FilterWatchOptionDataById, WatchSubscriptionStream};

#[derive(Debug, Clone, Copy)]
pub struct RatingSubscriptions;

#[Subscription]
impl RatingSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = RatingItemAttributes> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(
                ctx,
                sub_id,
                |w| w.rating.subscribe(),
            )?
            .option_filter_by_id(manga_id),
        )
    }
}
