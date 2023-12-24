use async_graphql::{Context, Object, Result as GraphQLResult};
use mangadex_api_schema_rust::{
    v5::{CoverAttributes as Attributes, CoverObject},
    ApiObjectNoRelationships,
};
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::utils::get_mangadex_client_from_graphql_context;

use self::{attributes::CoverAttributes, relationships::CoverRelationships};

use super::{ExtractReferenceExpansion, ExtractReferenceExpansionFromContext};

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

#[Object]
impl Cover {
    pub async fn id(&self) -> Uuid {
        match self {
            Cover::WithRelationship(i) => i.id,
            Cover::WithoutRelationship(i) => i.id,
        }
    }
    pub async fn attributes(&self) -> CoverAttributes {
        match self {
            Cover::WithRelationship(i) => i.attributes.clone().into(),
            Cover::WithoutRelationship(i) => i.attributes.clone().into(),
        }
    }
    pub async fn relationships(&self, ctx: &Context<'_>) -> GraphQLResult<CoverRelationships> {
        match self {
            Cover::WithRelationship(o) => Ok(o.relationships.clone().into()),
            Cover::WithoutRelationship(o) => {
                let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
                let mut req = client.cover().cover_id(o.id).get();
                let includes = <Self as ExtractReferenceExpansionFromContext<'_>>::exctract(ctx);
                Ok(req
                    .includes(includes)
                    .send()
                    .await?
                    .data
                    .relationships
                    .into())
            }
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
