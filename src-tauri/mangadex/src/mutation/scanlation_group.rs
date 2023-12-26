use async_graphql::{Context, EmptyMutation, Object, Result};
use mangadex_api_input_types::scanlation_group::{
    create::CreateScalantionGroupParam, edit::EditScanlationGroupParam,
};
use mangadex_api_schema_rust::{v5::ScanlationGroupAttributes, ApiObjectNoRelationships};
use uuid::Uuid;

use crate::{
    objects::scanlation_group::ScanlationGroup,
    utils::get_mangadex_client_from_graphql_context_with_auth_refresh,
};

#[derive(Debug, Clone, Copy)]
pub struct ScanlationGroupMutation;

#[Object]
impl ScanlationGroupMutation {
    pub async fn create(
        &self,
        ctx: &Context<'_>,
        params: CreateScalantionGroupParam,
    ) -> Result<ScanlationGroup> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let res = params.send(&client).await?;
        let res: ApiObjectNoRelationships<ScanlationGroupAttributes> = res.body.data.into();
        Ok(res.into())
    }
    pub async fn edit(
        &self,
        ctx: &Context<'_>,
        params: EditScanlationGroupParam,
    ) -> Result<ScanlationGroup> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let res = params.send(&client).await?;
        let res: ApiObjectNoRelationships<ScanlationGroupAttributes> = res.body.data.into();
        Ok(res.into())
    }
    pub async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<EmptyMutation> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let _res = client.scanlation_group().id(id).delete().send().await?;
        Ok(EmptyMutation)
    }
    pub async fn follow(&self, ctx: &Context<'_>, id: Uuid) -> Result<EmptyMutation> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        client
            .scanlation_group()
            .id(id)
            .follow()
            .post()
            .send()
            .await?;
        Ok(EmptyMutation)
    }
    pub async fn unfollow(&self, ctx: &Context<'_>, id: Uuid) -> Result<EmptyMutation> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        client
            .scanlation_group()
            .id(id)
            .follow()
            .delete()
            .send()
            .await?;
        Ok(EmptyMutation)
    }
}
