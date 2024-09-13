use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use crate::objects::scanlation_group::attributes::ScanlationGroupAttributes;

use super::utils::{FilterWatchOptionDataById, WatchSubscriptionStream};

#[derive(Debug, Clone, Copy)]
pub struct ScanlationGroupSubscriptions;

#[Subscription]
impl ScanlationGroupSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        scanlation_group_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = ScanlationGroupAttributes> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(
                ctx,
                sub_id,
                |w| w.scanlation_group.subscribe(),
            )?
            .option_filter_by_id(scanlation_group_id),
        )
    }
}
