use async_graphql::{Context, EmptyMutation, Object, Result};
use mangadex_api_schema_rust::v5::oauth::ClientInfo;
use mangadex_api_types_rust::{Password, Username};

use crate::utils::get_mangadex_client_from_graphql_context;

#[derive(Debug, Clone, Copy)]
pub struct OauthMutations;

#[Object]
impl OauthMutations {
    pub async fn login(
        &self,
        ctx: &Context<'_>,
        username: Username,
        password: Password,
    ) -> Result<EmptyMutation> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let _res = client
            .oauth()
            .login()
            .username(username)
            .password(password)
            .send()
            .await?;
        Ok(EmptyMutation)
    }
    pub async fn refresh(&self, ctx: &Context<'_>) -> Result<EmptyMutation> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let _res = client.oauth().refresh().send().await?;
        Ok(EmptyMutation)
    }
    pub async fn set_client_info(
        &self,
        ctx: &Context<'_>,
        client_id: String,
        client_secret: String,
    ) -> Result<EmptyMutation> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        client
            .set_client_info(&ClientInfo {
                client_id,
                client_secret,
            })
            .await?;
        Ok(EmptyMutation)
    }
    pub async fn clear_client_info(&self, ctx: &Context<'_>) -> Result<EmptyMutation> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        client.clear_client_info().await?;
        Ok(EmptyMutation)
    }
}
