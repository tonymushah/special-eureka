use async_graphql::{Context, Error, Object, Result};
use mangadex_api_schema_rust::v5::oauth::ClientInfo;
use mangadex_api_types_rust::{Password, Username};
use tokio::time::{Duration, Instant};

use crate::utils::{get_last_time_token_when_fetched, get_mangadex_client_from_graphql_context};

#[derive(Debug, Clone, Copy)]
pub struct OauthMutations;

#[Object]
impl OauthMutations {
    pub async fn login(
        &self,
        ctx: &Context<'_>,
        username: Username,
        password: Password,
    ) -> Result<bool> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let res = client
            .oauth()
            .login()
            .username(username)
            .password(password)
            .send()
            .await?;
        {
            let last_time_fetched = get_last_time_token_when_fetched::<tauri::Wry>(ctx)?;
            let mut last_time_fetched_write = last_time_fetched.write().await;
            let _ = last_time_fetched_write.replace(
                Instant::now()
                    .checked_add(Duration::from_millis(res.expires_in as u64))
                    .ok_or(Error::new(
                        "Error on calculating the next time to fetch the token",
                    ))?,
            );
        }
        Ok(true)
    }
    pub async fn refresh(&self, ctx: &Context<'_>) -> Result<bool> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let res = client.oauth().refresh().send().await?;
        {
            let last_time_fetched = get_last_time_token_when_fetched::<tauri::Wry>(ctx)?;
            let mut last_time_fetched_write = last_time_fetched.write().await;
            let _ = last_time_fetched_write.replace(
                Instant::now()
                    .checked_add(Duration::from_millis(res.expires_in as u64))
                    .ok_or(Error::new(
                        "Error on calculating the next time to fetch the token",
                    ))?,
            );
        }
        Ok(true)
    }
    pub async fn set_client_info(
        &self,
        ctx: &Context<'_>,
        client_id: String,
        client_secret: String,
    ) -> Result<bool> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        client
            .set_client_info(&ClientInfo {
                client_id,
                client_secret,
            })
            .await?;
        Ok(true)
    }
    pub async fn clear_client_info(&self, ctx: &Context<'_>) -> Result<bool> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        client.clear_client_info().await?;
        Ok(true)
    }
}
