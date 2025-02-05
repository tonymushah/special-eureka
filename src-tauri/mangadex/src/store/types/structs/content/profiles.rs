use std::{
    collections::HashMap,
    ops::{Deref, DerefMut},
};

use async_graphql::{InputObject, SimpleObject};
use serde::{Deserialize, Serialize};
use tauri::Runtime;

use super::ContentProfile;
use crate::store::{
    keys::{CONTENT_PROFILE, CONTENT_PROFILE_KEY},
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};

type ContentProfilesInner = HashMap<String, ContentProfile>;

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct ContentProfiles(ContentProfilesInner);

impl Deref for ContentProfiles {
    type Target = ContentProfilesInner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ContentProfiles {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<Vec<ContentProfileEntry>> for ContentProfiles {
    fn from(value: Vec<ContentProfileEntry>) -> Self {
        Self(
            value
                .into_iter()
                .map(|entry| (entry.name, entry.value))
                .collect(),
        )
    }
}

impl ContentProfiles {
    pub fn get_entries(&self) -> Vec<ContentProfileEntry> {
        self.iter()
            .map(|(name, value)| ContentProfileEntry {
                name: name.clone(),
                value: value.clone(),
            })
            .collect()
    }
}

#[derive(Debug, Clone, SimpleObject, InputObject)]
#[graphql(input_name = "ContentProfileEntryInput")]
pub struct ContentProfileEntry {
    pub name: String,
    pub value: ContentProfile,
}

impl Default for ContentProfileEntry {
    fn default() -> Self {
        Self {
            name: "Default".into(),
            value: Default::default(),
        }
    }
}

impl<R> ExtractFromStore<'_, R> for ContentProfiles
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(CONTENT_PROFILE) {
            let client: Self = serde_json::from_value(info.clone())?;
            Ok(client)
        } else {
            Ok(Self::default())
        }
    }
}

impl<R> StoreCrud<R> for ContentProfiles
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.set(
            CONTENT_PROFILE.to_string(),
            serde_json::to_value(self.clone())?,
        );
        Ok(())
    }
    fn delete(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(CONTENT_PROFILE);
        Ok(())
    }
}

impl<R> DefaulStore<R> for ContentProfiles
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            CONTENT_PROFILE.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct ContentProfileDefaultKey(Option<String>);

impl From<Option<String>> for ContentProfileDefaultKey {
    fn from(value: Option<String>) -> Self {
        Self(value)
    }
}

impl ContentProfileDefaultKey {
    pub fn into_inner(self) -> Option<String> {
        self.0
    }
}

impl Deref for ContentProfileDefaultKey {
    type Target = Option<String>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ContentProfileDefaultKey {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl<R> ExtractFromStore<'_, R> for ContentProfileDefaultKey
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(CONTENT_PROFILE_KEY) {
            let client: Self = serde_json::from_value(info.clone())?;
            Ok(client)
        } else {
            Ok(Self::default())
        }
    }
}

impl<R> StoreCrud<R> for ContentProfileDefaultKey
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.set(
            CONTENT_PROFILE_KEY.to_string(),
            serde_json::to_value(self.clone())?,
        );
        Ok(())
    }
    fn delete(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(CONTENT_PROFILE_KEY);
        Ok(())
    }
}

impl<R> DefaulStore<R> for ContentProfileDefaultKey
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            CONTENT_PROFILE_KEY.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}
