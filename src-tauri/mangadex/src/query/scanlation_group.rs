use std::ops::Deref;

use crate::{utils::splittable_param::SendSplitted, Result};
use async_graphql::{Context, Object};
use mangadex_api_input_types::scanlation_group::list::ScanlationGroupListParams;
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::{
    objects::{
        scanlation_group::{lists::ScanlationGroupResults, ScanlationGroup},
        ExtractReferenceExpansion, ExtractReferenceExpansionFromContext,
    },
    utils::{
        get_mangadex_client_from_graphql_context, get_watches_from_graphql_context, watch::SendData,
    },
};

// [x] use [`crate::utils::splittable_param`]
#[derive(Debug, Clone, Copy)]
pub struct ScanlationGroupQueries;

#[Object]
impl ScanlationGroupQueries {
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        params: Option<ScanlationGroupListParams>,
    ) -> Result<ScanlationGroupResults> {
        let mut param = params.unwrap_or_default();
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        param.includes =
            <ScanlationGroupResults as ExtractReferenceExpansionFromContext>::exctract(ctx);

        let res: ScanlationGroupResults = param.send_splitted_default(&client).await?.into();
        let _res = res.clone();
        tauri::async_runtime::spawn(async move {
            for data in _res {
                let _ = watches.scanlation_group.send_data(data);
            }
        });
        Ok(res)
    }
    pub async fn get_unique(&self, ctx: &Context<'_>, id: Uuid) -> Result<ScanlationGroup> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let includes: Vec<ReferenceExpansionResource> = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "relationships")
            .map(<ScanlationGroup as ExtractReferenceExpansion>::exctract)
            .unwrap_or_default();
        let data: ScanlationGroup = client
            .scanlation_group()
            .id(id)
            .get()
            .includes(includes)
            .send()
            .await?
            .data
            .into();
        let _ = watches.scanlation_group.send_data(data.clone());
        Ok(data)
    }
}
