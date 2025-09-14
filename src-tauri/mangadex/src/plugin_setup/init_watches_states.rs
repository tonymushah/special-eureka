use tauri::{Manager, Runtime};
use tauri_plugin_store::Store;

use crate::{
    store::types::{
        ExtractFromStore,
        enums::{
            chapter_feed_style::ChapterFeedStyleStore,
            chapter_quality::ChapterQualityStore,
            content_profile_warning::ContentProfileWarningModeStore,
            direction::{reading::ReadingDirectionStore, sidebar::SidebarDirectionStore},
            image_fit::ImageFitStore,
            manga_list_style::MangaListStyleStore,
            pagination_style::PaginationStyleStore,
            reading_mode::ReadingModeStore,
        },
        structs::{
            chapter_language::ChapterLanguagesStore,
            chapter_layout::ChapterLayoutStore,
            client_info::ClientInfoStore,
            content::profiles::{ContentProfileDefaultKey, ContentProfiles},
            content_blur::ContentProfileBlurStore,
            force_443::ForcePort443Store,
            longstrip_image_width::LongstripImageWidthStore,
            page_limit::PageLimitStore,
            theme::profiles::{ThemeProfileDefaultKey, ThemeProfiles},
        },
    },
    utils::watch::{SendData, Watches},
};

macro_rules! setup_watch {
	($($watch:ident <= $store:ty$([$($how:ident,)*])?,)*) => {
		fn inner_init<R: Runtime>(store: &Store<R>) -> crate::PluginSetupResult<Watches> {
			let watches = Watches::default();
			$(
				let _ = watches.$watch.send_data(<$store>::extract_from_store(store)?$($(.$how())*)?);
			)*
			Ok(watches)
		}
	};
}

setup_watch! {
    reading_mode <= ReadingModeStore,
    chapter_languages <= ChapterLanguagesStore,
    page_direction <= ReadingDirectionStore,
    sidebar_direction <= SidebarDirectionStore,
    image_fit <= ImageFitStore,
    longstrip_image_width <= LongstripImageWidthStore,
    manga_list_style <= MangaListStyleStore,
    themes <= ThemeProfiles,
    theme_default_key <= ThemeProfileDefaultKey,
    client_info <= ClientInfoStore[inner,],
    chapter_feed_style <= ChapterFeedStyleStore,
    pagination_style <= PaginationStyleStore,
    content_profiles <= ContentProfiles,
    content_profiles_default_key <= ContentProfileDefaultKey,
    chapter_quality <= ChapterQualityStore,
    page_limit <= PageLimitStore,
    chapter_layout <= ChapterLayoutStore,
    force_port_443 <= ForcePort443Store,
    content_profile_blur <= ContentProfileBlurStore,
    content_profile_warning <= ContentProfileWarningModeStore,
}

pub fn init_watches_states<R: Runtime>(
    app: &tauri::AppHandle<R>,
    store: &Store<R>,
) -> crate::PluginSetupResult<()> {
    let watches = inner_init(store)?;
    /*
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
    let _ = watches
        .chapter_quality
        .send_data(ChapterQualityStore::extract_from_store(store)?);*/
    app.manage(watches);
    Ok(())
}
