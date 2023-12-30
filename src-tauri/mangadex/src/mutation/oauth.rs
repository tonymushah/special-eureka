use std::ops::Add;

use async_graphql::{Context, Object, Result};
use mangadex_api_schema_rust::v5::oauth::ClientInfo;
use mangadex_api_types_rust::{Password, Username};
use tokio::time::{Duration, Instant};

use crate::{
    store::types::{
        structs::{client_info::ClientInfoStore, refresh_token::RefreshTokenStore},
        ExtractFromStore, StoreCrud,
    },
    utils::{
        get_last_time_token_when_fetched, get_mangadex_client_from_graphql_context, get_store,
    },
};

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
            let _ = last_time_fetched_write
                .replace(Instant::now().add(Duration::from_secs(res.expires_in as u64)));
        }
        let mut store = get_store::<tauri::Wry>(ctx).await?;
        let rf_token_store: RefreshTokenStore = res.into();
        rf_token_store.insert_and_save(&mut store)?;
        Ok(true)
    }
    pub async fn refresh(&self, ctx: &Context<'_>) -> Result<bool> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let res = client.oauth().refresh().send().await?;
        {
            let last_time_fetched = get_last_time_token_when_fetched::<tauri::Wry>(ctx)?;
            let mut last_time_fetched_write = last_time_fetched.write().await;
            let _ = last_time_fetched_write
                .replace(Instant::now().add(Duration::from_secs(res.expires_in as u64)));
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
        let client_info = ClientInfo {
            client_id,
            client_secret,
        };
        client.set_client_info(&client_info).await?;
        let mut store = get_store::<tauri::Wry>(ctx).await?;
        let cis: ClientInfoStore = client_info.into();
        cis.insert_and_save(&mut store)?;
        Ok(true)
    }
    pub async fn clear_client_info(&self, ctx: &Context<'_>) -> Result<bool> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        client.clear_client_info().await?;
        let mut store = get_store::<tauri::Wry>(ctx).await?;
        ClientInfoStore::extract_from_store(&store)?.delete_and_save(&mut store)?;
        Ok(true)
    }
}
