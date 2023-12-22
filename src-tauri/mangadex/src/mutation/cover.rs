use async_graphql::{Context, EmptyMutation, Error, Object, Result};
use mangadex_api_input_types::cover::{edit::CoverEditParam, upload::CoverUploadParam};
use mangadex_api_schema_rust::{v5::CoverAttributes, ApiObjectNoRelationships};
use uuid::Uuid;

use crate::{
    objects::cover::Cover,
    query::cover::CoverQueries,
    utils::{get_mangadex_client_from_graphql_context, get_offline_app_state},
};

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
    pub async fn download(&self, ctx: &Context<'_>, id: Uuid) -> Result<Cover> {
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let mut offline_app_state_write = ola.write().await;
        let olasw = offline_app_state_write
            .as_mut()
            .ok_or(Error::new("Offline AppState Not loaded"))?;
        olasw.cover_download(id).download(olasw).await?;
        CoverQueries.get(ctx, id).await
    }
    pub async fn remove(&self, ctx: &Context<'_>, id: Uuid) -> Result<EmptyMutation> {
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let mut offline_app_state_write = ola.write().await;
        let olasw = offline_app_state_write
            .as_mut()
            .ok_or(Error::new("Offline AppState Not loaded"))?;
        olasw.cover_utils().with_id(id).delete()?;
        Ok(EmptyMutation)
    }
}
