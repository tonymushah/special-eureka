use std::ops::Deref;

use crate::{utils::math::divide::divide, Result};
use async_graphql::{Context, Object};
use mangadex_api_input_types::user::list::UserListParam;
use mangadex_api_schema_rust::v5::UserCollection;
use uuid::Uuid;

use crate::{
    constants::MANGADEX_PAGE_LIMIT,
    objects::user::{lists::UserResults, User},
    utils::{
        get_mangadex_client_from_graphql_context,
        get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_watches_from_graphql_context, watch::SendData,
    },
};

// [ ] use [`crate::utils::splittable_param`]
#[derive(Clone, Copy, Debug, Default)]
pub struct UserQueries;

#[Object]
impl UserQueries {
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<User> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let data: User = client.user().id(id).get().send().await?.data.into();
        let _ = watches.user.send_data(data.clone());
        Ok(data)
    }
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        params: Option<UserListParam>,
    ) -> Result<UserResults> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let param = params.unwrap_or_default();
        let params = if !param.user_ids.is_empty() {
            param
                .user_ids
                .chunks(MANGADEX_PAGE_LIMIT.try_into()?)
                .flat_map(|chunck| {
                    let mut param = param.clone();
                    param.user_ids = chunck.to_vec();

                    if param.limit.is_none() && !param.user_ids.is_empty() {
                        param.limit.replace(param.user_ids.len().try_into().ok()?);
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
        let mut results = Vec::<UserCollection>::new();
        for val in params {
            results.push(val.send(&client).await?);
        }
        let res: UserResults = results
            .into_iter()
            .fold(
                UserCollection {
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
                let _ = watches.user.send_data(data);
            }
        });

        Ok(res)
    }
    pub async fn me(&self, ctx: &Context<'_>) -> Result<User> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let data: User = client.user().me().get().send().await?.data.into();
        let _ = watches.user_me.send_data(data.clone());
        Ok(data)
    }
}
