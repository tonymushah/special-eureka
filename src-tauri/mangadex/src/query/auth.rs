use crate::Result;
use async_graphql::{Context, Object};

use crate::{
    objects::auth::check::AuthCheck,
    utils::get_mangadex_client_from_graphql_context_with_auth_refresh,
};

#[derive(Debug, Clone, Copy)]
pub struct AuthQuery;

#[Object]
impl AuthQuery {
    pub async fn check(&self, ctx: &Context<'_>) -> Result<AuthCheck> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        Ok(client.auth().check().get().send().await?.into())
    }
}
