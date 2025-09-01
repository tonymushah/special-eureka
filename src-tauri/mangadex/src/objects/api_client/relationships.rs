use std::ops::Deref;

use async_graphql::{Error, Object, Result};
use mangadex_api_schema_rust::{
    ApiObjectNoRelationships,
    v5::{RelatedAttributes, Relationship, UserAttributes},
};
use mangadex_api_types_rust::{RelationshipType, error::RelationshipConversionError};

use crate::objects::user::User;

#[derive(Clone)]
pub struct ApiClientRelationships(pub Vec<Relationship>);

impl From<Vec<Relationship>> for ApiClientRelationships {
    fn from(value: Vec<Relationship>) -> Self {
        Self(value)
    }
}

impl Deref for ApiClientRelationships {
    type Target = Vec<Relationship>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[Object]
impl ApiClientRelationships {
    pub async fn creator(&self) -> Result<User> {
        self.iter()
            .find(|rel| {
                rel.type_ == RelationshipType::Creator || rel.type_ == RelationshipType::User
            })
            .map(
                |value| -> Result<
                    ApiObjectNoRelationships<UserAttributes>,
                    RelationshipConversionError,
                > {
                    if let Some(RelatedAttributes::User(ref attributes)) = value.attributes {
                        Ok(ApiObjectNoRelationships {
                            id: value.id,
                            type_: RelationshipType::Creator,
                            attributes: attributes.clone(),
                        })
                    } else {
                        Err(RelationshipConversionError::AttributesNotFound(
                            RelationshipType::Creator,
                        ))
                    }
                },
            )
            .and_then(|inner| inner.ok())
            .map(<User as From<ApiObjectNoRelationships<UserAttributes>>>::from)
            .ok_or(Error::new("Creator not found"))
    }
}
