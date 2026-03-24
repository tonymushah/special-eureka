pub mod attributes;
pub mod lists;
pub mod relationships;

use async_graphql::{Context, Object};
use mangadex_api_schema_rust::{
    ApiObjectNoRelationships,
    v5::{AuthorAttributes as Attributes, AuthorObject},
};
use mangadex_api_types_rust::ReferenceExpansionResource;
use tokio::task::spawn_blocking;
use uuid::Uuid;

use crate::utils::{
    get_mangadex_client_from_graphql_context,
    traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
};

use self::{attributes::AuthorAttributes, relationships::AuthorRelationships};

use super::{
    ExtractReferenceExpansion, ExtractReferenceExpansionFromContext, GetAttributes, GetId,
};

#[derive(Clone, Debug)]
pub enum Author {
    WithRel(Box<AuthorObject>),
    WithoutRel(Box<ApiObjectNoRelationships<Attributes>>),
}

impl From<AuthorObject> for Author {
    fn from(value: AuthorObject) -> Self {
        Self::WithRel(Box::new(value))
    }
}

impl From<ApiObjectNoRelationships<Attributes>> for Author {
    fn from(value: ApiObjectNoRelationships<Attributes>) -> Self {
        Self::WithoutRel(Box::new(value))
    }
}

impl GetId for Author {
    fn get_id(&self) -> Uuid {
        match self {
            Author::WithRel(o) => o.id,
            Author::WithoutRel(o) => o.id,
        }
    }
}

impl From<Author> for Attributes {
    fn from(value: Author) -> Self {
        match value {
            Author::WithRel(o) => o.attributes,
            Author::WithoutRel(o) => o.attributes,
        }
    }
}

impl From<&Author> for Attributes {
    fn from(value: &Author) -> Self {
        match value {
            Author::WithRel(o) => o.attributes.clone(),
            Author::WithoutRel(o) => o.attributes.clone(),
        }
    }
}

impl GetAttributes for Author {
    type Attributes = AuthorAttributes;
    fn get_attributes(&self) -> Self::Attributes {
        Into::<Attributes>::into(self).into()
    }
}

#[Object]
#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl Author {
    pub async fn id(&self) -> Uuid {
        self.get_id()
    }
    pub async fn attributes(&self) -> AuthorAttributes {
        self.get_attributes()
    }

    // TODO add is_blocked field
    pub async fn is_blocked(&self, ctx: &Context<'_>) -> crate::error::wrapped::Result<bool> {
        let id = self.get_id();
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        Ok(spawn_blocking(move || -> crate::Result<_> {
            use diesel::prelude::*;
            use mangadex_blacklist_raw::schema::authors_artists::dsl::*;

            let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;

            Ok(diesel::select(diesel::dsl::exists(
                authors_artists.filter(author_id.eq(id.as_bytes())),
            ))
            .get_result(&mut connection)?)
        })
        .await??)
    }

    pub async fn relationships(
        &self,
        ctx: &Context<'_>,
    ) -> Result<AuthorRelationships, crate::ErrorWrapper> {
        match self {
            Author::WithRel(o) => Ok(o.relationships.clone().into()),
            Author::WithoutRel(o) => {
                let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
                let mut req = client.author().id(o.id).get();
                let mut includes: Vec<ReferenceExpansionResource> =
                    <Self as ExtractReferenceExpansionFromContext<'_>>::exctract(ctx);
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

impl ExtractReferenceExpansion<'_> for Author {
    fn exctract(field: async_graphql::SelectionField<'_>) -> Vec<ReferenceExpansionResource> {
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        field.selection_set().for_each(|f| {
            if f.name() == "works" {
                includes.push(ReferenceExpansionResource::Manga);
            }
        });
        includes
    }
}

impl ExtractReferenceExpansionFromContext<'_> for Author {}
