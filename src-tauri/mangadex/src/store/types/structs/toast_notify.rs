use crate::store::{
    keys::TOAST_NOTIFY,
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};

use serde::{Deserialize, Serialize};
use std::ops::{Deref, DerefMut};
use tauri::Runtime;

#[derive(Debug, Clone, Copy, Default, Deserialize, Serialize)]
pub struct ToastNotifyStore(bool);

impl Deref for ToastNotifyStore {
    type Target = bool;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ToastNotifyStore {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<bool> for ToastNotifyStore {
    fn from(value: bool) -> Self {
        Self(value)
    }
}

impl From<ToastNotifyStore> for bool {
    fn from(value: ToastNotifyStore) -> Self {
        value.0
    }
}

impl<R> ExtractFromStore<'_, R> for ToastNotifyStore
where
    R: Runtime,
{
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(TOAST_NOTIFY) {
            let val: bool = serde_json::from_value(info.clone())?;
            Ok(Self(val))
        } else {
            Ok(Self(false))
        }
    }
}

impl<R> StoreCrud<R> for ToastNotifyStore
where
    R: Runtime,
{
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn insert(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.set(TOAST_NOTIFY.to_string(), serde_json::to_value(*self)?);
        Ok(())
    }
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn delete(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(TOAST_NOTIFY);
        Ok(())
    }
}

impl<R> DefaulStore<R> for ToastNotifyStore
where
    R: Runtime,
{
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            TOAST_NOTIFY.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}
