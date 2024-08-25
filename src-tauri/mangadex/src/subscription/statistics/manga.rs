use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::{Stream, StreamExt};
use uuid::Uuid;

use crate::objects::statistics::manga::MangaStatisticsAttributes;

use crate::subscription::utils::WatchSubscriptionStream;

#[derive(Debug, Clone, Copy)]
pub struct MangaStatisticsSubscriptions;

#[Subscription]
impl MangaStatisticsSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = MangaStatisticsAttributes> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(
                ctx,
                sub_id,
                |watches| watches.manga_statistics.subscribe(),
            )?
            .filter_map(move |v| {
                v.filter(|data| data.id == manga_id)
                    .map(|data| data.attributes)
            }),
        )
    }
}
