use std::ops::{Add, Deref};

use crate::{
    Result,
    utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
};
use async_graphql::{Context, Object};
use mangadex_api::MangaDexClient;
use mangadex_api_schema_rust::v5::oauth::ClientInfo;
use mangadex_api_types_rust::{Password, Username};
use tauri::async_runtime::JoinHandle;
use tokio::time::{Duration, Instant};

use crate::{
    objects::user::User,
    store::types::{
        ExtractFromStore, StoreCrud,
        structs::{client_info::ClientInfoStore, refresh_token::RefreshTokenStore},
    },
    utils::{
        get_last_time_token_when_fetched, get_mangadex_client_from_graphql_context, get_store,
        get_watches_from_graphql_context,
        watch::{SendData, Watches},
    },
};

#[derive(Debug, Clone, Copy)]
pub struct OauthMutations;

impl OauthMutations {
    pub fn refetch_me_data(watches: Watches, client: MangaDexClient) -> JoinHandle<()> {
        tauri::async_runtime::spawn(async move {
            if let Ok(res) = client.user().me().get().send().await {
                let data: User = res.data.into();
                let _ = watches.user_me.send_data(data);
            }
        })
    }
}

#[Object]
impl OauthMutations {
    pub async fn login(
        &self,
        ctx: &Context<'_>,
        username: Username,
        password: Password,
    ) -> Result<bool> {
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .login()
            .await;
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        match client
            .oauth()
            .login()
            .username(username)
            .password(password)
            .send()
            .await
        {
            Ok(res) => {
                Self::refetch_me_data(watches.deref().clone(), client.deref().clone()).await?;
                get_last_time_token_when_fetched::<tauri::Wry>(ctx)?
                    .replace(Instant::now().add(Duration::from_secs(res.expires_in as u64)))
                    .await;
                {
                    let store = get_store::<tauri::Wry>(ctx)?;
                    let store_write = store.write().await;
                    let rf_token_store: RefreshTokenStore = res.into();
                    rf_token_store.insert_and_save(&store_write)?;
                    let _ = watches.is_logged.send_data(true);
                }
                Ok(true)
            }
            Err(e) => {
                let _ = watches.is_logged.send_data(false);
                Err(e.into())
            }
        }
    }
    pub async fn refresh(&self, ctx: &Context<'_>) -> Result<bool> {
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .refresh()
            .await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        if let Ok(res) = client.oauth().refresh().send().await {
            Self::refetch_me_data(watches.deref().clone(), client.deref().clone()).await?;
            {
                get_last_time_token_when_fetched::<tauri::Wry>(ctx)?
                    .replace(Instant::now().add(Duration::from_secs(res.expires_in as u64)))
                    .await;
                let _ = watches.is_logged.send_data(true);
            }
            Ok(true)
        } else {
            let _ = watches.is_logged.send_data(false);
            Ok(false)
        }
    }
    pub async fn set_client_info(
        &self,
        ctx: &Context<'_>,
        client_id: String,
        client_secret: String,
    ) -> Result<bool> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client_info = ClientInfo {
            client_id,
            client_secret,
        };
        client.set_client_info(&client_info).await?;
        let store = get_store::<tauri::Wry>(ctx)?;
        {
            let store_write = store.write().await;
            let cis: ClientInfoStore = client_info.into();
            cis.insert_and_save(&store_write)?;
            watches.client_info.send_data(cis.inner())?;
        }
        Ok(true)
    }
    pub async fn clear_client_info(&self, ctx: &Context<'_>) -> Result<bool> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        client.clear_client_info().await?;
        let store = get_store::<tauri::Wry>(ctx)?;
        {
            let store_write = store.write().await;
            ClientInfoStore::extract_from_store(&store_write)?.delete_and_save(&store_write)?;
            watches.client_info.send_data(None)?;
        }
        Ok(true)
    }
    pub async fn logout(&self, ctx: &Context<'_>) -> Result<bool> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        client.clear_auth_tokens().await?;
        get_last_time_token_when_fetched::<tauri::Wry>(ctx)?
            .clear()
            .await;
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_write = store.write().await;
        RefreshTokenStore::extract_from_store(&store_write)?.delete_and_save(&store_write)?;
        let _ = watches.is_logged.send_data(false);
        Ok(true)
    }
}
