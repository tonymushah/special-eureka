use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::{LocalizedString, TagAttributes as Attributes};
use mangadex_api_types_rust::TagGroup;

pub struct TagAttributes(pub(crate) Attributes);

impl Deref for TagAttributes {
    type Target = Attributes;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<Attributes> for TagAttributes {
    fn from(value: Attributes) -> Self {
        Self(value)
    }
}

impl From<TagAttributes> for Attributes {
    fn from(value: TagAttributes) -> Self {
        value.0
    }
}

#[Object]
impl TagAttributes {
    pub async fn name(&self) -> &LocalizedString {
        &self.name
    }
    pub async fn description(&self) -> &LocalizedString {
        &self.description
    }
    pub async fn group(&self) -> TagGroup {
        self.group
    }
}
