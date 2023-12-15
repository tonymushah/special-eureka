use async_graphql::Object;
use mangadex_api_schema_rust::{
    v5::{GroupObject, ScanlationGroupAttributes as Attributes},
    ApiObjectNoRelationships,
};
use uuid::Uuid;

use self::attributes::ScanlationGroupAttributes;

pub mod attributes;

#[derive(Clone)]
pub enum ScanlationGroup {
    WithRelationship(GroupObject),
    WithoutRelationship(ApiObjectNoRelationships<Attributes>),
}

impl From<GroupObject> for ScanlationGroup {
    fn from(value: GroupObject) -> Self {
        ScanlationGroup::WithRelationship(value)
    }
}

impl From<ApiObjectNoRelationships<Attributes>> for ScanlationGroup {
    fn from(value: ApiObjectNoRelationships<Attributes>) -> Self {
        Self::WithoutRelationship(value)
    }
}

#[Object]
impl ScanlationGroup {
    pub async fn id(&self) -> Uuid {
        match self {
            ScanlationGroup::WithRelationship(i) => i.id,
            ScanlationGroup::WithoutRelationship(i) => i.id,
        }
    }
    pub async fn attributes(&self) -> ScanlationGroupAttributes {
        match self {
            ScanlationGroup::WithRelationship(i) => i.attributes.clone().into(),
            ScanlationGroup::WithoutRelationship(i) => i.attributes.clone().into(),
        }
    }
}
