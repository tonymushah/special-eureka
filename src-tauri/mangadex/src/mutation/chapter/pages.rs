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
    pub async fn refetch_incompletes(&self, ctx: &Context<'_>) -> crate::Result<bool> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let store = app.get_chapter_pages_store();
        if let Ok(store_read) = store.read() {
            let Some(handle) = store_read.get_handle_maybe_not_loaded(self.id, self.mode) else {
                return Ok(false);
            };
            handle.refetch_incompletes();
            Ok(true)
        } else {
            Ok(false)
        }
    }
    pub async fn export_page(
        &self,
        ctx: &Context<'_>,
        export_path: String,
        page: u32,
        defer: Option<bool>,
    ) -> crate::Result<Option<String>> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let store = app.get_chapter_pages_store();
        let handle = {
            let Ok(store_read) = store.read() else {
                return Ok(None);
            };
            let Some(handle) = store_read.get_handle_maybe_not_loaded(self.id, self.mode) else {
                return Ok(None);
            };
            handle
        };
        if defer.unwrap_or_default() {
            handle.export_page_defer(page, export_path);
            Ok(None)
        } else {
            let p = handle.export_page(page, export_path).await?;
            Ok(Some(p))
        }
    }
}
