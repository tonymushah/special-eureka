use tauri::{Manager, Runtime};
use tauri_plugin_store::Store;

use crate::{
    store::types::{
        enums::{
            chapter_feed_style::ChapterFeedStyleStore,
            direction::{reading::ReadingDirectionStore, sidebar::SidebarDirectionStore},
            image_fit::ImageFitStore,
            manga_list_style::MangaListStyleStore,
            pagination_style::PaginationStyleStore,
            reading_mode::ReadingModeStore,
        },
        structs::{
            chapter_language::ChapterLanguagesStore,
            client_info::ClientInfoStore,
            content::profiles::{ContentProfileDefaultKey, ContentProfiles},
            longstrip_image_width::LongstripImageWidthStore,
            theme::profiles::{ThemeProfileDefaultKey, ThemeProfiles},
        },
        ExtractFromStore,
    },
    utils::watch::{SendData, Watches},
};

pub fn init_watches_states<R: Runtime>(
    app: &tauri::AppHandle<R>,
    store: &Store<R>,
) -> crate::PluginSetupResult<()> {
    let watches = Watches::default();
    let _ = watches
        .reading_mode
        .send_data(ReadingModeStore::extract_from_store(store)?);
    let _ = watches
        .chapter_languages
        .send_data(ChapterLanguagesStore::extract_from_store(store)?);
    let _ = watches
        .page_direction
        .send_data(ReadingDirectionStore::extract_from_store(store)?);
    let _ = watches
        .sidebar_direction
        .send_data(SidebarDirectionStore::extract_from_store(store)?);
    let _ = watches
        .image_fit
        .send_data(ImageFitStore::extract_from_store(store)?);
    let _ = watches
        .longstrip_image_width
        .send_data(LongstripImageWidthStore::extract_from_store(store)?);
    let _ = watches
        .manga_list_style
        .send_data(MangaListStyleStore::extract_from_store(store)?);
    let _ = watches
        .themes
        .send_data(ThemeProfiles::extract_from_store(store)?);
    let _ = watches
        .theme_default_key
        .send_data(ThemeProfileDefaultKey::extract_from_store(store)?);
    let _ = watches
        .client_info
        .send_data(ClientInfoStore::extract_from_store(store)?.inner());
    let _ = watches
        .chapter_feed_style
        .send_data(ChapterFeedStyleStore::extract_from_store(store)?);
    let _ = watches
        .pagination_style
        .send_data(PaginationStyleStore::extract_from_store(store)?);
    let _ = watches
        .content_profiles
        .send_data(ContentProfiles::extract_from_store(store)?);
    let _ = watches
        .content_profiles_default_key
        .send_data(ContentProfileDefaultKey::extract_from_store(store)?);
    app.manage(watches);
    Ok(())
}
