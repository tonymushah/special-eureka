use crate::Result;
use async_graphql::{Context, Object};
use mangadex_api_input_types::api_client::list::ApiClientListParam;
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::{
    objects::{
        api_client::{lists::ApiClientResults, ApiClient},
        ExtractReferenceExpansion, ExtractReferenceExpansionFromContext,
    },
    utils::{
        get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_watches_from_graphql_context, watch::SendData,
    },
};

#[derive(Debug, Clone, Copy)]
pub struct ApiClientQueries;

#[Object]
impl ApiClientQueries {
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(default_with = "default_params()")] params: ApiClientListParam,
    ) -> Result<ApiClientResults> {
        let mut params: ApiClientListParam = params;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        params.includes = <ApiClientResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        let res: ApiClientResults = params.send(&client).await?.into();
        res.iter().for_each(|data| {
            let _ = watches.api_client.send_data(data.clone());
        });
        Ok(res)
    }
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<ApiClient> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
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
        let res: ApiClient = client
            .client()
            .id(id)
            .get()
            .includes(includes)
            .send()
            .await?
            .data
            .into();
        let _ = watches.api_client.send_data(res.clone());
        Ok(res)
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
