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

pub mod attributes;
pub mod lists;
pub mod pages;
pub mod relationships;

#[derive(Clone)]
pub enum Chapter {
    WithRelationship(ChapterObject),
    WithoutRelationship(ApiObjectNoRelationships<Attributes>),
}

impl From<ChapterObject> for Chapter {
    fn from(value: ChapterObject) -> Self {
        Self::WithRelationship(value)
    }
}

impl From<ApiObjectNoRelationships<Attributes>> for Chapter {
    fn from(value: ApiObjectNoRelationships<Attributes>) -> Self {
        Self::WithoutRelationship(value)
    }
}

#[Object]
impl Chapter {
    pub async fn id(&self) -> Uuid {
        match self {
            Chapter::WithRelationship(i) => i.id,
            Chapter::WithoutRelationship(i) => i.id,
        }
    }
    pub async fn attributes(&self) -> ChapterAttributes {
        match self {
            Chapter::WithRelationship(i) => i.attributes.clone().into(),
            Chapter::WithoutRelationship(i) => i.attributes.clone().into(),
        }
    }
    pub async fn relationships(&self, ctx: &Context<'_>) -> Result<ChapterRelationships> {
        match self {
            Chapter::WithRelationship(o) => Ok(o.relationships.clone().into()),
            Chapter::WithoutRelationship(o) => {
                let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
                let mut req = client.chapter().id(o.id).get();
                let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
                ctx.field().selection_set().for_each(|f| {
                    match f.name().to_case(Case::Snake).as_str() {
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
                    }
                });
                includes.dedup();
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
