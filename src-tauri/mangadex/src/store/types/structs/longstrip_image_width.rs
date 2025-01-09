use crate::store::{
    keys::LONGSTRIP_IMAGE_WIDTH,
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};

use serde::{Deserialize, Serialize};
use std::ops::{Deref, DerefMut};
use tauri::Runtime;

#[derive(Debug, Clone, Copy, Default, Deserialize, Serialize)]
pub struct LongstripImageWidthStore(f64);

impl Deref for LongstripImageWidthStore {
    type Target = f64;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for LongstripImageWidthStore {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<f64> for LongstripImageWidthStore {
    fn from(value: f64) -> Self {
        Self(value)
    }
}

impl From<LongstripImageWidthStore> for f64 {
    fn from(value: LongstripImageWidthStore) -> Self {
        value.0
    }
}

impl<'de, R> ExtractFromStore<'de, R> for LongstripImageWidthStore
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(LONGSTRIP_IMAGE_WIDTH) {
            let client: f64 = serde_json::from_value(info.clone())?;
            Ok(Self(client))
        } else {
            Ok(Self(0f64))
        }
    }
}

impl<R> StoreCrud<R> for LongstripImageWidthStore
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.set(
            LONGSTRIP_IMAGE_WIDTH.to_string(),
            serde_json::to_value(*self)?,
        );
        Ok(())
    }
    fn delete(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(LONGSTRIP_IMAGE_WIDTH);
        Ok(())
    }
}

impl<R> DefaulStore<R> for LongstripImageWidthStore
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            LONGSTRIP_IMAGE_WIDTH.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}
