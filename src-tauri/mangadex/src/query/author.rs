use std::ops::Deref;

use crate::{utils::math::divide::divide, Result};
use async_graphql::{Context, Object};
use mangadex_api_input_types::author::list::AuthorListParams;
use mangadex_api_schema_rust::v5::AuthorCollection;
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
        params: Option<AuthorListParams>,
    ) -> Result<AuthorResults> {
        let mut param: AuthorListParams = params.unwrap_or_else(list_default_params);
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let _watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let watches = _watches.deref().clone();
        param.includes = <AuthorResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        let params = if !param.author_ids.is_empty() {
            param
                .author_ids
                .chunks(100)
                .flat_map(|chunck| {
                    let mut param = param.clone();
                    param.author_ids = chunck.to_vec();

                    if param.limit.is_none() && !param.author_ids.is_empty() {
                        param.limit.replace(param.author_ids.len().try_into().ok()?);
                    }
                    Some(param)
                })
                .collect::<Vec<_>>()
        } else {
            let div_res = divide(param.limit.unwrap_or(10), 100);
            let mut all = (0..div_res.quot)
                .map(|d| {
                    let mut param = param.clone();
                    param.offset = Some(param.offset.unwrap_or_default() + d * 100);
                    param.limit = Some(100);
                    param
                })
                .collect::<Vec<_>>();
            all.push({
                let mut param = param.clone();
                param.offset = Some(param.offset.unwrap_or_default() + div_res.quot * 100);
                param.limit = Some(div_res.remainder);
                param
            });
            all
        };
        let mut results = Vec::<AuthorCollection>::new();
        for val in params {
            results.push(val.send(&client).await?);
        }
        let res: AuthorResults = results
            .into_iter()
            .fold(
                AuthorCollection {
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
