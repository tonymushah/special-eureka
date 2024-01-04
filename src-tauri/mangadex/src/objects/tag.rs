use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::TagAttributes as Attributes;
use mangadex_api_schema_rust::ApiObject;
use uuid::Uuid;

use self::attributes::TagAttributes;

use super::{GetAttributes, GetId};

pub mod attributes;
pub mod lists;

#[derive(Clone, Debug)]
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

impl GetId for Tag {
    fn get_id(&self) -> Uuid {
        self.id
    }
}

impl From<Tag> for Attributes {
    fn from(value: Tag) -> Self {
        value.0.attributes
    }
}

impl From<&Tag> for Attributes {
    fn from(value: &Tag) -> Self {
        value.attributes.clone()
    }
}

impl GetAttributes for Tag {
    type Attributes = TagAttributes;
    fn get_attributes(&self) -> Self::Attributes {
        Into::<Attributes>::into(self).into()
    }
}

#[Object]
impl Tag {
    pub async fn id(&self) -> Uuid {
        self.get_id()
    }
    pub async fn attributes(&self) -> TagAttributes {
        self.get_attributes()
    }
}
