pub mod attributes;
pub mod links;
pub mod relationships;

use async_graphql::Object;
use mangadex_api_schema_rust::{
    v5::{MangaAttributes, MangaObject as MangaData},
    ApiObjectNoRelationships,
};
use uuid::Uuid;

use self::attributes::GraphQLMangaAttributes;
pub enum MangaObject {
    WithRel(MangaData),
    WithoutRel(ApiObjectNoRelationships<MangaAttributes>),
}

#[Object]
impl MangaObject {
    pub async fn id(&self) -> Uuid {
        match self {
            MangaObject::WithRel(e) => e.id,
            MangaObject::WithoutRel(e) => e.id,
        }
    }
    pub async fn attributes(&self) -> GraphQLMangaAttributes {
        match self {
            MangaObject::WithRel(e) => e.attributes.clone().into(),
            MangaObject::WithoutRel(e) => e.attributes.clone().into(),
        }
    }
}

impl From<MangaData> for MangaObject {
    fn from(value: MangaData) -> Self {
        Self::WithRel(value)
    }
}

impl From<ApiObjectNoRelationships<MangaAttributes>> for MangaObject {
    fn from(value: ApiObjectNoRelationships<MangaAttributes>) -> Self {
        Self::WithoutRel(value)
    }
}
