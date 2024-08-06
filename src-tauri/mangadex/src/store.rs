use tauri::{AppHandle, Runtime};
use tauri_plugin_store::StoreBuilder;
use types::{
    enums::image_fit::ImageFitStore, structs::longstrip_image_width::LongstripImageWidthStore,
};

use self::{
    keys::PATH,
    types::{
        enums::{
            direction::{reading::ReadingDirectionStore, sidebar::SidebarDirectionStore},
            reading_mode::ReadingModeStore,
        },
        structs::{
            chapter_language::ChapterLanguagesStore, client_info::ClientInfoStore,
            refresh_token::RefreshTokenStore,
        },
        DefaulStore,
    },
};

pub mod keys;
pub mod types;

pub fn get_store_builder<R: Runtime>(app: AppHandle<R>) -> tauri::plugin::Result<StoreBuilder<R>> {
    let builder = {
        let b = StoreBuilder::new(app, PATH.parse()?);
        let b = ClientInfoStore::default_store(b)?;
        let b = RefreshTokenStore::default_store(b)?;
        let b = ReadingDirectionStore::default_store(b)?;
        let b = ReadingModeStore::default_store(b)?;
        let b = SidebarDirectionStore::default_store(b)?;
        let b = ChapterLanguagesStore::default_store(b)?;
        let b = ImageFitStore::default_store(b)?;
        LongstripImageWidthStore::default_store(b)?
    };
    Ok(builder)
}
