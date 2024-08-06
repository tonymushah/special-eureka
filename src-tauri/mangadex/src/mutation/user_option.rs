use crate::{
    cache::{cover::CoverImageCache, favicon::clear_favicons_dir},
    store::types::{
        enums::image_fit::{ImageFit, ImageFitStore},
        structs::longstrip_image_width::LongstripImageWidthStore,
    },
    utils::get_app_handle_from_async_graphql,
    Result,
};
use async_graphql::{Context, Object};
use mangadex_api_types_rust::Language;

use crate::{
    store::types::{
        enums::{
            direction::{
                reading::ReadingDirectionStore, sidebar::SidebarDirectionStore, Direction,
            },
            reading_mode::{ReadingMode, ReadingModeStore},
        },
        structs::chapter_language::ChapterLanguagesStore,
        ExtractFromStore, StoreCrud,
    },
    utils::{get_store, get_watches_from_graphql_context, watch::SendData},
};

#[derive(Debug, Clone, Copy)]
pub struct UserOptionMutations;

#[Object]
impl UserOptionMutations {
    pub async fn set_reading_mode(
        &self,
        ctx: &Context<'_>,
        mode: ReadingMode,
    ) -> Result<ReadingMode> {
        let store = get_store::<tauri::Wry>(ctx).await?;
        let mut store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = ReadingModeStore::from(mode);
        inner.insert_and_save(&mut store_write)?;
        watches.reading_mode.send_data(inner)?;
        Ok(ReadingModeStore::extract_from_store(&store_write)?.into())
    }
    pub async fn set_page_direction(
        &self,
        ctx: &Context<'_>,
        direction: Direction,
    ) -> Result<Direction> {
        let store = get_store::<tauri::Wry>(ctx).await?;
        let mut store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = ReadingDirectionStore::from(direction);
        inner.insert_and_save(&mut store_write)?;
        watches.page_direction.send_data(inner)?;
        Ok(ReadingDirectionStore::extract_from_store(&store_write)?.into())
    }
    pub async fn set_sidebar_direction(
        &self,
        ctx: &Context<'_>,
        direction: Direction,
    ) -> Result<Direction> {
        let store = get_store::<tauri::Wry>(ctx).await?;
        let mut store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = SidebarDirectionStore::from(direction);
        inner.insert_and_save(&mut store_write)?;
        watches.sidebar_direction.send_data(inner)?;
        Ok(SidebarDirectionStore::extract_from_store(&store_write)?.into())
    }
    pub async fn set_chapter_languages(
        &self,
        ctx: &Context<'_>,
        languages: Vec<Language>,
    ) -> Result<Vec<Language>> {
        let store = get_store::<tauri::Wry>(ctx).await?;
        let mut store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = ChapterLanguagesStore::from(languages);
        inner.insert_and_save(&mut store_write)?;
        watches.chapter_languages.send_data(inner)?;
        Ok(ChapterLanguagesStore::extract_from_store(&store_write)?.into())
    }
    pub async fn set_image_fit(&self, ctx: &Context<'_>, image_fit: ImageFit) -> Result<ImageFit> {
        let store = get_store::<tauri::Wry>(ctx).await?;
        let mut store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = ImageFitStore::from(image_fit);
        inner.insert_and_save(&mut store_write)?;
        watches.image_fit.send_data(inner)?;
        Ok(ImageFitStore::extract_from_store(&store_write)?.into())
    }
    pub async fn set_longstrip_image_width(&self, ctx: &Context<'_>, width: f64) -> Result<f64> {
        let store = get_store::<tauri::Wry>(ctx).await?;
        let mut store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = LongstripImageWidthStore::from(width);
        inner.insert_and_save(&mut store_write)?;
        watches.longstrip_image_width.send_data(inner)?;
        Ok(LongstripImageWidthStore::extract_from_store(&store_write)?.into())
    }
    pub async fn clear_cover_images_caches(&self) -> Result<bool> {
        CoverImageCache::clear_cover_temp_dir()?;
        Ok(true)
    }
    pub async fn clear_favicon_cache(&self, ctx: &Context<'_>) -> Result<bool> {
        let app = get_app_handle_from_async_graphql::<tauri::Wry>(ctx)?;
        clear_favicons_dir(app.config().as_ref())?;
        Ok(true)
    }
}
