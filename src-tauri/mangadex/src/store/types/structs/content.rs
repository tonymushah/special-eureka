mod feed_impl;
pub mod profiles;

use async_graphql::{InputObject, SimpleObject};
use impl_trait_for_tuples::impl_for_tuples;
use mangadex_api_types_rust::{ContentRating, Demographic, Language, MangaStatus, TagSearchMode};
use serde::{Deserialize, Serialize};
use tauri::{Manager, Runtime};
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

pub trait FeedContent {
    fn feed(self, content_profile: &ContentProfile) -> Self;
}

#[impl_for_tuples(10)]
impl FeedContent for Tuple {
    fn feed(mut self, content_profile: &ContentProfile) -> Self {
        for_tuples!(#( self.Tuple = Tuple.feed(content_profile); )*);
        self
    }
}

pub fn feed_from_manager<R, M, TF>(manager: &M, to_feed: TF) -> crate::Result<TF>
where
    R: Runtime,
    M: Manager<R>,
    TF: FeedContent,
{
    let content_profile: ContentProfile = {
        let watches = manager.get_watches()?;
        let content_profiles_ref = watches.content_profiles.borrow();
        let content_profile_key_ref = watches.content_profiles_default_key.borrow();
        if let Some(key) = content_profile_key_ref.as_ref() {
            content_profiles_ref.get(key).cloned().unwrap_or_default()
        } else {
            Default::default()
        }
    };
    Ok(to_feed.feed(&content_profile))
}

pub fn feed_from_gql_ctx<R, TF>(ctx: &async_graphql::Context<'_>, to_feed: TF) -> crate::Result<TF>
where
    R: Runtime,
    TF: FeedContent,
{
    let app_handle = ctx.get_app_handle::<R>()?;
    feed_from_manager(app_handle, to_feed)
}
