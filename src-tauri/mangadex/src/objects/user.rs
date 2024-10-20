use async_graphql::{Context, Object, Result as GraphQLResult};
use convert_case::{Case, Casing};
use mangadex_api_schema_rust::{
    v5::{Relationship, UserAttributes as Attributes, UserObject},
    ApiObjectNoRelationships,
};
use mangadex_api_types_rust::ReferenceExpansionResource;
use relationships::UserRelationships;
use uuid::Uuid;

use crate::query::user::UserQueries;

use self::attributes::UserAttributes;

use super::{
    ExtractReferenceExpansion, ExtractReferenceExpansionFromContext, ExtractRelationships,
    GetAttributes, GetId,
};

pub mod attributes;
pub mod lists;
pub mod relationships;

#[derive(Clone, Debug)]
pub enum User {
    WithRelationship(UserObject),
    WithoutRelationship(ApiObjectNoRelationships<Attributes>),
}

impl From<UserObject> for User {
    fn from(value: UserObject) -> Self {
        Self::WithRelationship(value)
    }
}

impl From<ApiObjectNoRelationships<Attributes>> for User {
    fn from(value: ApiObjectNoRelationships<Attributes>) -> Self {
        Self::WithoutRelationship(value)
    }
}

impl GetId for User {
    fn get_id(&self) -> Uuid {
        match self {
            User::WithRelationship(i) => i.id,
            User::WithoutRelationship(i) => i.id,
        }
    }
}

impl From<User> for Attributes {
    fn from(value: User) -> Self {
        match value {
            User::WithRelationship(i) => i.attributes,
            User::WithoutRelationship(i) => i.attributes,
        }
    }
}

impl From<&User> for Attributes {
    fn from(value: &User) -> Self {
        match value {
            User::WithRelationship(i) => i.attributes.clone(),
            User::WithoutRelationship(i) => i.attributes.clone(),
        }
    }
}

impl GetAttributes for User {
    type Attributes = UserAttributes;
    fn get_attributes(&self) -> Self::Attributes {
        Into::<Attributes>::into(self).into()
    }
}

impl ExtractRelationships for User {
    fn get_relationships(&self) -> Option<Vec<Relationship>> {
        match self {
            Self::WithRelationship(o) => Some(o.relationships.clone()),
            Self::WithoutRelationship(_) => None,
        }
    }
}

#[Object]
impl User {
    pub async fn id(&self) -> Uuid {
        self.get_id()
    }
    pub async fn attributes(&self) -> UserAttributes {
        self.get_attributes()
    }
    pub async fn relationships<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> GraphQLResult<UserRelationships> {
        match self {
            User::WithRelationship(o) => Ok(UserRelationships(o.relationships.clone())),
            User::WithoutRelationship(o) => Ok(UserRelationships(
                UserQueries
                    .get(ctx, o.id)
                    .await?
                    .get_relationships()
                    .ok_or(crate::Error::EmptyRelationshipTable)?,
            )),
        }
    }
}

impl ExtractReferenceExpansion<'_> for User {
    fn exctract(field: async_graphql::SelectionField<'_>) -> Vec<ReferenceExpansionResource> {
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        field.selection_set().for_each(|f| {
            if f.name().to_case(Case::Snake).as_str() == "groups" {
                includes.push(ReferenceExpansionResource::ScanlationGroup);
            }
        });
        includes.dedup();
        includes
    }
}

impl ExtractReferenceExpansionFromContext<'_> for User {}
