use std::ops::Deref;

use async_graphql::{Error as GraphQLError, Object, Result as GraphQLResult};
use mangadex_api_schema_rust::{
    ApiObjectNoRelationships,
    v5::{
        MangaAttributes, RelatedAttributes, Relationship, ScanlationGroupAttributes, UserAttributes,
    },
};
use mangadex_api_types_rust::{RelationshipType, error::RelationshipConversionError};

use crate::objects::{manga::MangaObject as Manga, scanlation_group::ScanlationGroup, user::User};

#[derive(Debug, Clone)]
pub struct ChapterRelationships(pub Vec<Relationship>);

impl From<Vec<Relationship>> for ChapterRelationships {
    fn from(value: Vec<Relationship>) -> Self {
        Self(value)
    }
}

impl Deref for ChapterRelationships {
    type Target = Vec<Relationship>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[Object]
impl ChapterRelationships {
    pub async fn manga(&self) -> GraphQLResult<Manga> {
        self.iter()
            .find(|rel| rel.type_ == RelationshipType::Manga)
            .map(|rel| {
                <ApiObjectNoRelationships<MangaAttributes> as TryFrom<Relationship>>::try_from(
                    rel.clone(),
                )
            })
            .and_then(|rel| rel.ok())
            .map(<Manga as From<ApiObjectNoRelationships<MangaAttributes>>>::from)
            .ok_or(GraphQLError::new("Related manga not found"))
    }
    pub async fn scanlation_groups(&self) -> Vec<ScanlationGroup> {
        self.iter()
            .filter(|rel| rel.type_ == RelationshipType::ScanlationGroup)
            .flat_map(|rel| {
                <ApiObjectNoRelationships<ScanlationGroupAttributes> as TryFrom<Relationship>>::try_from(
                    rel.clone(),
                )
            })
            .map(<ScanlationGroup as From<ApiObjectNoRelationships<ScanlationGroupAttributes>>>::from)
            .collect::<Vec<ScanlationGroup>>()
    }
    pub async fn user(&self) -> GraphQLResult<User> {
        self.iter()
            .find(|e| e.type_ == RelationshipType::Creator || e.type_ == RelationshipType::User)
            .map(
                |value| -> Result<
                    ApiObjectNoRelationships<UserAttributes>,
                    RelationshipConversionError,
                > {
                    if let Some(RelatedAttributes::User(ref attributes)) = value.attributes {
                        Ok(ApiObjectNoRelationships {
                            id: value.id,
                            type_: RelationshipType::User,
                            attributes: attributes.clone(),
                        })
                    } else {
                        Err(RelationshipConversionError::AttributesNotFound(
                            RelationshipType::User,
                        ))
                    }
                },
            )
            .and_then(|inner| inner.ok())
            .map(<User as From<ApiObjectNoRelationships<UserAttributes>>>::from)
            .ok_or(GraphQLError::new("Related Uploader or User not found"))
    }
}
