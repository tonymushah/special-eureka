use std::ops::{Deref, DerefMut};

use async_graphql::Enum;
use serde::{Deserialize, Serialize};
use tauri::Runtime;

use crate::store::{
    keys::CHAPTER_FEED_STYLE,
    types::{DefaulStore, ExtractFromStore, StoreCrud},
};

#[derive(
    Debug, Clone, Copy, Enum, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize, Default,
)]
pub enum ChapterFeedStyle {
    #[default]
    CoverFull,
    CoverLess,
}

#[derive(Debug, Clone, Default, Deserialize, Serialize)]
pub struct ChapterFeedStyleStore(ChapterFeedStyle);

impl Deref for ChapterFeedStyleStore {
    type Target = ChapterFeedStyle;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ChapterFeedStyleStore {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<ChapterFeedStyle> for ChapterFeedStyleStore {
    fn from(value: ChapterFeedStyle) -> Self {
        Self(value)
    }
}

impl From<ChapterFeedStyleStore> for ChapterFeedStyle {
    fn from(value: ChapterFeedStyleStore) -> Self {
        value.0
    }
}

impl<R> ExtractFromStore<'_, R> for ChapterFeedStyleStore
where
    R: Runtime,
{
    fn extract_from_store(
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<Self, tauri_plugin_store::Error> {
        if let Some(info) = store.get(CHAPTER_FEED_STYLE) {
            let d: ChapterFeedStyle = serde_json::from_value(info.clone())?;
            Ok(Self(d))
        } else {
            Ok(Self::default())
        }
    }
}

impl<R> StoreCrud<R> for ChapterFeedStyleStore
where
    R: Runtime,
{
    fn insert(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.set(
            CHAPTER_FEED_STYLE.to_string(),
            serde_json::to_value(self.clone())?,
        );
        Ok(())
    }
    fn delete(
        &self,
        store: &tauri_plugin_store::Store<R>,
    ) -> Result<(), tauri_plugin_store::Error> {
        store.delete(CHAPTER_FEED_STYLE);
        Ok(())
    }
}

impl<R> DefaulStore<R> for ChapterFeedStyleStore
where
    R: Runtime,
{
    fn default_store(
        store_builder: tauri_plugin_store::StoreBuilder<R>,
    ) -> Result<tauri_plugin_store::StoreBuilder<R>, tauri_plugin_store::Error> {
        Ok(store_builder.default(
            CHAPTER_FEED_STYLE.to_string(),
            serde_json::to_value(Self::default())?,
        ))
    }
}
