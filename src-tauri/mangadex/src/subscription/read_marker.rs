use crate::{Result, subscription::utils::OptionFlattenStream};
use async_graphql::{Context, SimpleObject, Subscription};
use tokio_stream::{Stream, StreamExt};
use uuid::Uuid;

use super::utils::{FilterWatchOptionDataById, WatchSubscriptionStream};

#[derive(Debug, Clone, Copy, Default)]
pub struct ChapterReadMarkerSubscriptions;

#[derive(Debug, Clone, Copy, SimpleObject)]
pub struct ChapterReadMarkerSubItem {
    pub chapter: Uuid,
    pub read: bool,
}

#[Subscription]
impl ChapterReadMarkerSubscriptions {
    pub async fn watch_read_marker<'ctx>(
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
    pub async fn watch_read_markers<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = ChapterReadMarkerSubItem> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
                w.read_marker.subscribe()
            })?
            .option_flatten()
            .map(|d| ChapterReadMarkerSubItem {
                chapter: d.id,
                read: d.attributes,
            }),
        )
    }
}
