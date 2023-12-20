use async_graphql::{Context, InputObject, Object, Result};
use mangadex_api::MangaDexClient;
use mangadex_api_input_types::custom_list::get_user_lists::UserCustomListParams;
use mangadex_api_schema_rust::v5::CustomListListResponse;
use mangadex_api_types_rust::error::Result as MDResult;
use uuid::Uuid;

use crate::{
    objects::custom_list::{lists::CustomListResults, CustomList},
    utils::get_mangadex_client_from_graphql_context,
};

#[derive(Debug, Clone, Copy)]
pub struct CustomListQueries;

#[Object]
impl CustomListQueries {
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<CustomList> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        Ok(client.custom_list().id(id).get().send().await?.data.into())
    }
    pub async fn current_logged_lists(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] params: CurrentLoggedLists,
    ) -> Result<CustomListResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        Ok(params.send(&client).await?.into())
    }
    pub async fn get_user_lists(
        &self,
        ctx: &Context<'_>,
        params: UserCustomListParams,
    ) -> Result<CustomListResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        Ok(params.send(&client).await?.into())
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
