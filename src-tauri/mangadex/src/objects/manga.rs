pub mod aggregate;
pub mod attributes;
pub mod links;
pub mod lists;
pub mod manga_reading_status;
pub mod related;
pub mod relationships;

use async_graphql::{Context, Object, Result as GraphQLResult};
use convert_case::{Case, Casing};
use mangadex_api_schema_rust::{
    v5::{MangaAttributes, MangaObject as MangaData},
    ApiObjectNoRelationships,
};
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::utils::get_mangadex_client_from_graphql_context;

use self::{attributes::GraphQLMangaAttributes, relationships::MangaRelationships};

use super::{ExtractReferenceExpansion, ExtractReferenceExpansionFromContext};

#[derive(Clone, Debug)]
pub enum MangaObject {
    WithRel(MangaData),
    WithoutRel(ApiObjectNoRelationships<MangaAttributes>),
}

#[Object]
impl MangaObject {
    pub async fn id(&self) -> Uuid {
        match self {
            MangaObject::WithRel(e) => e.id,
            MangaObject::WithoutRel(e) => e.id,
        }
    }
    pub async fn attributes(&self) -> GraphQLMangaAttributes {
        match self {
            MangaObject::WithRel(e) => e.attributes.clone().into(),
            MangaObject::WithoutRel(e) => e.attributes.clone().into(),
        }
    }
    pub async fn relationships<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> GraphQLResult<MangaRelationships> {
        match self {
            MangaObject::WithRel(o) => Ok(MangaRelationships {
                id: o.id,
                relationships: o.relationships.clone(),
            }),
            MangaObject::WithoutRel(o) => {
                let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
                let mut req = client.manga().id(o.id).get();
                let includes = <Self as ExtractReferenceExpansionFromContext>::exctract(ctx);
                let res = req.includes(includes).send().await?;
                Ok(MangaRelationships {
                    id: res.data.id,
                    relationships: res.data.relationships,
                })
            }
        }
    }
}

impl From<MangaData> for MangaObject {
    fn from(value: MangaData) -> Self {
        Self::WithRel(value)
    }
}

impl From<ApiObjectNoRelationships<MangaAttributes>> for MangaObject {
    fn from(value: ApiObjectNoRelationships<MangaAttributes>) -> Self {
        Self::WithoutRel(value)
    }
}

impl ExtractReferenceExpansion<'_> for MangaObject {
    fn exctract(field: async_graphql::SelectionField<'_>) -> Vec<ReferenceExpansionResource> {
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        field
            .selection_set()
            .for_each(|f| match f.name().to_case(Case::Snake).as_str() {
                "manga" => {
                    includes.push(ReferenceExpansionResource::Manga);
                }
                "cover_art" => {
                    includes.push(ReferenceExpansionResource::CoverArt);
                }
                "authors" => {
                    includes.push(ReferenceExpansionResource::Author);
                }
                "artists" => {
                    includes.push(ReferenceExpansionResource::Artist);
                }
                "author_artists" => {
                    includes.push(ReferenceExpansionResource::Author);
                    includes.push(ReferenceExpansionResource::Artist);
                }
                "creator" => {
                    includes.push(ReferenceExpansionResource::Creator);
                }
                _ => {}
            });
        includes.dedup();
        includes
    }
}

impl ExtractReferenceExpansionFromContext<'_> for MangaObject {}
