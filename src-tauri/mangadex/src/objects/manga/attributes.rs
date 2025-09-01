use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::{
    ApiObject,
    v5::{LocalizedString, MangaAttributes, TagAttributes as VanillaTagAttributes},
};
use mangadex_api_types_rust::{
    ContentRating, Demographic, Language, MangaDexDateTime, MangaState, MangaStatus,
};
use uuid::Uuid;

use crate::objects::tag::Tag;

use super::links::MangaLinks;

#[derive(Clone, Debug)]
pub struct GraphQLMangaAttributes(pub(crate) MangaAttributes);

impl Deref for GraphQLMangaAttributes {
    type Target = MangaAttributes;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<MangaAttributes> for GraphQLMangaAttributes {
    fn from(value: MangaAttributes) -> Self {
        Self(value)
    }
}

impl From<GraphQLMangaAttributes> for MangaAttributes {
    fn from(value: GraphQLMangaAttributes) -> Self {
        value.0
    }
}

#[Object]
impl GraphQLMangaAttributes {
    pub async fn title(&self) -> &LocalizedString {
        &self.title
    }
    pub async fn alt_titles(&self) -> &Vec<LocalizedString> {
        &self.alt_titles
    }
    pub async fn description(&self) -> &LocalizedString {
        &self.description
    }
    pub async fn is_locked(&self) -> bool {
        self.is_locked
    }
    pub async fn links(&self) -> Option<MangaLinks> {
        self.links.clone().map(From::from)
    }
    pub async fn original_language(&self) -> Language {
        self.original_language
    }
    pub async fn last_volume(&self) -> Option<&String> {
        self.last_volume.as_ref()
    }
    pub async fn last_chapter(&self) -> Option<&String> {
        self.last_chapter.as_ref()
    }
    pub async fn publication_demographic(&self) -> Option<Demographic> {
        self.publication_demographic
    }
    pub async fn status(&self) -> MangaStatus {
        self.status
    }
    pub async fn year(&self) -> Option<u16> {
        self.year
    }
    pub async fn content_rating(&self) -> Option<ContentRating> {
        self.content_rating
    }
    pub async fn latest_uploaded_chapter(&self) -> Option<Uuid> {
        self.latest_uploaded_chapter
    }
    pub async fn available_translated_languages(&self) -> Option<&Vec<Language>> {
        if self.available_translated_languages.is_empty() {
            None
        } else {
            Some(&self.available_translated_languages)
        }
    }
    pub async fn tags(&self) -> Vec<Tag> {
        self.tags
            .iter()
            .map(|i| <Tag as From<ApiObject<VanillaTagAttributes>>>::from(i.clone()))
            .collect()
    }
    pub async fn state(&self) -> MangaState {
        self.state
    }
    pub async fn created_at(&self) -> MangaDexDateTime {
        self.created_at
    }
    pub async fn updated_at(&self) -> Option<MangaDexDateTime> {
        self.updated_at
    }
    pub async fn version(&self) -> u32 {
        self.version
    }
}
