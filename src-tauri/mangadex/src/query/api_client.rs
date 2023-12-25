use async_graphql::{Context, Object, Result};
use mangadex_api_input_types::api_client::list::ApiClientListParam;
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::{
    objects::{
        api_client::{lists::ApiClientResults, ApiClient},
        ExtractReferenceExpansion, ExtractReferenceExpansionFromContext,
    },
    utils::get_mangadex_client_from_graphql_context_with_auth_refresh,
};

#[derive(Debug, Clone, Copy)]
pub struct ApiClientQueries;

#[Object]
impl ApiClientQueries {
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(default_with = "default_params()")] mut params: ApiClientListParam,
    ) -> Result<ApiClientResults> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        params.includes = <ApiClientResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        Ok(params.send(&client).await?.into())
    }
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<ApiClient> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        if let Some(rel) = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "relationships")
        {
            let mut out = <ApiClient as ExtractReferenceExpansion>::exctract(rel);
            includes.append(&mut out);
        }
        includes.dedup();
        Ok(client
            .client()
            .id(id)
            .get()
            .includes(includes)
            .send()
            .await?
            .data
            .into())
    }
}

fn default_params() -> ApiClientListParam {
    ApiClientListParam {
        limit: None,
        offset: None,
        state: None,
        name: None,
        includes: Default::default(),
    }
}
