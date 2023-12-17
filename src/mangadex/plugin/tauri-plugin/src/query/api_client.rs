use async_graphql::{Context, Object, Result};
use mangadex_api_input_types::api_client::list::ApiClientListParam;
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::{
    objects::api_client::{lists::ApiClientResults, ApiClient},
    utils::get_mangadex_client_from_graphql_context,
};

#[derive(Debug, Clone, Copy)]
pub struct ApiClientQuery;

#[Object]
impl ApiClientQuery {
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(default_with = "default_params()")] mut params: ApiClientListParam,
    ) -> Result<ApiClientResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        params.includes.clear();
        if let Some(rel) = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "data")
            .and_then(|pf| pf.selection_set().find(|f| f.name() == "relationships"))
        {
            rel.selection_set().for_each(|f| match f.name() {
                "creator" => {
                    params.includes.push(ReferenceExpansionResource::Creator);
                }
                _ => {}
            });
        }
        params.includes.dedup();
        Ok(params.send(&*client).await?.into())
    }
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<ApiClient> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        if let Some(rel) = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "relationships")
        {
            rel.selection_set().for_each(|f| match f.name() {
                "creator" => {
                    includes.push(ReferenceExpansionResource::Creator);
                }
                _ => {}
            });
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
