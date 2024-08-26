use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use mangadex_api_types_rust::ReadingStatus;

use super::utils::{FilterWatchOptionDataById, WatchSubscriptionStream};

#[derive(Debug, Clone, Copy)]
pub struct MangaReadingStatusSubscriptions;

#[Subscription]
impl MangaReadingStatusSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = Option<ReadingStatus>> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(
                ctx,
                sub_id,
                |w| w.manga_reading_state.subscribe(),
            )?
            .option_filter_by_id(manga_id),
        )
    }
}
