use crate::store::{
    keys::FORCE_443,
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};

use serde::{Deserialize, Serialize};
use std::ops::{Deref, DerefMut};
use tauri::Runtime;

#[derive(Debug, Clone, Copy, Default, Deserialize, Serialize)]
pub struct ForcePort443Store(bool);

impl Deref for ForcePort443Store {
    type Target = bool;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ForcePort443Store {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<bool> for ForcePort443Store {
    fn from(value: bool) -> Self {
        Self(value)
    }
}

impl From<ForcePort443Store> for bool {
    fn from(value: ForcePort443Store) -> Self {
        value.0
    }
}

impl<R> ExtractFromStore<'_, R> for ForcePort443Store
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(FORCE_443) {
            let val: bool = serde_json::from_value(info.clone())?;
            Ok(Self(val))
        } else {
            Ok(Self(false))
        }
    }
}

impl<R> StoreCrud<R> for ForcePort443Store
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.set(FORCE_443.to_string(), serde_json::to_value(*self)?);
        Ok(())
    }
    fn delete(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(FORCE_443);
        Ok(())
    }
}

impl<R> DefaulStore<R> for ForcePort443Store
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            FORCE_443.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}
