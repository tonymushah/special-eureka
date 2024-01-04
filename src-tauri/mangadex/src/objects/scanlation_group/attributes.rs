use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::{LocalizedString, ScanlationGroupAttributes as Attributes};
use mangadex_api_types_rust::{Language, MangaDexDateTime, MangaDexDuration};
use url::Url;

pub struct ScanlationGroupAttributes(Attributes);

impl From<Attributes> for ScanlationGroupAttributes {
    fn from(value: Attributes) -> Self {
        Self(value)
    }
}

impl Deref for ScanlationGroupAttributes {
    type Target = Attributes;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<ScanlationGroupAttributes> for Attributes {
    fn from(value: ScanlationGroupAttributes) -> Self {
        value.0
    }
}

#[Object]
impl ScanlationGroupAttributes {
    pub async fn name(&self) -> &String {
        &self.name
    }
    pub async fn alt_names(&self) -> &Vec<LocalizedString> {
        &self.alt_names
    }
    pub async fn website(&self) -> Option<Url> {
        let inner = self.website.as_ref()?;
        Url::parse(inner).ok()
    }
    pub async fn irc_server(&self) -> Option<&String> {
        self.irc_server.as_ref()
    }
    pub async fn irc_channel(&self) -> Option<&String> {
        self.irc_channel.as_ref()
    }
    pub async fn discord(&self) -> Option<&String> {
        self.discord.as_ref()
    }
    pub async fn contact_email(&self) -> Option<&String> {
        self.contact_email.as_ref()
    }
    pub async fn description(&self) -> Option<&String> {
        self.description.as_ref()
    }
    pub async fn twitter(&self) -> Option<&Url> {
        self.twitter.as_ref()
    }
    pub async fn manga_updates(&self) -> Option<&Url> {
        self.manga_updates.as_ref()
    }
    pub async fn focused_languages(&self) -> Option<&Vec<Language>> {
        self.focused_languages.as_ref()
    }
    pub async fn locked(&self) -> bool {
        self.locked
    }
    pub async fn official(&self) -> bool {
        self.official
    }
    pub async fn verified(&self) -> bool {
        self.verified
    }
    pub async fn ex_licensed(&self) -> Option<bool> {
        self.ex_licensed
    }
    pub async fn publish_delay(&self) -> Option<&MangaDexDuration> {
        self.publish_delay.as_ref()
    }
    pub async fn version(&self) -> u32 {
        self.version
    }
    pub async fn created_at(&self) -> MangaDexDateTime {
        self.created_at
    }
    pub async fn updated_at(&self) -> MangaDexDateTime {
        self.updated_at
    }
}
