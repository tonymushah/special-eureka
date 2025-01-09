use crate::store::{
    keys::CHAPTER_LANGUAGES,
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};
use mangadex_api_types_rust::Language;
use serde::{Deserialize, Serialize};
use std::ops::{Deref, DerefMut};
use tauri::Runtime;

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct ChapterLanguagesStore(Vec<Language>);

impl Deref for ChapterLanguagesStore {
    type Target = Vec<Language>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ChapterLanguagesStore {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<Vec<Language>> for ChapterLanguagesStore {
    fn from(value: Vec<Language>) -> Self {
        Self(value)
    }
}

impl From<ChapterLanguagesStore> for Vec<Language> {
    fn from(value: ChapterLanguagesStore) -> Self {
        value.0
    }
}

impl<'de, R> ExtractFromStore<'de, R> for ChapterLanguagesStore
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(CHAPTER_LANGUAGES) {
            let client: Vec<Language> = serde_json::from_value(info.clone())?;
            Ok(Self(client))
        } else {
            Ok(Self(Vec::<Language>::new()))
        }
    }
}

impl<R> StoreCrud<R> for ChapterLanguagesStore
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.set(
            CHAPTER_LANGUAGES.to_string(),
            serde_json::to_value(self.clone())?,
        );
        Ok(())
    }
    fn delete(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(CHAPTER_LANGUAGES);
        Ok(())
    }
}

impl<R> DefaulStore<R> for ChapterLanguagesStore
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            CHAPTER_LANGUAGES.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}
