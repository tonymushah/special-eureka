use async_graphql::Object;
use mangadex_api_schema_rust::{
    v5::{CustomListAttributes as Attributes, CustomListObject},
    ApiObjectNoRelationships,
};
use uuid::Uuid;

use self::attributes::CustomListAttributes;

pub mod attributes;

#[derive(Clone)]
pub enum CustomList {
    WithRelationship(CustomListObject),
    WithoutRelationship(ApiObjectNoRelationships<Attributes>),
}

impl From<CustomListObject> for CustomList {
    fn from(value: CustomListObject) -> Self {
        Self::WithRelationship(value)
    }
}

impl From<ApiObjectNoRelationships<Attributes>> for CustomList {
    fn from(value: ApiObjectNoRelationships<Attributes>) -> Self {
        Self::WithoutRelationship(value)
    }
}

#[Object]
impl CustomList {
    pub async fn id(&self) -> Uuid {
        match self {
            CustomList::WithRelationship(i) => i.id,
            CustomList::WithoutRelationship(i) => i.id,
        }
    }
    pub async fn attributes(&self) -> CustomListAttributes {
        match self {
            CustomList::WithRelationship(i) => i.attributes.clone().into(),
            CustomList::WithoutRelationship(i) => i.attributes.clone().into(),
        }
    }
}
