pub mod attributes;
pub mod lists;
pub mod relationships;

use async_graphql::{Context, Object, Result as GraphQLResult};
use mangadex_api_schema_rust::{
    v5::{AuthorAttributes as Attributes, AuthorObject},
    ApiObjectNoRelationships,
};
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::utils::get_mangadex_client_from_graphql_context;

use self::{attributes::AuthorAttributes, relationships::AuthorRelationships};

#[derive(Clone, Debug)]
pub enum Author {
    WithRel(AuthorObject),
    WithoutRel(Box<ApiObjectNoRelationships<Attributes>>),
}

impl From<AuthorObject> for Author {
    fn from(value: AuthorObject) -> Self {
        Self::WithRel(value)
    }
}

impl From<ApiObjectNoRelationships<Attributes>> for Author {
    fn from(value: ApiObjectNoRelationships<Attributes>) -> Self {
        Self::WithoutRel(Box::new(value))
    }
}

#[Object]
impl Author {
    pub async fn id(&self) -> Uuid {
        match self {
            Author::WithRel(o) => o.id,
            Author::WithoutRel(o) => o.id,
        }
    }
    pub async fn attributes(&self) -> AuthorAttributes {
        match self {
            Author::WithRel(o) => o.attributes.clone().into(),
            Author::WithoutRel(o) => o.attributes.clone().into(),
        }
    }
    pub async fn relationships(&self, ctx: &Context<'_>) -> GraphQLResult<AuthorRelationships> {
        match self {
            Author::WithRel(o) => Ok(o.relationships.clone().into()),
            Author::WithoutRel(o) => {
                let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
                let mut req = client.author().id(o.id).get();
                let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
                ctx.field().selection_set().for_each(|f| match f.name() {
                    "works" => {
                        includes.push(ReferenceExpansionResource::Manga);
                    }
                    _ => {}
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
