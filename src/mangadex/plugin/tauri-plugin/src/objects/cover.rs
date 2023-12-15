use async_graphql::Object;
use mangadex_api_schema_rust::{
    v5::{CoverAttributes as Attributes, CoverObject},
    ApiObjectNoRelationships,
};
use uuid::Uuid;

use self::attributes::CoverAttributes;

pub mod attributes;

#[derive(Clone)]
pub enum Cover {
    WithRelationship(CoverObject),
    WithoutRelationship(ApiObjectNoRelationships<Attributes>),
}

impl From<CoverObject> for Cover {
    fn from(value: CoverObject) -> Self {
        Self::WithRelationship(value)
    }
}

impl From<ApiObjectNoRelationships<Attributes>> for Cover {
    fn from(value: ApiObjectNoRelationships<Attributes>) -> Self {
        Self::WithoutRelationship(value)
    }
}

#[Object]
impl Cover {
    pub async fn id(&self) -> Uuid {
        match self {
            Cover::WithRelationship(i) => i.id,
            Cover::WithoutRelationship(i) => i.id,
        }
    }
    pub async fn attributes(&self) -> CoverAttributes {
        match self {
            Cover::WithRelationship(i) => i.attributes.clone().into(),
            Cover::WithoutRelationship(i) => i.attributes.clone().into(),
        }
    }
}
