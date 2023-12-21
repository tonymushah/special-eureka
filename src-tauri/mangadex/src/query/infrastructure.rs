use async_graphql::{Context, Object, Result};

use crate::utils::get_mangadex_client_from_graphql_context;

#[derive(Debug, Clone, Copy)]
pub struct InfrastructureQueries;

#[Object]
impl InfrastructureQueries {
    pub async fn ping(&self, ctx: &Context<'_>) -> Result<bool> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        if let Err(_) = client.ping().get().send().await {
            Ok(false)
        } else {
            Ok(true)
        }
    }
}
