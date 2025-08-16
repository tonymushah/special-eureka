use async_graphql::{Enum, SimpleObject};
use serde::{Deserialize, Serialize};
use tauri::Runtime;

use crate::store::{DefaulStore, StoreCrud, keys::CHAPTER_LAYOUT, types::ExtractFromStore};

#[derive(
    Debug,
    Default,
    serde_repr::Deserialize_repr,
    serde_repr::Serialize_repr,
    Enum,
    Clone,
    Copy,
    PartialEq,
    Eq,
    PartialOrd,
    Ord,
    Hash,
)]
#[repr(u8)]
pub enum SidebarMode {
    #[default]
    Default,
    Floating,
    Hidden,
}

#[derive(
    Debug,
    Default,
    serde_repr::Deserialize_repr,
    serde_repr::Serialize_repr,
    Enum,
    Clone,
    Copy,
    PartialEq,
    Eq,
    PartialOrd,
    Ord,
    Hash,
)]
#[repr(u8)]
pub enum DrawerMode {
    #[default]
    Unpinned,
    Pinned,
}

#[derive(
    Debug,
    Default,
    serde_repr::Deserialize_repr,
    serde_repr::Serialize_repr,
    Enum,
    Clone,
    Copy,
    PartialEq,
    Eq,
    PartialOrd,
    Ord,
    Hash,
)]
#[repr(u8)]
pub enum ProgressMode {
    #[default]
    Default,
    Floating,
    Hidden,
}

#[derive(Debug, Clone, Copy, Default, Deserialize, Serialize, SimpleObject)]
#[serde(default)]
pub struct ChapterLayoutStore {
    pub sidebar: SidebarMode,
    pub drawer: DrawerMode,
    pub progress: ProgressMode,
}

impl<R> ExtractFromStore<'_, R> for ChapterLayoutStore
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(CHAPTER_LAYOUT) {
            let store: ChapterLayoutStore = serde_json::from_value(info.clone())?;
            Ok(store)
        } else {
            Ok(Self::default())
        }
    }
}

impl<R> StoreCrud<R> for ChapterLayoutStore
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.set(CHAPTER_LAYOUT.to_string(), serde_json::to_value(*self)?);
        Ok(())
    }
    fn delete(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(CHAPTER_LAYOUT);
        Ok(())
    }
}

impl<R> DefaulStore<R> for ChapterLayoutStore
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            CHAPTER_LAYOUT.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}
