use async_graphql::{Context, EmptyMutation, Object, Result};
use mangadex_api_input_types::cover::{edit::CoverEditParam, upload::CoverUploadParam};
use mangadex_api_schema_rust::{v5::CoverAttributes, ApiObjectNoRelationships};
use uuid::Uuid;

use crate::{objects::cover::Cover, utils::get_mangadex_client_from_graphql_context};

#[derive(Debug, Clone, Copy)]
pub struct CoverMutations;

#[Object]
impl CoverMutations {
    pub async fn upload(&self, ctx: &Context<'_>, params: CoverUploadParam) -> Result<Cover> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let data: ApiObjectNoRelationships<CoverAttributes> =
            params.send(&client).await?.body.data.into();
        Ok(data.into())
    }
    pub async fn edit(&self, ctx: &Context<'_>, params: CoverEditParam) -> Result<Cover> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let data: ApiObjectNoRelationships<CoverAttributes> =
            params.send(&client).await?.body.data.into();
        Ok(data.into())
    }
    pub async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<EmptyMutation> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let _ = client.cover().cover_id(id).delete().send().await?;
        Ok(EmptyMutation)
    }
    /// Work in progress
    pub async fn download(&self, ctx: &Context<'_>, id: Uuid) -> Result<Cover> {
        todo!()
    }
    pub async fn remove(&self, ctx: &Context<'_>, id: Uuid) -> Result<EmptyMutation> {
        todo!()
    }
}
