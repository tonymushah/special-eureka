pub mod profiles;

use async_graphql::{InputObject, SimpleObject};
use mangadex_api_types_rust::{ContentRating, Demographic, Language, MangaStatus, TagSearchMode};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(
    Debug, Clone, PartialEq, Eq, SimpleObject, InputObject, Default, Deserialize, Serialize,
)]
#[graphql(input_name = "ContentProfileInput")]
pub struct ContentProfile {
    #[serde(default)]
    #[graphql(default)]
    pub original_languages: Vec<Language>,
    #[serde(default)]
    #[graphql(default)]
    pub publication_demographic: Vec<Demographic>,
    #[serde(default)]
    #[graphql(default)]
    pub included_tags: Vec<Uuid>,
    pub included_tags_mode: Option<TagSearchMode>,
    #[serde(default)]
    #[graphql(default)]
    pub excluded_tags: Vec<Uuid>,
    pub excluded_tags_mode: Option<TagSearchMode>,
    #[serde(default)]
    #[graphql(default)]
    pub status: Vec<MangaStatus>,
    #[serde(default)]
    #[graphql(default)]
    pub excluded_original_language: Vec<Language>,
    #[serde(default)]
    #[graphql(default)]
    pub translated_languages: Vec<Language>,
    #[serde(default)]
    #[graphql(default)]
    pub content_rating: Vec<ContentRating>,
    #[serde(default)]
    #[graphql(default)]
    pub excluded_groups: Vec<Uuid>,
    #[serde(default)]
    #[graphql(default)]
    pub excluded_uploaders: Vec<Uuid>,
}

pub trait FeedContent {
    fn feed(self, content_profile: ContentProfile) -> Self;
}
