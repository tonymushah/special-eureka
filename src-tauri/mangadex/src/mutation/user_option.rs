use crate::{
    cache::{cover::CoverImageCache, favicon::clear_favicons_dir},
    objects::offline_config::{OfflineConfigInput, OfflineConfigObject},
    store::{
        types::{
            enums::{
                chapter_feed_style::{ChapterFeedStyle, ChapterFeedStyleStore},
                chapter_quality::{ChapterQualityStore, DownloadMode},
                image_fit::{ImageFit, ImageFitStore},
                pagination_style::{PaginationStyle, PaginationStyleStore},
            },
            structs::{
                content::{
                    profiles::{ContentProfileDefaultKey, ContentProfileEntry, ContentProfiles},
                    ContentProfile,
                },
                longstrip_image_width::LongstripImageWidthStore,
                offline_config::OfflineConfigStore,
                theme::{
                    profiles::{ThemeProfileDefaultKey, ThemeProfileEntry, ThemeProfiles},
                    MangaDexTheme,
                },
            },
        },
        TauriManagerMangadexStoreCrud, TauriManagerMangadexStoreExtractor,
    },
    utils::{get_app_handle_from_async_graphql, traits_utils::MangadexAsyncGraphQLContextExt},
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
            manga_list_style::{MangaListStyle, MangaListStyleStore},
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
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = ReadingModeStore::from(mode);
        inner.insert_and_save(&store_write)?;
        watches.reading_mode.send_data(inner)?;
        Ok(ReadingModeStore::extract_from_store(&store_write)?.into())
    }
    pub async fn set_page_direction(
        &self,
        ctx: &Context<'_>,
        direction: Direction,
    ) -> Result<Direction> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = ReadingDirectionStore::from(direction);
        inner.insert_and_save(&store_write)?;
        watches.page_direction.send_data(inner)?;
        Ok(ReadingDirectionStore::extract_from_store(&store_write)?.into())
    }
    pub async fn set_sidebar_direction(
        &self,
        ctx: &Context<'_>,
        direction: Direction,
    ) -> Result<Direction> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = SidebarDirectionStore::from(direction);
        inner.insert_and_save(&store_write)?;
        watches.sidebar_direction.send_data(inner)?;
        Ok(SidebarDirectionStore::extract_from_store(&store_write)?.into())
    }
    pub async fn set_chapter_languages(
        &self,
        ctx: &Context<'_>,
        languages: Vec<Language>,
    ) -> Result<Vec<Language>> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = ChapterLanguagesStore::from(languages);
        inner.insert_and_save(&store_write)?;
        watches.chapter_languages.send_data(inner)?;
        Ok(ChapterLanguagesStore::extract_from_store(&store_write)?.into())
    }
    pub async fn set_image_fit(&self, ctx: &Context<'_>, image_fit: ImageFit) -> Result<ImageFit> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = ImageFitStore::from(image_fit);
        inner.insert_and_save(&store_write)?;
        watches.image_fit.send_data(inner)?;
        Ok(ImageFitStore::extract_from_store(&store_write)?.into())
    }
    pub async fn set_longstrip_image_width(&self, ctx: &Context<'_>, width: f64) -> Result<f64> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = LongstripImageWidthStore::from(width);
        inner.insert_and_save(&store_write)?;
        watches.longstrip_image_width.send_data(inner)?;
        Ok(LongstripImageWidthStore::extract_from_store(&store_write)?.into())
    }
    pub async fn clear_cover_images_caches(&self) -> Result<bool> {
        CoverImageCache::clear_cover_temp_dir()?;
        Ok(true)
    }
    pub async fn clear_favicon_cache(&self, ctx: &Context<'_>) -> Result<bool> {
        let app = get_app_handle_from_async_graphql::<tauri::Wry>(ctx)?;
        clear_favicons_dir(app)?;
        Ok(true)
    }
    pub async fn set_manga_list_style(
        &self,
        ctx: &Context<'_>,
        manga_list_style: MangaListStyle,
    ) -> Result<MangaListStyle> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = MangaListStyleStore::from(manga_list_style);
        inner.insert_and_save(&store_write)?;
        watches.manga_list_style.send_data(inner)?;
        Ok(MangaListStyleStore::extract_from_store(&store_write)?.into())
    }
    pub async fn update_default_theme(
        &self,
        ctx: &Context<'_>,
        theme: Option<MangaDexTheme>,
    ) -> Result<MangaDexTheme> {
        let theme = theme.unwrap_or_default();
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let name = (*ThemeProfileDefaultKey::extract_from_store(&store_write)?)
            .clone()
            .ok_or(crate::Error::NoDefaultThemeSelected)?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut inner = ThemeProfiles::extract_from_store(&store_write)?;
        (*inner).insert(name, theme.clone());
        inner.insert_and_save(&store_write)?;
        watches.themes.send_data(inner)?;
        Ok(theme)
    }
    pub async fn set_default_theme_profile(
        &self,
        ctx: &Context<'_>,
        name: Option<String>,
    ) -> Result<Option<String>> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = ThemeProfileDefaultKey::from(name);
        inner.insert_and_save(&store_write)?;
        watches.theme_default_key.send_data(inner)?;
        Ok(ThemeProfileDefaultKey::extract_from_store(&store_write)?.into_inner())
    }
    pub async fn set_theme_profile(
        &self,
        ctx: &Context<'_>,
        name: String,
        theme: Option<MangaDexTheme>,
    ) -> Result<MangaDexTheme> {
        let theme = theme.unwrap_or_default();
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut inner = ThemeProfiles::extract_from_store(&store_write)?;
        (*inner).insert(name, theme.clone());
        inner.insert_and_save(&store_write)?;
        watches.themes.send_data(inner)?;
        Ok(theme)
    }
    pub async fn delete_theme_profile(
        &self,
        ctx: &Context<'_>,
        name: String,
    ) -> Result<Option<MangaDexTheme>> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut inner = ThemeProfiles::extract_from_store(&store_write)?;
        let theme = (*inner).remove(&name);
        inner.insert_and_save(&store_write)?;
        watches.themes.send_data(inner)?;
        Ok(theme)
    }
    pub async fn clear_themes_profiles(&self, ctx: &Context<'_>) -> Result<bool> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut inner = ThemeProfiles::extract_from_store(&store_write)?;
        (*inner).clear();
        inner.insert_and_save(&store_write)?;
        watches.themes.send_data(inner)?;
        Ok(true)
    }
    pub async fn set_theme_profiles(
        &self,
        ctx: &Context<'_>,
        entries: Vec<ThemeProfileEntry>,
    ) -> Result<usize> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = ThemeProfiles::from(entries);
        inner.insert_and_save(&store_write)?;
        let len = inner.len();
        watches.themes.send_data(inner)?;
        Ok(len)
    }
    pub async fn set_chapter_feed_style(
        &self,
        ctx: &Context<'_>,
        style: ChapterFeedStyle,
    ) -> Result<ChapterFeedStyle> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = ChapterFeedStyleStore::from(style);
        inner.insert_and_save(&store_write)?;
        watches.chapter_feed_style.send_data(inner)?;
        Ok(ChapterFeedStyleStore::extract_from_store(&store_write)?.into())
    }
    pub async fn set_pagination_style(
        &self,
        ctx: &Context<'_>,
        style: PaginationStyle,
    ) -> Result<PaginationStyle> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = PaginationStyleStore::from(style);
        inner.insert_and_save(&store_write)?;
        watches.pagination_style.send_data(inner)?;
        Ok(PaginationStyleStore::extract_from_store(&store_write)?.into())
    }
    pub async fn update_default_content_profile(
        &self,
        ctx: &Context<'_>,
        profile: Option<ContentProfile>,
    ) -> Result<ContentProfile> {
        let profile = profile.unwrap_or_default();
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let name = (*ContentProfileDefaultKey::extract_from_store(&store_write)?)
            .clone()
            .ok_or(crate::Error::NoDefaultContentProfileSelected)?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut inner = ContentProfiles::extract_from_store(&store_write)?;
        (*inner).insert(name, profile.clone());
        inner.insert_and_save(&store_write)?;
        watches.content_profiles.send_data(inner)?;
        Ok(profile)
    }
    pub async fn set_default_content_profile_key(
        &self,
        ctx: &Context<'_>,
        name: Option<String>,
    ) -> Result<Option<String>> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = ContentProfileDefaultKey::from(name);
        inner.insert_and_save(&store_write)?;
        watches.content_profiles_default_key.send_data(inner)?;
        Ok(ContentProfileDefaultKey::extract_from_store(&store_write)?.into_inner())
    }
    pub async fn set_content_profile(
        &self,
        ctx: &Context<'_>,
        name: String,
        profile: Option<ContentProfile>,
    ) -> Result<ContentProfile> {
        let profile = profile.unwrap_or_default();
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut inner = ContentProfiles::extract_from_store(&store_write)?;
        (*inner).insert(name, profile.clone());
        inner.insert_and_save(&store_write)?;
        watches.content_profiles.send_data(inner)?;
        Ok(profile)
    }
    pub async fn delete_content_profile(
        &self,
        ctx: &Context<'_>,
        name: String,
    ) -> Result<Option<ContentProfile>> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut inner = ContentProfiles::extract_from_store(&store_write)?;
        let content = (*inner).remove(&name);
        inner.insert_and_save(&store_write)?;
        watches.content_profiles.send_data(inner)?;
        Ok(content)
    }
    pub async fn clear_content_profiles(&self, ctx: &Context<'_>) -> Result<bool> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut inner = ContentProfiles::extract_from_store(&store_write)?;
        (*inner).clear();
        inner.insert_and_save(&store_write)?;
        watches.content_profiles.send_data(inner)?;
        Ok(true)
    }
    pub async fn set_content_profiles(
        &self,
        ctx: &Context<'_>,
        entries: Vec<ContentProfileEntry>,
    ) -> Result<usize> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = ContentProfiles::from(entries);
        inner.insert_and_save(&store_write)?;
        let len = inner.len();
        watches.content_profiles.send_data(inner)?;
        Ok(len)
    }
    pub async fn set_offline_config(
        &self,
        ctx: &Context<'_>,
        cfg: OfflineConfigInput,
    ) -> Result<OfflineConfigObject> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let mut store = app.extract::<OfflineConfigStore>().await?;
        store.replace((&cfg).into());
        app.insert_and_save(&store).await?;
        Ok(OfflineConfigObject)
    }
    pub async fn set_chapter_quality(
        &self,
        ctx: &Context<'_>,
        quality: Option<DownloadMode>,
    ) -> Result<OfflineConfigObject> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut store = app.extract::<ChapterQualityStore>().await?;
        *store = quality.unwrap_or_default();
        app.insert_and_save(&store).await?;
        watches.chapter_quality.send_data(store)?;
        Ok(OfflineConfigObject)
    }
}
