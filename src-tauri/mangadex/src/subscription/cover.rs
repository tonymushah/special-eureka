use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::{Stream, StreamExt};
use uuid::Uuid;

use crate::objects::cover::attributes::CoverAttributes;

use super::utils::{FilterWatchOptionDataById, WatchSubscriptionStream};

#[derive(Debug, Clone, Copy)]
pub struct CoverSubscriptions;

#[Subscription]
impl CoverSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        cover_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = CoverAttributes> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(
                ctx,
                sub_id,
                |w| w.cover.subscribe(),
            )?
            .option_filter_by_id(cover_id)
            .map(|data| data.inner_data()),
        )
    }
}
