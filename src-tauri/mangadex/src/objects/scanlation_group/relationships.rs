use std::ops::Deref;

use async_graphql::{Object, Result as GraphQLResult};
use mangadex_api_schema_rust::{
    v5::{RelatedAttributes, Relationship, UserAttributes},
    ApiObjectNoRelationships,
};
use mangadex_api_types_rust::{error::RelationshipConversionError, RelationshipType};

use crate::objects::user::User;

#[derive(Debug, Clone)]
pub struct ScanlationGroupRelationships(pub Vec<Relationship>);

impl Deref for ScanlationGroupRelationships {
    type Target = Vec<Relationship>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<Vec<Relationship>> for ScanlationGroupRelationships {
    fn from(value: Vec<Relationship>) -> Self {
        Self(value)
    }
}

#[Object]
impl ScanlationGroupRelationships {
    pub async fn leader(&self) -> GraphQLResult<Option<User>> {
        Ok(self
            .iter()
            .find(|e| e.type_ == RelationshipType::Leader)
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
            .map(<User as From<ApiObjectNoRelationships<UserAttributes>>>::from))
    }
    pub async fn members(&self) -> Vec<User> {
        self.iter()
            .filter(|e| e.type_ == RelationshipType::Member)
            .flat_map(
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
            .map(<User as From<ApiObjectNoRelationships<UserAttributes>>>::from)
            .collect::<Vec<User>>()
    }
}
