use crate::store::{
    keys::PAGE_LIMIT,
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};
use serde::{Deserialize, Serialize};
use std::{
    num::NonZero,
    ops::{Deref, DerefMut},
};
use tauri::Runtime;

pub const PAGE_LIMIT_DEFAULT: u64 = 10;

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct PageLimitStore(Option<NonZero<u64>>);

impl Deref for PageLimitStore {
    type Target = Option<NonZero<u64>>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl PageLimitStore {
    pub fn value(&self) -> u64 {
        self.0.map_or_else(|| PAGE_LIMIT_DEFAULT, |d| d.get())
    }
}

impl DerefMut for PageLimitStore {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<Option<NonZero<u64>>> for PageLimitStore {
    fn from(value: Option<NonZero<u64>>) -> Self {
        Self(value)
    }
}

impl From<PageLimitStore> for Option<NonZero<u64>> {
    fn from(value: PageLimitStore) -> Self {
        value.0
    }
}

impl<R> ExtractFromStore<'_, R> for PageLimitStore
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(PAGE_LIMIT) {
            let limit: Option<NonZero<u64>> = serde_json::from_value(info.clone())?;
            Ok(Self(limit))
        } else {
            Ok(Self(NonZero::new(PAGE_LIMIT_DEFAULT)))
        }
    }
}

impl<R> StoreCrud<R> for PageLimitStore
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.set(PAGE_LIMIT.to_string(), serde_json::to_value(self.clone())?);
        Ok(())
    }
    fn delete(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(PAGE_LIMIT);
        Ok(())
    }
}

impl<R> DefaulStore<R> for PageLimitStore
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            PAGE_LIMIT.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}
