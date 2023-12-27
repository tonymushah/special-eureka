use async_graphql::{Context, Object, Result};
use mangadex_api_input_types::user::list::UserListParam;
use uuid::Uuid;

use crate::{
    objects::user::{lists::UserResults, User},
    utils::{
        get_mangadex_client_from_graphql_context,
        get_mangadex_client_from_graphql_context_with_auth_refresh,
    },
};

#[derive(Clone, Copy, Debug, Default)]
pub struct UserQueries;

#[Object]
impl UserQueries {
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<User> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        Ok(client.user().id(id).get().send().await?.data.into())
    }
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] params: UserListParam,
    ) -> Result<UserResults> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        Ok(params.send(&client).await?.into())
    }
    pub async fn me(&self, ctx: &Context<'_>) -> Result<User> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        Ok(client.user().me().get().send().await?.data.into())
    }
}
