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
    v5::{MangaAttributes, MangaObject as MangaData, Relationship},
    ApiObjectNoRelationships,
};
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::query::manga::get_unique::MangaGetUniqueQueries;

use self::{attributes::GraphQLMangaAttributes, relationships::MangaRelationships};

use super::{
    ExtractReferenceExpansion, ExtractReferenceExpansionFromContext, ExtractRelationships,
    GetAttributes, GetId,
};

#[derive(Clone, Debug)]
pub enum MangaObject {
    WithRel(MangaData),
    WithoutRel(ApiObjectNoRelationships<MangaAttributes>),
}

impl GetId for MangaObject {
    fn get_id(&self) -> Uuid {
        match self {
            MangaObject::WithRel(e) => e.id,
            MangaObject::WithoutRel(e) => e.id,
        }
    }
}

impl From<MangaObject> for MangaAttributes {
    fn from(value: MangaObject) -> Self {
        match value {
            MangaObject::WithRel(e) => e.attributes,
            MangaObject::WithoutRel(e) => e.attributes,
        }
    }
}

impl From<&MangaObject> for MangaAttributes {
    fn from(value: &MangaObject) -> Self {
        match value {
            MangaObject::WithRel(e) => e.attributes.clone(),
            MangaObject::WithoutRel(e) => e.attributes.clone(),
        }
    }
}

impl GetAttributes for MangaObject {
    type Attributes = GraphQLMangaAttributes;
    fn get_attributes(&self) -> Self::Attributes {
        Into::<MangaAttributes>::into(self).into()
    }
}

impl ExtractRelationships for MangaObject {
    fn get_relationships(&self) -> Option<Vec<Relationship>> {
        match self {
            MangaObject::WithRel(o) => Some(o.relationships.clone()),
            MangaObject::WithoutRel(_) => None,
        }
    }
}

#[Object]
impl MangaObject {
    pub async fn id(&self) -> Uuid {
        self.get_id()
    }
    pub async fn attributes(&self) -> GraphQLMangaAttributes {
        self.get_attributes()
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
            MangaObject::WithoutRel(o) => Ok(MangaRelationships {
                id: o.id,
                relationships: MangaGetUniqueQueries {
                    id: o.id,
                    includes: <Self as ExtractReferenceExpansionFromContext>::exctract(ctx),
                }
                .get(ctx)
                .await?
                .get_relationships()
                .ok_or(crate::Error::EmptyRelationshipTable)?,
            }),
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
