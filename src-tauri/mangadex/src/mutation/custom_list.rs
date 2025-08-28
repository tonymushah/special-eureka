use crate::Result;
use async_graphql::{Context, Object};
use mangadex_api_input_types::custom_list::{
    add_manga::CustomListAddMangaParam, create::CustomListCreateParam,
    remove_manga::CustomListRemoveMangaParam, update::CustomListUpdateParams,
};
use mangadex_api_types_rust::RelationshipType;
use uuid::Uuid;

use crate::{
    objects::custom_list::CustomList,
    utils::{
        get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_watches_from_graphql_context,
        watch::{SendData, is_following::inner::IsFollowingInnerData},
    },
};

#[derive(Debug, Clone, Copy)]
pub struct CustomListMutations;

#[Object]
impl CustomListMutations {
    pub async fn create(
        &self,
        ctx: &Context<'_>,
        params: CustomListCreateParam,
    ) -> Result<CustomList> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let data: CustomList = params.send(&client).await?.data.into();
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let _ = watches.custom_list.send_data(data.clone());
        Ok(data)
    }
    pub async fn update(
        &self,
        ctx: &Context<'_>,
        params: CustomListUpdateParams,
    ) -> Result<CustomList> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let data: CustomList = params.send(&client).await?.data.into();
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let _ = watches.custom_list.send_data(data.clone());
        Ok(data)
    }
    pub async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        client.custom_list().id(id).delete().send().await?;
        Ok(true)
    }
    pub async fn follow(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        client.custom_list().id(id).follow().post().send().await?;
        let _ = watches.is_following.send_data((
            id,
            IsFollowingInnerData {
                type_: RelationshipType::CustomList,
                data: true,
            },
        ));
        Ok(true)
    }
    pub async fn unfollow(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        client.custom_list().id(id).follow().delete().send().await?;
        let _ = watches.is_following.send_data((
            id,
            IsFollowingInnerData {
                type_: RelationshipType::CustomList,
                data: false,
            },
        ));
        Ok(true)
    }
    pub async fn add_manga(
        &self,
        ctx: &Context<'_>,
        params: CustomListAddMangaParam,
    ) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        params.send(&client).await?;
        Ok(true)
    }
    pub async fn remove_manga(
        &self,
        ctx: &Context<'_>,
        params: CustomListRemoveMangaParam,
    ) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        params.send(&client).await?;
        Ok(true)
    }
    pub async fn add_manga_batch(
        &self,
        ctx: &Context<'_>,
        list_id: Uuid,
        manga_ids: Vec<Uuid>,
    ) -> Result<bool> {
        for manga_id in manga_ids {
            let client =
                get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx)
                    .await?;
            client
                .manga()
                .id(manga_id)
                .list()
                .list_id(list_id)
                .post()
                .send()
                .await?;
        }
        Ok(true)
    }
    pub async fn remove_manga_batch(
        &self,
        ctx: &Context<'_>,
        list_id: Uuid,
        manga_ids: Vec<Uuid>,
    ) -> Result<bool> {
        for manga_id in manga_ids {
            let client =
                get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx)
                    .await?;
            client
                .manga()
                .id(manga_id)
                .list()
                .list_id(list_id)
                .delete()
                .send()
                .await?;
        }
        Ok(true)
    }
}
