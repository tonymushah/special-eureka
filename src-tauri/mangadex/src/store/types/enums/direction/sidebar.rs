use crate::store::{
    keys::SIDEBAR_DIRECTION,
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};

use serde::{Deserialize, Serialize};
use std::ops::{Deref, DerefMut};
use tauri::Runtime;

use super::Direction;

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct SidebarDirectionStore(Direction);

impl Deref for SidebarDirectionStore {
    type Target = Direction;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for SidebarDirectionStore {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<Direction> for SidebarDirectionStore {
    fn from(value: Direction) -> Self {
        Self(value)
    }
}

impl<'de, R> ExtractFromStore<'de, R> for SidebarDirectionStore
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(SIDEBAR_DIRECTION) {
            let d: Direction = serde_json::from_value(info.clone())?;
            Ok(Self(d))
        } else {
            Ok(Self::default())
        }
    }
}

impl<R> StoreCrud<R> for SidebarDirectionStore
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &mut tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.insert(
            SIDEBAR_DIRECTION.to_string(),
            serde_json::to_value(self.clone())?,
        )?;
        Ok(())
    }
    fn delete(
        &self,
        store: &mut tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(SIDEBAR_DIRECTION)?;
        Ok(())
    }
}

impl<R> DefaulStore<R> for SidebarDirectionStore
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            SIDEBAR_DIRECTION.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}
