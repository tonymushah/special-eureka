use std::ops::{Deref, DerefMut};

use async_graphql::Enum;
use serde::{Deserialize, Serialize};
use tauri::Runtime;

use crate::store::{
    keys::IMAGE_FIT,
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};

#[derive(
    Debug, Clone, Copy, Enum, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, Default,
)]
pub enum ImageFit {
    #[default]
    Default,
    Width,
    Heigth,
}

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct ImageFitStore(ImageFit);

impl Deref for ImageFitStore {
    type Target = ImageFit;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ImageFitStore {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<ImageFit> for ImageFitStore {
    fn from(value: ImageFit) -> Self {
        Self(value)
    }
}

impl From<ImageFitStore> for ImageFit {
    fn from(value: ImageFitStore) -> Self {
        value.0
    }
}

impl<R> ExtractFromStore<'_, R> for ImageFitStore
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(IMAGE_FIT) {
            let d: ImageFit = serde_json::from_value(info.clone())?;
            Ok(Self(d))
        } else {
            Ok(Self::default())
        }
    }
}

impl<R> StoreCrud<R> for ImageFitStore
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.set(IMAGE_FIT.to_string(), serde_json::to_value(self.clone())?);
        Ok(())
    }
    fn delete(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(IMAGE_FIT);
        Ok(())
    }
}

impl<R> DefaulStore<R> for ImageFitStore
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            IMAGE_FIT.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}
