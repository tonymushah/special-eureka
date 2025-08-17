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
        if let Ok(store_read) = store.read() {
            let Some(handle) = store_read.get_handle_maybe_not_loaded(self.id, self.mode) else {
                return Ok(false);
            };
            handle.fetch_metadata();
            Ok(true)
        } else {
            Ok(false)
        }
    }
    pub async fn start_caching(&self, ctx: &Context<'_>) -> crate::Result<bool> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let store = app.get_chapter_pages_store();
        if let Ok(store_read) = store.read() {
            let Some(handle) = store_read.get_handle_maybe_not_loaded(self.id, self.mode) else {
                return Ok(false);
            };
            handle.start_caching();
            Ok(true)
        } else {
            Ok(false)
        }
    }
    pub async fn refetch_page(&self, ctx: &Context<'_>, page: u32) -> crate::Result<bool> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let store = app.get_chapter_pages_store();
        if let Ok(store_read) = store.read() {
            let Some(handle) = store_read.get_handle_maybe_not_loaded(self.id, self.mode) else {
                return Ok(false);
            };
            handle.refetch_page(page);
            Ok(true)
        } else {
            Ok(false)
        }
    }
    pub async fn resend_page(&self, ctx: &Context<'_>, page: u32) -> crate::Result<bool> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let store = app.get_chapter_pages_store();
        if let Ok(store_read) = store.read() {
            let Some(handle) = store_read.get_handle_maybe_not_loaded(self.id, self.mode) else {
                return Ok(false);
            };
            handle.resend_page(page);
            Ok(true)
        } else {
            Ok(false)
        }
    }
    pub async fn resend_all(&self, ctx: &Context<'_>) -> crate::Result<bool> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let store = app.get_chapter_pages_store();
        if let Ok(store_read) = store.read() {
            let Some(handle) = store_read.get_handle_maybe_not_loaded(self.id, self.mode) else {
                return Ok(false);
            };
            handle.resend_all();
            Ok(true)
        } else {
            Ok(false)
        }
    }
}
