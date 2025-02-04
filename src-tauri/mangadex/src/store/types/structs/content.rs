mod feed_impl;
pub mod profiles;

use async_graphql::{InputObject, SimpleObject};
use impl_trait_for_tuples::impl_for_tuples;
use mangadex_api_types_rust::{ContentRating, Demographic, Language, MangaStatus, TagSearchMode};
use serde::{Deserialize, Serialize};
use tauri::Runtime;
use uuid::Uuid;

use crate::utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt};

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

impl ContentProfile {
    pub fn is_empty(&self) -> bool {
        self.original_languages.is_empty()
            && self.excluded_original_language.is_empty()
            && self.publication_demographic.is_empty()
            && self.included_tags.is_empty()
            && self.excluded_tags.is_empty()
            && self.status.is_empty()
            && self.translated_languages.is_empty()
            && self.content_rating.is_empty()
            && self.excluded_groups.is_empty()
            && self.excluded_uploaders.is_empty()
    }
}

pub trait Feedable {
    fn feed(self, content_profile: &ContentProfile) -> Self;
}

#[impl_for_tuples(10)]
impl Feedable for Tuple {
    fn feed(mut self, content_profile: &ContentProfile) -> Self {
        for_tuples!(#( self.Tuple = Tuple.feed(content_profile); )*);
        self
    }
}

pub trait ContentFeeder<F: Feedable> {
    type Error;
    fn get_content_profile(&self) -> Result<ContentProfile, Self::Error>;
    fn try_feed(&self, feedable: F) -> Result<F, Self::Error> {
        let content_profile = self.get_content_profile()?;
        Ok(feedable.feed(&content_profile))
    }
    fn feed(&self, feedable: F) -> F {
        let content_profile = self.get_content_profile().unwrap_or_default();
        feedable.feed(&content_profile)
    }
}

impl<F, R> ContentFeeder<F> for tauri::AppHandle<R>
where
    F: Feedable,
    R: Runtime,
{
    type Error = crate::Error;
    fn get_content_profile(&self) -> Result<ContentProfile, Self::Error> {
        let watches = self.get_watches()?;
        let content_profiles_ref = watches.content_profiles.borrow();
        let content_profile_key_ref = watches.content_profiles_default_key.borrow();
        let ctt_profile = if let Some(key) = content_profile_key_ref.as_ref() {
            content_profiles_ref.get(key).cloned().unwrap_or_default()
        } else {
            Default::default()
        };
        Ok(ctt_profile)
    }
}

pub fn try_feed_from_gql_ctx<R, TF>(
    ctx: &async_graphql::Context<'_>,
    to_feed: TF,
) -> crate::Result<TF>
where
    R: Runtime,
    TF: Feedable,
{
    let app_handle = ctx.get_app_handle::<R>()?;
    app_handle.try_feed(to_feed)
}

pub fn feed_from_gql_ctx<R, TF>(ctx: &async_graphql::Context<'_>, to_feed: TF) -> TF
where
    R: Runtime,
    TF: Feedable,
{
    if let Ok(app_handle) = ctx.get_app_handle::<R>() {
        app_handle.feed(to_feed)
    } else {
        to_feed.feed(&Default::default())
    }
}
