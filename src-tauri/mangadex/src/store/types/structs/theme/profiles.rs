use std::{
    collections::HashMap,
    ops::{Deref, DerefMut},
};

use async_graphql::{SimpleObject, InputObject};
use serde::{Deserialize, Serialize};
use tauri::Runtime;

use super::MangaDexTheme as Theme;
use crate::store::{
    keys::{THEME_PROFILE, THEME_PROFILE_KEY},
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};

type ThemeProfileInner = HashMap<String, Theme>;

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct ThemeProfiles(ThemeProfileInner);

impl Deref for ThemeProfiles {
    type Target = ThemeProfileInner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ThemeProfiles {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<Vec<ThemeProfileEntry>> for ThemeProfiles {
    fn from(value: Vec<ThemeProfileEntry>) -> Self {
        Self(
            value
                .into_iter()
                .map(|entry| (entry.name, entry.value))
                .collect(),
        )
    }
}

impl ThemeProfiles {
    pub fn get_entries(&self) -> Vec<ThemeProfileEntry> {
        self.iter()
            .map(|(name, value)| ThemeProfileEntry {
                name: name.clone(),
                value: value.clone(),
            })
            .collect()
    }
}

#[derive(Debug, Clone, SimpleObject, InputObject)]
#[graphql(input_name = "ThemeProfileEntryInput")]
pub struct ThemeProfileEntry {
    pub name: String,
    pub value: Theme,
}

impl Default for ThemeProfileEntry {
    fn default() -> Self {
        Self {
            name: "Default".into(),
            value: Default::default(),
        }
    }
}

impl<'de, R> ExtractFromStore<'de, R> for ThemeProfiles
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(THEME_PROFILE) {
            let client: Self = serde_json::from_value(info.clone())?;
            Ok(client)
        } else {
            Ok(Self::default())
        }
    }
}

impl<R> StoreCrud<R> for ThemeProfiles
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &mut tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.insert(
            THEME_PROFILE.to_string(),
            serde_json::to_value(self.clone())?,
        )?;
        Ok(())
    }
    fn delete(
        &self,
        store: &mut tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(THEME_PROFILE)?;
        Ok(())
    }
}

impl<R> DefaulStore<R> for ThemeProfiles
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            THEME_PROFILE.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct ThemeProfileDefaultKey(Option<String>);

impl From<Option<String>> for ThemeProfileDefaultKey {
    fn from(value: Option<String>) -> Self {
        Self(value)
    }
}

impl ThemeProfileDefaultKey {
    pub fn into_inner(self) -> Option<String> {
        self.0
    }
}

impl Deref for ThemeProfileDefaultKey {
    type Target = Option<String>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ThemeProfileDefaultKey {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl<'de, R> ExtractFromStore<'de, R> for ThemeProfileDefaultKey
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(THEME_PROFILE_KEY) {
            let client: Self = serde_json::from_value(info.clone())?;
            Ok(client)
        } else {
            Ok(Self::default())
        }
    }
}

impl<R> StoreCrud<R> for ThemeProfileDefaultKey
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &mut tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.insert(
            THEME_PROFILE_KEY.to_string(),
            serde_json::to_value(self.clone())?,
        )?;
        Ok(())
    }
    fn delete(
        &self,
        store: &mut tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(THEME_PROFILE_KEY)?;
        Ok(())
    }
}

impl<R> DefaulStore<R> for ThemeProfileDefaultKey
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            THEME_PROFILE_KEY.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}
