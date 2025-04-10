use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::{Stream, StreamExt};
use uuid::Uuid;

use crate::objects::chapter::attributes::ChapterAttributes;

use super::utils::{FilterWatchOptionDataById, WatchSubscriptionStream};

#[derive(Debug, Clone, Copy)]
pub struct ChapterSubscriptions;

#[Subscription]
impl ChapterSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        chapter_id: Uuid,
    ) -> Result<impl Stream<Item = ChapterAttributes> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
                w.chapter.subscribe()
            })?
            .option_filter_by_id(chapter_id)
            .map(|data| data.inner_data()),
        )
    }
}
