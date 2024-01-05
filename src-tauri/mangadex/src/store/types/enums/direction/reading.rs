use crate::store::{
    keys::PAGE_DIRECTION as READING_MODE,
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};

use serde::{Deserialize, Serialize};
use std::ops::{Deref, DerefMut};
use tauri::Runtime;

use super::Direction;

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct ReadingDirectionStore(Direction);

impl Deref for ReadingDirectionStore {
    type Target = Direction;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ReadingDirectionStore {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<Direction> for ReadingDirectionStore {
    fn from(value: Direction) -> Self {
        Self(value)
    }
}

impl<'de, R> ExtractFromStore<'de, R> for ReadingDirectionStore
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(READING_MODE) {
            let d: Direction = serde_json::from_value(info.clone())?;
            Ok(Self(d))
        } else {
            Ok(Self::default())
        }
    }
}

impl<R> StoreCrud<R> for ReadingDirectionStore
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &mut tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.insert(
            READING_MODE.to_string(),
            serde_json::to_value(self.clone())?,
        )?;
        Ok(())
    }
    fn delete(
        &self,
        store: &mut tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(READING_MODE)?;
        Ok(())
    }
}

impl<R> DefaulStore<R> for ReadingDirectionStore
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            READING_MODE.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}
