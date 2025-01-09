use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use super::utils::{FilterWatchOptionDataById, WatchSubscriptionStream};

#[derive(Debug, Clone, Copy)]
pub struct ChapterReadMarkerSubscriptions;

#[Subscription]
impl ChapterReadMarkerSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        chapter_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
                w.read_marker.subscribe()
            })?
            .option_filter_by_id(chapter_id),
        )
    }
}
