use std::ops::Deref;

use async_graphql::{Context, Object, Result};
use mangadex_api_input_types::author::list::AuthorListParams;
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::{
    objects::{
        author::{lists::AuthorResults, Author},
        ExtractReferenceExpansion, ExtractReferenceExpansionFromContext,
    },
    utils::{
        get_mangadex_client_from_graphql_context, get_watches_from_graphql_context, watch::SendData,
    },
};

#[derive(Debug, Clone, Copy)]
pub struct AuthorQueries;

#[Object]
impl AuthorQueries {
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(default_with = "list_default_params()")] params: AuthorListParams,
    ) -> Result<AuthorResults> {
        let mut params: AuthorListParams = params;
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let _watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let watches = _watches.deref().clone();
        params.includes = <AuthorResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        let res: AuthorResults = params.send(&client).await?.into();
        let _res = res.clone();
        tauri::async_runtime::spawn(async move {
            _res.iter().for_each(|i| {
                let _ = watches.author.send_data(i.clone());
            });
        });
        Ok(res)
    }
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<Author> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        if let Some(rel) = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "relationships")
        {
            let mut out = <Author as ExtractReferenceExpansion>::exctract(rel);
            includes.append(&mut out);
        }
        includes.dedup();
        let data: Author = client
            .author()
            .id(id)
            .get()
            .includes(includes)
            .send()
            .await?
            .data
            .into();
        let _ = watches.author.send_data(data.clone());
        Ok(data)
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
