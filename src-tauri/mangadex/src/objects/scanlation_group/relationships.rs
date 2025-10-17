use std::ops::Deref;

use async_graphql::{Object, Result as GraphQLResult};
use mangadex_api_schema_rust::{
    ApiObjectNoRelationships,
    v5::{RelatedAttributes, Relationship, UserAttributes},
};
use mangadex_api_types_rust::{RelationshipType, error::RelationshipConversionError};

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
		// TODO add leader fetching even if its attributes data is not available
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
	pub async fn members_len(&self) -> GraphQLResult<u32> {
		Ok(self.iter()
            .filter(|e| e.type_ == RelationshipType::Member || e.type_ == RelationshipType::Leader)
			.count()
			.try_into()?)
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
