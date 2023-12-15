use async_graphql::Object;
use mangadex_api_schema_rust::{
    v5::{ChapterAttributes as Attributes, ChapterObject},
    ApiObjectNoRelationships,
};
use uuid::Uuid;

use self::attributes::ChapterAttributes;

pub mod attributes;

#[derive(Clone)]
pub enum Chapter {
    WithRelationship(ChapterObject),
    WithoutRelationship(ApiObjectNoRelationships<Attributes>),
}

impl From<ChapterObject> for Chapter {
    fn from(value: ChapterObject) -> Self {
        Self::WithRelationship(value)
    }
}

impl From<ApiObjectNoRelationships<Attributes>> for Chapter {
    fn from(value: ApiObjectNoRelationships<Attributes>) -> Self {
        Self::WithoutRelationship(value)
    }
}

#[Object]
impl Chapter {
    pub async fn id(&self) -> Uuid {
        match self {
            Chapter::WithRelationship(i) => i.id,
            Chapter::WithoutRelationship(i) => i.id,
        }
    }
    pub async fn attributes(&self) -> ChapterAttributes {
        match self {
            Chapter::WithRelationship(i) => i.attributes.clone().into(),
            Chapter::WithoutRelationship(i) => i.attributes.clone().into(),
        }
    }
}
