use std::path::PathBuf;

use tauri::{AppHandle, Runtime /*Manager */};
use tauri_plugin_store::StoreBuilder;
use types::{
    enums::{
        chapter_feed_style::ChapterFeedStyleStore, image_fit::ImageFitStore,
        pagination_style::PaginationStyleStore,
    },
    structs::{
        content::profiles::{ContentProfileDefaultKey, ContentProfiles},
        longstrip_image_width::LongstripImageWidthStore,
        theme::profiles::{ThemeProfileDefaultKey, ThemeProfiles},
    },
    // ExtractFromStore, StoreCrud,
};

/// use crate::utils::watch::{SendData, Watches};
use self::{
    keys::PATH,
    types::{
        enums::{
            direction::{reading::ReadingDirectionStore, sidebar::SidebarDirectionStore},
            manga_list_style::MangaListStyleStore,
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

pub fn get_store_builder<R: Runtime>(
    app: AppHandle<R>,
) -> crate::PluginSetupResult<StoreBuilder<R>> {
    let builder = {
        let b = StoreBuilder::new(&app, PATH.parse::<PathBuf>()?);
        let b = ClientInfoStore::default_store(b)?;
        let b = RefreshTokenStore::default_store(b)?;
        let b = ReadingDirectionStore::default_store(b)?;
        let b = ReadingModeStore::default_store(b)?;
        let b = SidebarDirectionStore::default_store(b)?;
        let b = ChapterLanguagesStore::default_store(b)?;
        let b = ImageFitStore::default_store(b)?;
        let b = LongstripImageWidthStore::default_store(b)?;
        let b = MangaListStyleStore::default_store(b)?;
        let b = ThemeProfiles::default_store(b)?;
        let b = ThemeProfileDefaultKey::default_store(b)?;
        let b = ChapterFeedStyleStore::default_store(b)?;
        let b = PaginationStyleStore::default_store(b)?;
        let b = ContentProfiles::default_store(b)?;
        let b = ContentProfileDefaultKey::default_store(b)?;
        LongstripImageWidthStore::default_store(b)?
    };
    Ok(builder)
}

// TODO implement this for refactorization
/*
pub trait Storable<'de, R, T>: Sized
where
    R: Runtime,
    Watches: AsRef<Self::Watch>,
{
    type Store: ExtractFromStore<'de, R> + StoreCrud<R> + DefaulStore<R> + From<Self>;
    type Watch: SendData<T>;
    type ReceiverType;
    fn subscribe<M: Manager<R>>(app: M) -> crate::Result<Receiver<Self::ReceiverType>>;
}
*/
