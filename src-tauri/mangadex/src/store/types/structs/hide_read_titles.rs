use crate::store::{
    keys::HIDE_READ_TITLES,
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};

use serde::{Deserialize, Serialize};
use std::ops::{Deref, DerefMut};
use tauri::Runtime;

#[derive(Debug, Clone, Copy, Default, Deserialize, Serialize)]
pub struct HideReadTitlesStore(bool);

impl Deref for HideReadTitlesStore {
    type Target = bool;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for HideReadTitlesStore {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<bool> for HideReadTitlesStore {
    fn from(value: bool) -> Self {
        Self(value)
    }
}

impl From<HideReadTitlesStore> for bool {
    fn from(value: HideReadTitlesStore) -> Self {
        value.0
    }
}

impl<R> ExtractFromStore<'_, R> for HideReadTitlesStore
where
    R: Runtime,
{
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(HIDE_READ_TITLES) {
            let val: bool = serde_json::from_value(info.clone())?;
            Ok(Self(val))
        } else {
            Ok(Self(false))
        }
    }
}

impl<R> StoreCrud<R> for HideReadTitlesStore
where
    R: Runtime,
{
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn insert(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.set(HIDE_READ_TITLES.to_string(), serde_json::to_value(*self)?);
        Ok(())
    }
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn delete(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(HIDE_READ_TITLES);
        Ok(())
    }
}

impl<R> DefaulStore<R> for HideReadTitlesStore
where
    R: Runtime,
{
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            HIDE_READ_TITLES.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}
