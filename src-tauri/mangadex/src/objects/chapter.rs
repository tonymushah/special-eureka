use async_graphql::{Context, Object, Result};
use convert_case::{Case, Casing};
use mangadex_api_schema_rust::{
    v5::{ChapterAttributes as Attributes, ChapterObject},
    ApiObjectNoRelationships,
};
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::utils::get_mangadex_client_from_graphql_context;

use self::{attributes::ChapterAttributes, relationships::ChapterRelationships};

use super::{
    ExtractReferenceExpansion, ExtractReferenceExpansionFromContext, GetAttributes, GetId,
};

pub mod attributes;
pub mod lists;
pub mod pages;
pub mod relationships;

#[derive(Clone, Debug)]
pub enum Chapter {
    WithRelationship(ChapterObject),
    WithoutRelationship(Box<ApiObjectNoRelationships<Attributes>>),
}

impl From<ChapterObject> for Chapter {
    fn from(value: ChapterObject) -> Self {
        Self::WithRelationship(value)
    }
}

impl From<ApiObjectNoRelationships<Attributes>> for Chapter {
    fn from(value: ApiObjectNoRelationships<Attributes>) -> Self {
        Self::WithoutRelationship(Box::new(value))
    }
}

impl GetId for Chapter {
    fn get_id(&self) -> Uuid {
        match self {
            Chapter::WithRelationship(i) => i.id,
            Chapter::WithoutRelationship(i) => i.id,
        }
    }
}

impl From<Chapter> for Attributes {
    fn from(value: Chapter) -> Self {
        match value {
            Chapter::WithRelationship(i) => i.attributes,
            Chapter::WithoutRelationship(i) => i.attributes,
        }
    }
}

impl From<&Chapter> for Attributes {
    fn from(value: &Chapter) -> Self {
        match value {
            Chapter::WithRelationship(i) => i.attributes.clone(),
            Chapter::WithoutRelationship(i) => i.attributes.clone(),
        }
    }
}

impl GetAttributes for Chapter {
    type Attributes = ChapterAttributes;
    fn get_attributes(&self) -> Self::Attributes {
        Into::<Attributes>::into(self).into()
    }
}

#[Object]
impl Chapter {
    pub async fn id(&self) -> Uuid {
        self.get_id()
    }
    pub async fn attributes(&self) -> ChapterAttributes {
        self.get_attributes()
    }
    pub async fn relationships(&self, ctx: &Context<'_>) -> Result<ChapterRelationships> {
        match self {
            Chapter::WithRelationship(o) => Ok(o.relationships.clone().into()),
            Chapter::WithoutRelationship(o) => {
                let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
                let mut req = client.chapter().id(o.id).get();
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

impl ExtractReferenceExpansion<'_> for Chapter {
    fn exctract(field: async_graphql::SelectionField<'_>) -> Vec<ReferenceExpansionResource> {
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        field
            .selection_set()
            .for_each(|f| match f.name().to_case(Case::Snake).as_str() {
                "manga" => {
                    includes.push(ReferenceExpansionResource::Manga);
                }
                "scanlation_groups" => {
                    includes.push(ReferenceExpansionResource::ScanlationGroup);
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

impl ExtractReferenceExpansionFromContext<'_> for Chapter {}
