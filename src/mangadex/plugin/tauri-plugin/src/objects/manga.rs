pub mod attributes;
pub mod links;
pub mod related;
pub mod relationships;

use async_graphql::{Context, Object, Result as GraphQLResult};
use mangadex_api_schema_rust::{
    v5::{MangaAttributes, MangaObject as MangaData},
    ApiObjectNoRelationships,
};
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::utils::get_mangadex_client_from_graphql_context;

use self::{attributes::GraphQLMangaAttributes, relationships::MangaRelationships};

#[derive(Clone)]
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
                let res = client
                    .manga()
                    .id(o.id)
                    .get()
                    .include(ReferenceExpansionResource::Artist)
                    .include(ReferenceExpansionResource::Manga)
                    .include(ReferenceExpansionResource::Author)
                    .include(ReferenceExpansionResource::Creator)
                    .include(ReferenceExpansionResource::CoverArt)
                    .send()
                    .await?;
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
