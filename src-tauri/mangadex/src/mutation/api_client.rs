use async_graphql::{Context, EmptyMutation, Object, Result};
use mangadex_api_input_types::api_client::{
    create::ApiClientCreateParams, delete::ApiClientDeleteParam, edit::ApiClientEditParam,
};
use mangadex_api_schema_rust::{v5::ApiClientAttributes, ApiObjectNoRelationships};
use uuid::Uuid;

use crate::{
    objects::api_client::ApiClient,
    utils::get_mangadex_client_from_graphql_context_with_auth_refresh,
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
        let data: ApiObjectNoRelationships<ApiClientAttributes> =
            params.send(&client).await?.data.into();
        Ok(data.into())
    }
    pub async fn edit(&self, ctx: &Context<'_>, params: ApiClientEditParam) -> Result<ApiClient> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let data: ApiObjectNoRelationships<ApiClientAttributes> =
            params.send(&client).await?.data.into();
        Ok(data.into())
    }
    pub async fn delete(
        &self,
        ctx: &Context<'_>,
        params: ApiClientDeleteParam,
    ) -> Result<EmptyMutation> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        params.send(&client).await?;
        Ok(EmptyMutation)
    }
    pub async fn regenerate_secret(&self, ctx: &Context<'_>, id: Uuid) -> Result<String> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        Ok(client.client().id(id).secret().post().send().await?.data)
    }
}
