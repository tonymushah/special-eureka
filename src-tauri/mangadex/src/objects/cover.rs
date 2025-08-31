use async_graphql::{Context, Error, Object, Result as GraphQLResult};
use mangadex_api_schema_rust::{
    ApiObjectNoRelationships,
    v5::{CoverAttributes as Attributes, CoverObject},
};
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::query::cover::get_unique::CoverGetUniqueQuery;

use self::{attributes::CoverAttributes, relationships::CoverRelationships};

use super::{
    ExtractReferenceExpansion, ExtractReferenceExpansionFromContext, ExtractRelationships,
    GetAttributes, GetId,
};

pub mod attributes;
pub mod lists;
pub mod relationships;

#[derive(Clone, Debug)]
pub enum Cover {
    WithRelationship(CoverObject),
    WithoutRelationship(ApiObjectNoRelationships<Attributes>),
}

impl From<CoverObject> for Cover {
    fn from(value: CoverObject) -> Self {
        Self::WithRelationship(value)
    }
}

impl From<ApiObjectNoRelationships<Attributes>> for Cover {
    fn from(value: ApiObjectNoRelationships<Attributes>) -> Self {
        Self::WithoutRelationship(value)
    }
}

impl GetId for Cover {
    fn get_id(&self) -> Uuid {
        match self {
            Cover::WithRelationship(i) => i.id,
            Cover::WithoutRelationship(i) => i.id,
        }
    }
}

impl From<Cover> for Attributes {
    fn from(value: Cover) -> Self {
        match value {
            Cover::WithRelationship(i) => i.attributes,
            Cover::WithoutRelationship(i) => i.attributes,
        }
    }
}

impl From<&Cover> for Attributes {
    fn from(value: &Cover) -> Self {
        match value {
            Cover::WithRelationship(i) => i.attributes.clone(),
            Cover::WithoutRelationship(i) => i.attributes.clone(),
        }
    }
}

impl GetAttributes for Cover {
    type Attributes = CoverAttributes;
    fn get_attributes(&self) -> Self::Attributes {
        Into::<Attributes>::into(self).into()
    }
}

impl ExtractRelationships for Cover {
    fn get_relationships(&self) -> Option<Vec<mangadex_api_schema_rust::v5::Relationship>> {
        match self {
            Cover::WithRelationship(o) => Some(o.relationships.clone()),
            Cover::WithoutRelationship(_) => None,
        }
    }
}

#[Object]
impl Cover {
    pub async fn id(&self) -> Uuid {
        self.get_id()
    }
    pub async fn attributes(&self) -> CoverAttributes {
        self.get_attributes()
    }
    pub async fn relationships(&self, ctx: &Context<'_>) -> GraphQLResult<CoverRelationships> {
        match self {
            Cover::WithRelationship(o) => Ok(o.relationships.clone().into()),
            Cover::WithoutRelationship(o) => CoverGetUniqueQuery { id: o.id }
                .get(ctx)
                .await?
                .get_relationships()
                .map(|rel| -> CoverRelationships { rel.into() })
                .ok_or(Error::new("Empty Relationship Table")),
        }
    }
}

impl ExtractReferenceExpansion<'_> for Cover {
    fn exctract(field: async_graphql::SelectionField<'_>) -> Vec<ReferenceExpansionResource> {
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        field.selection_set().for_each(|f| match f.name() {
            "manga" => {
                includes.push(ReferenceExpansionResource::Manga);
            }
            "user" => {
                includes.push(ReferenceExpansionResource::User);
            }
            _ => {}
        });
        includes.dedup();
        includes
    }
}

impl ExtractReferenceExpansionFromContext<'_> for Cover {}
