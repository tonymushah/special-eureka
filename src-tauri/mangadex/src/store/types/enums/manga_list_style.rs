use std::ops::{Deref, DerefMut};

use async_graphql::Enum;
use serde::{Deserialize, Serialize};
use tauri::Runtime;

use crate::store::{
    keys::MANGA_LIST_STYLE,
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};

#[derive(
    Debug, Clone, Copy, Enum, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, Default,
)]
pub enum MangaListStyle {
    #[default]
    Grid,
    Rows,
    Cover,
}

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct MangaListStyleStore(MangaListStyle);

impl Deref for MangaListStyleStore {
    type Target = MangaListStyle;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for MangaListStyleStore {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<MangaListStyle> for MangaListStyleStore {
    fn from(value: MangaListStyle) -> Self {
        Self(value)
    }
}

impl From<MangaListStyleStore> for MangaListStyle {
    fn from(value: MangaListStyleStore) -> Self {
        value.0
    }
}

impl<R> ExtractFromStore<'_, R> for MangaListStyleStore
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(MANGA_LIST_STYLE) {
            let d: MangaListStyle = serde_json::from_value(info.clone())?;
            Ok(Self(d))
        } else {
            Ok(Self::default())
        }
    }
}

impl<R> StoreCrud<R> for MangaListStyleStore
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.set(
            MANGA_LIST_STYLE.to_string(),
            serde_json::to_value(self.clone())?,
        );
        Ok(())
    }
    fn delete(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(MANGA_LIST_STYLE);
        Ok(())
    }
}

impl<R> DefaulStore<R> for MangaListStyleStore
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            MANGA_LIST_STYLE.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}
