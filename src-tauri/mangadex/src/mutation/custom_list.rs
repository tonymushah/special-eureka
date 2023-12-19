use async_graphql::{Context, EmptyMutation, Object, Result};
use mangadex_api_input_types::custom_list::{
    add_manga::CustomListAddMangaParam, create::CustomListCreateParam,
    remove_manga::CustomListRemoveMangaParam, update::CustomListUpdateParams,
};
use uuid::Uuid;

use crate::{objects::custom_list::CustomList, utils::get_mangadex_client_from_graphql_context};

#[derive(Debug, Clone, Copy)]
pub struct CustomListMutations;

#[Object]
impl CustomListMutations {
    pub async fn create(
        &self,
        ctx: &Context<'_>,
        params: CustomListCreateParam,
    ) -> Result<CustomList> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        Ok(params.send(&client).await?.data.into())
    }
    pub async fn update(
        &self,
        ctx: &Context<'_>,
        params: CustomListUpdateParams,
    ) -> Result<CustomList> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        Ok(params.send(&client).await?.data.into())
    }
    pub async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<EmptyMutation> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        client.custom_list().id(id).delete().send().await?;
        Ok(EmptyMutation)
    }
    pub async fn follow(&self, ctx: &Context<'_>, id: Uuid) -> Result<EmptyMutation> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        client.custom_list().id(id).follow().post().send().await?;
        Ok(EmptyMutation)
    }
    pub async fn unfollow(&self, ctx: &Context<'_>, id: Uuid) -> Result<EmptyMutation> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        // TODO fix this shit with `mangadex-api` v3.0.1
        client
            .custom_list()
            .id(id)
            .follow()
            .delete()
            .build()?
            .send()
            .await?;
        Ok(EmptyMutation)
    }
    pub async fn add_manga(
        &self,
        ctx: &Context<'_>,
        params: CustomListAddMangaParam,
    ) -> Result<EmptyMutation> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        params.send(&client).await?;
        Ok(EmptyMutation)
    }
    pub async fn remove_manga(
        &self,
        ctx: &Context<'_>,
        params: CustomListRemoveMangaParam,
    ) -> Result<EmptyMutation> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        params.send(&client).await?;
        Ok(EmptyMutation)
    }
}
