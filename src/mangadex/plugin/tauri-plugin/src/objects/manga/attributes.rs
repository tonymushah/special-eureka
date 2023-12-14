use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::{
    v5::{LocalizedString, MangaAttributes, TagAttributes as VanillaTagAttributes},
    ApiObject,
};
use mangadex_api_types_rust::{
    ContentRating, Demographic, Language, MangaDexDateTime, MangaState, MangaStatus,
};
use uuid::Uuid;

use crate::objects::tag::Tag;

use super::links::MangaLinks;

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

#[Object]
impl GraphQLMangaAttributes {
    async fn title(&self) -> &LocalizedString {
        &self.title
    }
    async fn alt_titles(&self) -> &Vec<LocalizedString> {
        &self.alt_titles
    }
    async fn description(&self) -> &LocalizedString {
        &self.description
    }
    async fn is_locked(&self) -> bool {
        self.is_locked
    }
    async fn links(&self) -> Option<MangaLinks> {
        self.links.clone().map(|i| From::from(i))
    }
    async fn original_language(&self) -> Language {
        self.original_language
    }
    async fn last_volume(&self) -> Option<&String> {
        self.last_volume.as_ref()
    }
    async fn last_chapter(&self) -> Option<&String> {
        self.last_chapter.as_ref()
    }
    async fn publication_demographic(&self) -> Option<Demographic> {
        self.publication_demographic
    }
    async fn status(&self) -> MangaStatus {
        self.status
    }
    async fn year(&self) -> Option<u16> {
        self.year
    }
    async fn content_rating(&self) -> Option<ContentRating> {
        self.content_rating
    }
    async fn latest_uploaded_chapter(&self) -> Option<Uuid> {
        self.latest_uploaded_chapter
    }
    async fn available_translated_languages(&self) -> Option<&Vec<Language>> {
        if self.available_translated_languages.is_empty() {
            None
        } else {
            Some(&self.available_translated_languages)
        }
    }
    async fn tags(&self) -> Vec<Tag> {
        self.tags
            .iter()
            .map(|i| <Tag as From<ApiObject<VanillaTagAttributes>>>::from(i.clone()))
            .collect()
    }
    async fn state(&self) -> MangaState {
        self.state
    }
    #[graphql(derived(with = "mangadex_api_schema_rust::v5::mangadex_datetime_serialize"))]
    async fn created_at(&self) -> MangaDexDateTime {
        self.created_at
    }
    #[graphql(derived(with = "mangadex_api_schema_rust::v5::mangadex_datetime_serialize_option"))]
    async fn updated_at(&self) -> Option<MangaDexDateTime> {
        self.updated_at
    }
}
