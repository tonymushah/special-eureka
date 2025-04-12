use std::ops::Deref;

use crate::{utils::math::divide::divide, Result};
use async_graphql::{Context, Object};
use mangadex_api_input_types::scanlation_group::list::ScanlationGroupListParams;
use mangadex_api_schema_rust::v5::GroupCollection;
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::{
    constants::MANGADEX_PAGE_LIMIT,
    objects::{
        scanlation_group::{lists::ScanlationGroupResults, ScanlationGroup},
        ExtractReferenceExpansion, ExtractReferenceExpansionFromContext,
    },
    utils::{
        get_mangadex_client_from_graphql_context, get_watches_from_graphql_context, watch::SendData,
    },
};

#[derive(Debug, Clone, Copy)]
pub struct ScanlationGroupQueries;

#[Object]
impl ScanlationGroupQueries {
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] params: ScanlationGroupListParams,
    ) -> Result<ScanlationGroupResults> {
        let mut param = params;
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        param.includes =
            <ScanlationGroupResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        let params = if !param.group_ids.is_empty() {
            param
                .group_ids
                .chunks(MANGADEX_PAGE_LIMIT.try_into()?)
                .flat_map(|chunck| {
                    let mut param = param.clone();
                    param.group_ids = chunck.to_vec();

                    if param.limit.is_none() && !param.group_ids.is_empty() {
                        param.limit.replace(param.group_ids.len().try_into().ok()?);
                    }
                    Some(param)
                })
                .collect::<Vec<_>>()
        } else {
            let div_res = divide(param.limit.unwrap_or(10), MANGADEX_PAGE_LIMIT);
            let mut all = (0..div_res.quot)
                .map(|d| {
                    let mut param = param.clone();
                    param.offset = Some(param.offset.unwrap_or_default() + d * MANGADEX_PAGE_LIMIT);
                    param.limit = Some(MANGADEX_PAGE_LIMIT);
                    param
                })
                .collect::<Vec<_>>();
            all.push({
                let mut param = param.clone();
                param.offset =
                    Some(param.offset.unwrap_or_default() + div_res.quot * MANGADEX_PAGE_LIMIT);
                param.limit = Some(div_res.remainder);
                param
            });
            all
        };
        let mut results = Vec::<GroupCollection>::new();
        for val in params {
            results.push(val.send(&client).await?);
        }
        let res: ScanlationGroupResults = results
            .into_iter()
            .fold(
                GroupCollection {
                    response: mangadex_api_types_rust::ResponseType::Collection,
                    offset: param.offset.unwrap_or_default(),
                    total: 0,
                    limit: 0,
                    data: Vec::new(),
                    result: mangadex_api_types_rust::ResultType::Ok,
                },
                |mut agg, mut res| {
                    agg.total = res.total;
                    agg.limit += res.limit;
                    agg.data.append(&mut res.data);
                    agg
                },
            )
            .into();
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
