use std::ops::Deref;

use async_graphql::{Context, InputObject, Object};
use mangadex_api::MangaDexClient;
use mangadex_api_input_types::custom_list::get_user_lists::UserCustomListParams;
use mangadex_api_schema_rust::v5::CustomListListResponse;
use uuid::Uuid;

use crate::{
    objects::custom_list::{CustomList, lists::CustomListResults},
    utils::{
        get_mangadex_client_from_graphql_context,
        get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_watches_from_graphql_context, watch::SendData,
    },
};

#[derive(Debug, Clone, Copy)]
pub struct CustomListQueries;

#[Object]
#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl CustomListQueries {
    pub async fn get(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        private: Option<bool>,
    ) -> crate::error::wrapped::Result<CustomList> {
        let private = private.unwrap_or_default();
        let client = if private {
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?
        } else {
            get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?
        };
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let data: CustomList = client
            .custom_list()
            .id(id)
            .get()
            .with_auth(private)
            .send()
            .await?
            .data
            .into();
        let _ = watches.custom_list.send_data(data.clone());
        Ok(data)
    }
    pub async fn current_logged_lists(
        &self,
        ctx: &Context<'_>,
        params: Option<CurrentLoggedLists>,
    ) -> crate::error::wrapped::Result<CustomListResults> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        let res: CustomListResults = params.unwrap_or_default().send(&client).await?.into();
        {
            let _res = res.clone();
            tauri::async_runtime::spawn(async move {
                for data in _res {
                    let _ = watches.custom_list.send_data(data);
                }
            });
        }
        Ok(res)
    }
    pub async fn get_user_lists(
        &self,
        ctx: &Context<'_>,
        params: UserCustomListParams,
    ) -> crate::error::wrapped::Result<CustomListResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        let res: CustomListResults = params.send(&client).await?.into();
        {
            let _res = res.clone();
            tauri::async_runtime::spawn(async move {
                for data in _res {
                    let _ = watches.custom_list.send_data(data);
                }
            });
        }
        Ok(res)
    }
    pub async fn get_custom_list_batch(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1))] ids: Vec<Uuid>,
        private: Option<bool>,
    ) -> crate::error::wrapped::Result<Vec<CustomList>> {
        let mut lists = Vec::with_capacity(ids.len());
        for id in ids {
            lists.push(self.get(ctx, id, private).await?);
        }
        lists.shrink_to_fit();
        Ok(lists)
    }
}

#[derive(Debug, Clone, Default, InputObject)]
pub struct CurrentLoggedLists {
    offset: Option<u32>,
    limit: Option<u32>,
}

impl CurrentLoggedLists {
    pub async fn send(self, client: &MangaDexClient) -> CustomListListResponse {
        let mut req = client.user().list().get();
        if let Some(offset) = self.offset {
            req.offset(offset);
        }
        if let Some(limit) = self.limit {
            req.limit(limit);
        }
        req.send().await
    }
}
