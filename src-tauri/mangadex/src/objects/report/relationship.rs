use std::ops::{Deref, DerefMut};

use async_graphql::{Error, Object, Result};
use convert_case::{Case, Casing};
use mangadex_api_schema_rust::{
    v5::{Relationship, UserAttributes},
    ApiObjectNoRelationships,
};
use mangadex_api_types_rust::ReferenceExpansionResource;

use crate::objects::{user::User, ExtractReferenceExpansion, ExtractReferenceExpansionFromContext};

type Relationships = Vec<Relationship>;

#[derive(Debug, Clone)]
pub struct ReportRelationship(Relationships);

impl Deref for ReportRelationship {
    type Target = Relationships;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ReportRelationship {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

#[Object]
impl ReportRelationship {
    pub async fn user(&self) -> Result<User> {
        self.iter()
            .flat_map(|o| {
                <ApiObjectNoRelationships<UserAttributes> as TryFrom<Relationship>>::try_from(
                    o.clone(),
                )
            })
            .next()
            .map(|o| -> User { o.into() })
            .ok_or(Error::new("User Relationship not found"))
    }
}

impl ExtractReferenceExpansion<'_> for ReportRelationship {
    fn exctract(field: async_graphql::SelectionField<'_>) -> Vec<ReferenceExpansionResource> {
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        field.selection_set().for_each(|f| {
            if f.name().to_case(Case::Snake) == *"user" {
                includes.push(ReferenceExpansionResource::User);
            }
        });
        includes
    }
}

impl From<Relationships> for ReportRelationship {
    fn from(value: Relationships) -> Self {
        Self(value)
    }
}

impl From<ReportRelationship> for Relationships {
    fn from(value: ReportRelationship) -> Self {
        value.0
    }
}

impl ExtractReferenceExpansionFromContext<'_> for ReportRelationship {}
