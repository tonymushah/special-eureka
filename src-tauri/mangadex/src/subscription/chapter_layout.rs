use async_graphql::{Context, Subscription};
use tokio_stream::Stream;

use crate::{
    store::types::structs::chapter_layout::ChapterLayoutStore,
    utils::watch::chapter_layout::ChapterLayoutWatch,
};

use super::utils::WatchSubscriptionStream;

#[derive(Debug, Default, Clone, Copy)]
pub struct ChapterLayoutSubscription;

#[Subscription]
impl ChapterLayoutSubscription {
    pub async fn watch_chapter_layout<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> crate::Result<impl Stream<Item = ChapterLayoutStore> + 'ctx> {
        WatchSubscriptionStream::from_async_graphql_context_watch_as_ref::<
            ChapterLayoutWatch,
            tauri::Wry,
        >(ctx)
    }
}
