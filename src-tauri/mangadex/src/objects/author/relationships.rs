use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::{
    ApiObjectNoRelationships,
    v5::{MangaAttributes, Relationship},
};
use mangadex_api_types_rust::RelationshipType;

use crate::objects::manga::MangaObject;

#[derive(Debug, Clone)]
pub struct AuthorRelationships(pub Vec<Relationship>);

impl From<Vec<Relationship>> for AuthorRelationships {
    fn from(value: Vec<Relationship>) -> Self {
        Self(value)
    }
}

impl Deref for AuthorRelationships {
    type Target = Vec<Relationship>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[Object]
impl AuthorRelationships {
    pub async fn works(&self) -> Vec<MangaObject> {
        self.iter()
            .filter(|e| e.type_ == RelationshipType::Manga)
            .flat_map(
                |rel| -> Result<
                    ApiObjectNoRelationships<MangaAttributes>,
                    <ApiObjectNoRelationships<MangaAttributes> as TryFrom<Relationship>>::Error,
                > {
                    <ApiObjectNoRelationships<MangaAttributes> as TryFrom<Relationship>>::try_from(
                        rel.clone(),
                    )
                },
            )
            .map(<MangaObject as From<ApiObjectNoRelationships<MangaAttributes>>>::from)
            .collect::<Vec<MangaObject>>()
    }
}
