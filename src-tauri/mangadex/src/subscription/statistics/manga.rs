use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use crate::objects::statistics::manga::MangaStatisticsAttributes;

use crate::subscription::utils::{FilterWatchOptionDataById, WatchSubscriptionStream};

#[derive(Debug, Clone, Copy)]
pub struct MangaStatisticsSubscriptions;

#[Subscription]
impl MangaStatisticsSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
    ) -> Result<impl Stream<Item = MangaStatisticsAttributes> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(
                ctx,
                |watches| watches.manga_statistics.subscribe(),
            )?
            .option_filter_by_id(manga_id),
        )
    }
}
