use crate::store::{
    keys::MANGA_INFOS_POSITIONS,
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};
use async_graphql::Enum;
use serde::{Deserialize, Serialize};
use std::ops::{Deref, DerefMut};
use tauri::Runtime;

#[derive(
    Debug, Clone, Copy, Enum, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, Default,
)]
pub enum MangaInfosPositions {
    #[default]
    Left,
    Right,
    BeneathDescription,
}

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct MangaInfosPositionsStore(MangaInfosPositions);

impl Deref for MangaInfosPositionsStore {
    type Target = MangaInfosPositions;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for MangaInfosPositionsStore {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<MangaInfosPositions> for MangaInfosPositionsStore {
    fn from(value: MangaInfosPositions) -> Self {
        Self(value)
    }
}

impl From<MangaInfosPositionsStore> for MangaInfosPositions {
    fn from(value: MangaInfosPositionsStore) -> Self {
        value.0
    }
}

impl<R> ExtractFromStore<'_, R> for MangaInfosPositionsStore
where
    R: Runtime,
{
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(MANGA_INFOS_POSITIONS) {
            let d: MangaInfosPositions = serde_json::from_value(info.clone())?;
            Ok(Self(d))
        } else {
            Ok(Self::default())
        }
    }
}

impl<R> StoreCrud<R> for MangaInfosPositionsStore
where
    R: Runtime,
{
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn insert(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.set(
            MANGA_INFOS_POSITIONS.to_string(),
            serde_json::to_value(self.clone())?,
        );
        Ok(())
    }
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn delete(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(MANGA_INFOS_POSITIONS);
        Ok(())
    }
}

impl<R> DefaulStore<R> for MangaInfosPositionsStore
where
    R: Runtime,
{
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            MANGA_INFOS_POSITIONS.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}
