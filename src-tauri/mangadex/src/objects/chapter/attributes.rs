use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::ChapterAttributes as Attributes;
use mangadex_api_types_rust::{Language, MangaDexDateTime};
use url::Url;
use uuid::Uuid;

pub struct ChapterAttributes(Attributes);

impl From<Attributes> for ChapterAttributes {
    fn from(value: Attributes) -> Self {
        Self(value)
    }
}

impl Deref for ChapterAttributes {
    type Target = Attributes;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[Object]
impl ChapterAttributes {
    pub async fn title(&self) -> Option<&String> {
        self.title.as_ref()
    }
    pub async fn volume(&self) -> Option<&String> {
        self.volume.as_ref()
    }
    pub async fn chapter(&self) -> Option<&String> {
        self.chapter.as_ref()
    }
    pub async fn pages(&self) -> u32 {
        self.pages
    }
    pub async fn translated_language(&self) -> Language {
        self.translated_language
    }
    pub async fn uploader(&self) -> Option<Uuid> {
        self.uploader
    }
    pub async fn external_url(&self) -> Option<&Url> {
        self.external_url.as_ref()
    }
    pub async fn created_at(&self) -> MangaDexDateTime {
        self.created_at
    }
    pub async fn updated_at(&self) -> Option<MangaDexDateTime> {
        self.updated_at
    }
    pub async fn publish_at(&self) -> Option<MangaDexDateTime> {
        self.publish_at
    }
    pub async fn readable_at(&self) -> Option<MangaDexDateTime> {
        self.readable_at
    }
    pub async fn version(&self) -> u32 {
        self.version
    }
}
