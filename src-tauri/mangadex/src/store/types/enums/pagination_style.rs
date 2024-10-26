use std::ops::{Deref, DerefMut};

use async_graphql::Enum;
use serde::{Deserialize, Serialize};
use tauri::Runtime;

use crate::store::{
    keys::PAGINATION_STYLE,
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};

#[derive(
    Debug, Clone, Copy, Enum, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, Default,
)]
pub enum PaginationStyle {
    #[default]
    InfiniteScroll,
    Paged,
}

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct PaginationStyleStore(PaginationStyle);

impl Deref for PaginationStyleStore {
    type Target = PaginationStyle;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for PaginationStyleStore {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<PaginationStyle> for PaginationStyleStore {
    fn from(value: PaginationStyle) -> Self {
        Self(value)
    }
}

impl From<PaginationStyleStore> for PaginationStyle {
    fn from(value: PaginationStyleStore) -> Self {
        value.0
    }
}

impl<'de, R> ExtractFromStore<'de, R> for PaginationStyleStore
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(PAGINATION_STYLE) {
            let d: PaginationStyle = serde_json::from_value(info.clone())?;
            Ok(Self(d))
        } else {
            Ok(Self::default())
        }
    }
}

impl<R> StoreCrud<R> for PaginationStyleStore
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &mut tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.insert(
            PAGINATION_STYLE.to_string(),
            serde_json::to_value(self.clone())?,
        )?;
        Ok(())
    }
    fn delete(
        &self,
        store: &mut tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(PAGINATION_STYLE)?;
        Ok(())
    }
}

impl<R> DefaulStore<R> for PaginationStyleStore
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            PAGINATION_STYLE.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}
