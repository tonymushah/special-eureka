use async_graphql::{Context, Object, Result};
use mangadex_api_input_types::author::list::AuthorListParams;
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::{
    objects::author::{lists::AuthorResults, Author},
    utils::get_mangadex_client_from_graphql_context,
};

#[derive(Debug, Clone, Copy)]
pub struct AuthorQueries;

#[Object]
impl AuthorQueries {
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(default_with = "list_default_params()")] mut params: AuthorListParams,
    ) -> Result<AuthorResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let includes = &mut params.includes;
        includes.clear();
        if let Some(rel) = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "data")
            .and_then(|pf| pf.selection_set().find(|f| f.name() == "relationships"))
        {
            rel.selection_set().for_each(|f| match f.name() {
                "works" => {
                    includes.push(ReferenceExpansionResource::Manga);
                }
                _ => {}
            });
        }
        includes.dedup();
        Ok(params.send(&client).await?.into())
    }
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<Author> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        if let Some(rel) = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "relationships")
        {
            rel.selection_set().for_each(|f| match f.name() {
                "works" => {
                    includes.push(ReferenceExpansionResource::Manga);
                }
                _ => {}
            });
        }
        includes.dedup();
        Ok(client
            .author()
            .id(id)
            .get()
            .includes(includes)
            .send()
            .await?
            .data
            .into())
    }
}

fn list_default_params() -> AuthorListParams {
    AuthorListParams {
        limit: None,
        offset: None,
        author_ids: Vec::new(),
        name: None,
        order: None,
        includes: Vec::new(),
    }
}
