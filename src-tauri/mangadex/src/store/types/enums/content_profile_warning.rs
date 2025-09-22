use std::ops::{Deref, DerefMut};

use async_graphql::Enum;
use serde::{Deserialize, Serialize};
use tauri::Runtime;

use crate::store::{
    keys::CONTENT_PROFILE_WARNING_MODE,
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};

#[derive(
    Debug, Clone, Copy, Enum, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, Default,
)]
pub enum ContentProfileWarningMode {
    #[default]
    Always,
    Never,
    /// Always unless the title is in the library
    Autl,
    /// Always unless the title is in the library and not dropped
    AutlNd,
}

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct ContentProfileWarningModeStore(ContentProfileWarningMode);

impl Deref for ContentProfileWarningModeStore {
    type Target = ContentProfileWarningMode;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ContentProfileWarningModeStore {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<ContentProfileWarningMode> for ContentProfileWarningModeStore {
    fn from(value: ContentProfileWarningMode) -> Self {
        Self(value)
    }
}

impl From<ContentProfileWarningModeStore> for ContentProfileWarningMode {
    fn from(value: ContentProfileWarningModeStore) -> Self {
        value.0
    }
}

impl<R> ExtractFromStore<'_, R> for ContentProfileWarningModeStore
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(CONTENT_PROFILE_WARNING_MODE) {
            let d: ContentProfileWarningMode = serde_json::from_value(info.clone())?;
            Ok(Self(d))
        } else {
            Ok(Self::default())
        }
    }
}

impl<R> StoreCrud<R> for ContentProfileWarningModeStore
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.set(
            CONTENT_PROFILE_WARNING_MODE.to_string(),
            serde_json::to_value(self.clone())?,
        );
        Ok(())
    }
    fn delete(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(CONTENT_PROFILE_WARNING_MODE);
        Ok(())
    }
}

impl<R> DefaulStore<R> for ContentProfileWarningModeStore
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            CONTENT_PROFILE_WARNING_MODE.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}
