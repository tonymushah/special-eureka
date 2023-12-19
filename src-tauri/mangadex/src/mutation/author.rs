use async_graphql::{Context, EmptyMutation, Object, Result};
use mangadex_api_input_types::author::{create::AuthorCreateParams, edit::AuthorEditParams};
use mangadex_api_schema_rust::{v5::AuthorAttributes, ApiObjectNoRelationships};
use uuid::Uuid;

use crate::{objects::author::Author, utils::get_mangadex_client_from_graphql_context};

#[derive(Debug, Clone, Copy)]
pub struct AuthorMutations;

#[Object]
impl AuthorMutations {
    pub async fn create(&self, ctx: &Context<'_>, params: AuthorCreateParams) -> Result<Author> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let pre_res = params.send(&client).await?;
        let res: ApiObjectNoRelationships<AuthorAttributes> = pre_res.body.data.into();
        Ok(res.into())
    }
    pub async fn edit(&self, ctx: &Context<'_>, params: AuthorEditParams) -> Result<Author> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let pre_res = params.send(&client).await?;
        let res: ApiObjectNoRelationships<AuthorAttributes> = pre_res.body.data.into();
        Ok(res.into())
    }
    pub async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<EmptyMutation> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let _ = client.author().id(id).delete().send().await?;
        Ok(EmptyMutation)
    }
}
