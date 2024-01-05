use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::{AuthorAttributes as Attributes, LocalizedString};
use mangadex_api_types_rust::MangaDexDateTime;
use url::Url;

#[derive(Debug, Clone)]
pub struct AuthorAttributes(pub Attributes);

impl From<Attributes> for AuthorAttributes {
    fn from(value: Attributes) -> Self {
        Self(value)
    }
}

impl Deref for AuthorAttributes {
    type Target = Attributes;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<AuthorAttributes> for Attributes {
    fn from(value: AuthorAttributes) -> Self {
        value.0
    }
}

#[Object]
impl AuthorAttributes {
    pub async fn name(&self) -> &String {
        &self.name
    }
    pub async fn image_url(&self) -> Option<Url> {
        let url = self.image_url.as_ref()?;
        Url::parse(url).ok()
    }
    pub async fn biography(&self) -> &LocalizedString {
        &self.biography
    }
    pub async fn twitter(&self) -> Option<&Url> {
        self.twitter.as_ref()
    }
    pub async fn pixiv(&self) -> Option<&Url> {
        self.pixiv.as_ref()
    }
    pub async fn melon_book(&self) -> Option<&Url> {
        self.melon_book.as_ref()
    }
    pub async fn fan_box(&self) -> Option<&Url> {
        self.fan_box.as_ref()
    }
    pub async fn booth(&self) -> Option<&Url> {
        self.booth.as_ref()
    }
    pub async fn nico_video(&self) -> Option<&Url> {
        self.nico_video.as_ref()
    }
    pub async fn skeb(&self) -> Option<&Url> {
        self.skeb.as_ref()
    }
    pub async fn fantia(&self) -> Option<&Url> {
        self.fantia.as_ref()
    }
    pub async fn tumblr(&self) -> Option<&Url> {
        self.tumblr.as_ref()
    }
    pub async fn youtube(&self) -> Option<&Url> {
        self.youtube.as_ref()
    }
    pub async fn weibo(&self) -> Option<&Url> {
        self.weibo.as_ref()
    }
    pub async fn naver(&self) -> Option<&Url> {
        self.naver.as_ref()
    }
    pub async fn website(&self) -> Option<&Url> {
        self.website.as_ref()
    }
    pub async fn version(&self) -> u32 {
        self.version
    }
    pub async fn created_at(&self) -> MangaDexDateTime {
        self.created_at
    }
    pub async fn updated_at(&self) -> Option<MangaDexDateTime> {
        self.updated_at
    }
}
