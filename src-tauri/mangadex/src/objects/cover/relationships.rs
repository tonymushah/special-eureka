use std::ops::Deref;

use async_graphql::{Error as GraphQLError, Object, Result as GraphQLResult};
use mangadex_api_schema_rust::{
    ApiObjectNoRelationships,
    v5::{MangaAttributes, RelatedAttributes, Relationship, UserAttributes},
};
use mangadex_api_types_rust::{RelationshipType, error::RelationshipConversionError};

use crate::objects::{manga::MangaObject, user::User};

#[derive(Debug, Clone)]
pub struct CoverRelationships(pub Vec<Relationship>);

impl From<Vec<Relationship>> for CoverRelationships {
    fn from(value: Vec<Relationship>) -> Self {
        Self(value)
    }
}

impl Deref for CoverRelationships {
    type Target = Vec<Relationship>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[Object]
impl CoverRelationships {
    pub async fn manga(&self) -> GraphQLResult<MangaObject> {
        self.iter()
            .find(|rel| rel.type_ == RelationshipType::Manga)
            .map(|rel| {
                <ApiObjectNoRelationships<MangaAttributes> as TryFrom<Relationship>>::try_from(
                    rel.clone(),
                )
            })
            .and_then(|rel| rel.ok())
            .map(<MangaObject as From<ApiObjectNoRelationships<MangaAttributes>>>::from)
            .ok_or(GraphQLError::new("Related manga not found"))
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
