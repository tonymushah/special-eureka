use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::{
    store::types::enums::chapter_quality::DownloadMode,
    utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
};

pub struct ChapterPagesStoreMutation {
    pub id: Uuid,
    pub mode: DownloadMode,
}

#[Object]
impl ChapterPagesStoreMutation {
    pub async fn fetch_metadata(&self, ctx: &Context<'_>) -> crate::Result<bool> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let store = app.get_chapter_pages_store();
        if let Ok(mut store_write) = store.write() {
            store_write
                .get_handle(self.id, self.mode, app.clone())?
                .fetch_metadata();
        }
        Ok(true)
    }
    pub async fn start_caching(&self, ctx: &Context<'_>) -> crate::Result<bool> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let store = app.get_chapter_pages_store();
        if let Ok(mut store_write) = store.write() {
            store_write
                .get_handle(self.id, self.mode, app.clone())?
                .start_caching();
        }
        Ok(true)
    }
    pub async fn refetch_page(&self, ctx: &Context<'_>, page: u32) -> crate::Result<bool> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let store = app.get_chapter_pages_store();
        if let Ok(mut store_write) = store.write() {
            store_write
                .get_handle(self.id, self.mode, app.clone())?
                .refetch_page(page);
        }
        Ok(true)
    }
}
