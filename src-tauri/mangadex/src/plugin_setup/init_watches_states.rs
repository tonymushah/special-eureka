use tauri::{Manager, Runtime};
use tauri_plugin_store::Store;

use crate::{
    store::types::{
        enums::{
            direction::{reading::ReadingDirectionStore, sidebar::SidebarDirectionStore},
            image_fit::ImageFitStore,
            manga_list_style::MangaListStyleStore,
            reading_mode::ReadingModeStore,
        },
        structs::{
            chapter_language::ChapterLanguagesStore,
            longstrip_image_width::LongstripImageWidthStore,
        },
        ExtractFromStore,
    },
    utils::watch::{SendData, Watches},
};

pub fn init_watches_states<R: Runtime>(
    app: &tauri::AppHandle<R>,
    store: &Store<R>,
) -> tauri::plugin::Result<()> {
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
    app.manage(watches);
    Ok(())
}
