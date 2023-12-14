use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::{TagAttributes as Attributes, LocalizedString};
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

#[Object]
impl TagAttributes {
    async fn name(&self) -> &LocalizedString {
        &self.name
    }
    async fn description(&self) -> &LocalizedString {
        &self.description
    }
    async fn group(&self) -> TagGroup {
        self.group
    }
}