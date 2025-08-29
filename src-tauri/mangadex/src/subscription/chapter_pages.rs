use async_graphql::{Context, Subscription};
use uuid::Uuid;

use crate::{
    cache::chapter::{ChapterPagesHandle, ChapterPagesStream},
    store::types::enums::chapter_quality::DownloadMode,
    utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
};

#[derive(Debug, Clone, Default, Copy)]
pub struct ChapterPagesSubscription;

#[Subscription]
impl ChapterPagesSubscription {
    pub async fn get_chapter_pages(
        &self,
        ctx: &Context<'_>,
        chapter: Uuid,
        mode: Option<DownloadMode>,
    ) -> crate::Result<ChapterPagesStream> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?;
        let store = app_handle.get_chapter_pages_store();
        if let Ok(mut store_write) = store.write() {
            let handle =
                store_write.get_handle(chapter, mode.unwrap_or_default(), app_handle.clone())?;
            handle.fetch_metadata();
            Ok(ChapterPagesHandle::subscribe_with_stream(handle))
        } else {
            Err(crate::Error::SyncPoison)
        }
    }
}
