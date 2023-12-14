use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::ApiObject;
use mangadex_api_schema_rust::v5::TagAttributes as Attributes;
use uuid::Uuid;

use self::attributes::TagAttributes;

pub mod attributes;

pub struct Tag(ApiObject<Attributes>);

impl Deref for Tag {
    type Target = ApiObject<Attributes>;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<ApiObject<Attributes>> for Tag {
    fn from(value: ApiObject<Attributes>) -> Self {
        Self(value)
    }
}

#[Object]
impl Tag{
    async fn id(&self) -> Uuid {
        self.id
    }
    async fn attributes(&self) -> TagAttributes {
        self.attributes.clone().into()
    }
}