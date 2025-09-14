use crate::store::{
    keys::CONTENT_PROFILE_BLUR,
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};

use serde::{Deserialize, Serialize};
use std::ops::{Deref, DerefMut};
use tauri::Runtime;

#[derive(Debug, Clone, Copy, Default, Deserialize, Serialize)]
pub struct ContentProfileBlurStore(bool);

impl Deref for ContentProfileBlurStore {
    type Target = bool;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ContentProfileBlurStore {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<bool> for ContentProfileBlurStore {
    fn from(value: bool) -> Self {
        Self(value)
    }
}

impl From<ContentProfileBlurStore> for bool {
    fn from(value: ContentProfileBlurStore) -> Self {
        value.0
    }
}

impl<R> ExtractFromStore<'_, R> for ContentProfileBlurStore
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(CONTENT_PROFILE_BLUR) {
            let val: bool = serde_json::from_value(info.clone())?;
            Ok(Self(val))
        } else {
            Ok(Self(false))
        }
    }
}

impl<R> StoreCrud<R> for ContentProfileBlurStore
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.set(
            CONTENT_PROFILE_BLUR.to_string(),
            serde_json::to_value(*self)?,
        );
        Ok(())
    }
    fn delete(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(CONTENT_PROFILE_BLUR);
        Ok(())
    }
}

impl<R> DefaulStore<R> for ContentProfileBlurStore
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            CONTENT_PROFILE_BLUR.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}
