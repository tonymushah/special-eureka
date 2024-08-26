pub mod manga;

use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use crate::objects::statistics::StatisticsComments;

use super::utils::{FilterWatchOptionDataById, OptionFlattenStream, WatchSubscriptionStream};

#[derive(Debug, Clone, Copy)]
pub struct StatisticsSubscriptions;

#[Subscription]
impl StatisticsSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = StatisticsComments> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(
                ctx,
                sub_id,
                |w| w.statistics.subscribe(),
            )?
            .option_filter_by_id(id)
            .option_flatten(),
        )
    }
}
