use std::ops::{Deref, DerefMut};

use async_graphql::Enum;
use enum_repr::EnumRepr;
use serde::{Deserialize, Serialize};
use serde_repr::{Deserialize_repr, Serialize_repr};

use mangadex_api::utils::download::chapter::DownloadMode as MDDownloadMode;
use tauri::Runtime;

use crate::store::{
    keys::CHAPTERS_QUALITY as KEY,
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};

#[EnumRepr(type = "u8", implicit = true)]
#[derive(
    Debug,
    Clone,
    Copy,
    Default,
    PartialEq,
    Eq,
    PartialOrd,
    Ord,
    Enum,
    Serialize_repr,
    Deserialize_repr,
)]
pub enum DownloadMode {
    #[default]
    Normal,
    DataSaver,
}

impl From<MDDownloadMode> for DownloadMode {
    fn from(value: MDDownloadMode) -> Self {
        match value {
            MDDownloadMode::Normal => Self::Normal,
            MDDownloadMode::DataSaver => Self::DataSaver,
        }
    }
}

impl From<DownloadMode> for MDDownloadMode {
    fn from(value: DownloadMode) -> Self {
        match value {
            DownloadMode::Normal => Self::Normal,
            DownloadMode::DataSaver => Self::DataSaver,
        }
    }
}

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct ChapterQualityStore(DownloadMode);

impl Deref for ChapterQualityStore {
    type Target = DownloadMode;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ChapterQualityStore {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<DownloadMode> for ChapterQualityStore {
    fn from(value: DownloadMode) -> Self {
        Self(value)
    }
}

impl From<ChapterQualityStore> for DownloadMode {
    fn from(value: ChapterQualityStore) -> Self {
        value.0
    }
}

impl<R> ExtractFromStore<'_, R> for ChapterQualityStore
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(KEY) {
            let d: DownloadMode = serde_json::from_value(info.clone())?;
            Ok(Self(d))
        } else {
            Ok(Self::default())
        }
    }
}

impl<R> StoreCrud<R> for ChapterQualityStore
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.set(KEY.to_string(), serde_json::to_value(self.clone())?);
        Ok(())
    }
    fn delete(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(KEY);
        Ok(())
    }
}

impl<R> DefaulStore<R> for ChapterQualityStore
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(KEY.to_string(), serde_json::to_value(Self::default())?))
    }
}
