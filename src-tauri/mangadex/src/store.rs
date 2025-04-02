use std::{future::Future, path::PathBuf};

use tauri::{AppHandle, Manager, Runtime /*Manager */};
use tauri_plugin_store::StoreBuilder;
use types::{
    enums::{
        chapter_feed_style::ChapterFeedStyleStore, image_fit::ImageFitStore,
        pagination_style::PaginationStyleStore,
    },
    structs::{
        content::profiles::{ContentProfileDefaultKey, ContentProfiles},
        longstrip_image_width::LongstripImageWidthStore,
        offline_config::OfflineConfigStore,
        theme::profiles::{ThemeProfileDefaultKey, ThemeProfiles},
    },
    ExtractFromStore,
    StoreCrud,
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
        let b = OfflineConfigStore::default_store(b)?;
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

pub trait TauriManagerMangadexStoreExtractor<R>:
    Manager<R> + crate::utils::traits_utils::MangadexTauriManagerExt<R> + Sync
where
    R: Runtime,
{
    fn extract<SD>(&self) -> impl Future<Output = crate::Result<SD>> + Send
    where
        SD: for<'de> ExtractFromStore<'de, R>,
    {
        async {
            let store = self.get_mangadex_store()?;
            let store_read = store.read().await;
            Ok(SD::extract_from_store(&*store_read)?)
        }
    }
}

impl<R, M> TauriManagerMangadexStoreExtractor<R> for M
where
    R: Runtime,
    M: Manager<R> + Sync,
{
}

pub trait TauriManagerMangadexStoreCrud<R>:
    Manager<R> + crate::utils::traits_utils::MangadexTauriManagerExt<R> + Sync
where
    R: Runtime,
{
    fn insert<SD>(&self, store_data: &SD) -> impl Future<Output = crate::Result<()>>
    where
        SD: StoreCrud<R> + Sync + Send,
    {
        async {
            let store = self.get_mangadex_store()?;
            let store_read = store.read().await;
            store_data.insert(&*store_read)?;
            Ok(())
        }
    }
    fn insert_and_save<SD>(&self, store_data: &SD) -> impl Future<Output = crate::Result<()>>
    where
        SD: StoreCrud<R> + Sync + Send,
    {
        async {
            let store = self.get_mangadex_store()?;
            let store_read = store.read().await;
            store_data.insert_and_save(&*store_read)?;
            Ok(())
        }
    }
    fn delete<SD>(&self, store_data: &SD) -> impl Future<Output = crate::Result<()>>
    where
        SD: StoreCrud<R> + Sync + Send,
    {
        async {
            let store = self.get_mangadex_store()?;
            let store_read = store.read().await;
            store_data.delete(&*store_read)?;
            Ok(())
        }
    }
    fn delete_and_save<SD>(&self, store_data: &SD) -> impl Future<Output = crate::Result<()>>
    where
        SD: StoreCrud<R> + Sync + Send,
    {
        async {
            let store = self.get_mangadex_store()?;
            let store_read = store.read().await;
            store_data.delete_and_save(&*store_read)?;
            Ok(())
        }
    }
}

impl<R, M> TauriManagerMangadexStoreCrud<R> for M
where
    R: Runtime,
    M: Manager<R> + Sync,
{
}
