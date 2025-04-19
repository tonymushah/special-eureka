use std::ops::Deref;

use crate::{utils::splittable_param::SendSplitted, Result};
use async_graphql::{Context, Object};
use mangadex_api_input_types::user::list::UserListParam;
use uuid::Uuid;

use crate::{
    objects::user::{lists::UserResults, User},
    utils::{
        get_mangadex_client_from_graphql_context,
        get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_watches_from_graphql_context, watch::SendData,
    },
};

// [x] use [`crate::utils::splittable_param`]
#[derive(Clone, Copy, Debug, Default)]
pub struct UserQueries;

#[Object]
impl UserQueries {
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<User> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let data: User = client.user().id(id).get().send().await?.data.into();
        let _ = watches.user.send_data(data.clone());
        Ok(data)
    }
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        params: Option<UserListParam>,
    ) -> Result<UserResults> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let param = params.unwrap_or_default();
        let res: UserResults = param.send_splitted_default(&client).await?.into();
        let _res = res.clone();
        tauri::async_runtime::spawn(async move {
            for data in _res {
                let _ = watches.user.send_data(data);
            }
        });

        Ok(res)
    }
    pub async fn me(&self, ctx: &Context<'_>) -> Result<User> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let data: User = client.user().me().get().send().await?.data.into();
        let _ = watches.user_me.send_data(data.clone());
        Ok(data)
    }
}
