use crate::store::{
    keys::READING_MODE,
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};
use async_graphql::Enum;
use serde::{Deserialize, Serialize};
use std::ops::{Deref, DerefMut};
use tauri::Runtime;

#[derive(
    Debug, Clone, Copy, Enum, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, Default,
)]
pub enum ReadingMode {
    LongStrip,
    WideStrip,
    SinglePage,
    #[default]
    DoublePage,
}

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct ReadingModeStore(ReadingMode);

impl Deref for ReadingModeStore {
    type Target = ReadingMode;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ReadingModeStore {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<ReadingMode> for ReadingModeStore {
    fn from(value: ReadingMode) -> Self {
        Self(value)
    }
}

impl From<ReadingModeStore> for ReadingMode {
    fn from(value: ReadingModeStore) -> Self {
        value.0
    }
}

impl<R> ExtractFromStore<'_, R> for ReadingModeStore
where
    R: Runtime,
{
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(READING_MODE) {
            let d: ReadingMode = serde_json::from_value(info.clone())?;
            Ok(Self(d))
        } else {
            Ok(Self::default())
        }
    }
}

impl<R> StoreCrud<R> for ReadingModeStore
where
    R: Runtime,
{
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn insert(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.set(
            READING_MODE.to_string(),
            serde_json::to_value(self.clone())?,
        );
        Ok(())
    }
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn delete(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(READING_MODE);
        Ok(())
    }
}

impl<R> DefaulStore<R> for ReadingModeStore
where
    R: Runtime,
{
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            READING_MODE.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}
