use async_graphql::{Context, Object, Result};
use mangadex_api_input_types::scanlation_group::list::ScanlationGroupListParams;
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::{
    objects::{
        scanlation_group::{lists::ScanlationGroupResults, ScanlationGroup},
        ExtractReferenceExpansion, ExtractReferenceExpansionFromContext,
    },
    utils::get_mangadex_client_from_graphql_context,
};

#[derive(Debug, Clone, Copy)]
pub struct ScanlationGroupQueries;

#[Object]
impl ScanlationGroupQueries {
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] mut params: ScanlationGroupListParams,
    ) -> Result<ScanlationGroupResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        params.includes =
            <ScanlationGroupResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        Ok(params.send(&client).await?.into())
    }
    pub async fn get_unique(&self, ctx: &Context<'_>, id: Uuid) -> Result<ScanlationGroup> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let includes: Vec<ReferenceExpansionResource> = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "relationships")
            .map(<ScanlationGroup as ExtractReferenceExpansion>::exctract)
            .unwrap_or_default();
        Ok(client
            .scanlation_group()
            .id(id)
            .get()
            .includes(includes)
            .send()
            .await?
            .data
            .into())
    }
}
