use async_graphql::{Context, Object};
use mangadex_api_input_types::author::{create::AuthorCreateParams, edit::AuthorEditParams};
use mangadex_api_schema_rust::{v5::AuthorAttributes, ApiObjectNoRelationships};
use uuid::Uuid;

use crate::Result;
use crate::{
    objects::author::Author,
    utils::{
        get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_watches_from_graphql_context, watch::SendData,
    },
};

#[derive(Debug, Clone, Copy)]
pub struct AuthorMutations;

#[Object]
impl AuthorMutations {
    pub async fn create(&self, ctx: &Context<'_>, params: AuthorCreateParams) -> Result<Author> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watcher = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let pre_res = params.send(&client).await?;
        let res: ApiObjectNoRelationships<AuthorAttributes> = pre_res.body.data.into();
        let data: Author = res.into();
        let _ = watcher.author.send_data(data.clone());
        Ok(data)
    }
    pub async fn edit(&self, ctx: &Context<'_>, params: AuthorEditParams) -> Result<Author> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watcher = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let pre_res = params.send(&client).await?;
        let res: ApiObjectNoRelationships<AuthorAttributes> = pre_res.body.data.into();
        let data: Author = res.into();
        let _ = watcher.author.send_data(data.clone());
        Ok(data)
    }
    pub async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let _ = client.author().id(id).delete().send().await?;
        Ok(true)
    }
}
