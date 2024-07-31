use async_graphql::{Context, Object};
use mangadex_api_input_types::api_client::{
    create::ApiClientCreateParams, delete::ApiClientDeleteParam, edit::ApiClientEditParam,
};
use mangadex_api_schema_rust::{v5::ApiClientAttributes, ApiObjectNoRelationships};
use uuid::Uuid;

use crate::Result;
use crate::{
    objects::api_client::ApiClient,
    utils::{
        get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_watches_from_graphql_context, watch::SendData,
    },
};

#[derive(Debug, Clone, Copy)]
pub struct ApiClientMutation;

#[Object]
impl ApiClientMutation {
    pub async fn create(
        &self,
        ctx: &Context<'_>,
        params: ApiClientCreateParams,
    ) -> Result<ApiClient> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let data: ApiObjectNoRelationships<ApiClientAttributes> =
            params.send(&client).await?.data.into();
        let data: ApiClient = data.into();
        let _ = watches.api_client.send_data(data.clone());
        Ok(data)
    }
    pub async fn edit(&self, ctx: &Context<'_>, params: ApiClientEditParam) -> Result<ApiClient> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let data: ApiObjectNoRelationships<ApiClientAttributes> =
            params.send(&client).await?.data.into();
        let data: ApiClient = data.into();
        let _ = watches.api_client.send_data(data.clone());
        Ok(data)
    }
    pub async fn delete(&self, ctx: &Context<'_>, params: ApiClientDeleteParam) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        params.send(&client).await?;
        Ok(true)
    }
    pub async fn regenerate_secret(&self, ctx: &Context<'_>, id: Uuid) -> Result<String> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        Ok(client.client().id(id).secret().post().send().await?.data)
    }
}
