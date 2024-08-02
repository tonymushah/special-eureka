use crate::Result;
use async_graphql::{Context, Object};

use crate::{objects::oauth::ClientInfo, utils::get_mangadex_client_from_graphql_context};

#[derive(Debug, Clone, Copy)]
pub struct OauthQueries;

#[Object]
impl OauthQueries {
    pub async fn get_client_info(&self, ctx: &Context<'_>) -> Result<Option<ClientInfo>> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        Ok(client
            .get_client_info()
            .await
            .ok()
            .map(|info| -> ClientInfo { info.into() }))
    }
}
