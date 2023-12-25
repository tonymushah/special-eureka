use async_graphql::{Context, Object, Result};
use mangadex_api_input_types::follows::{
    groups::UserFollowedGroupsParams, lists::UserFollowedListParams,
    mangas::UserFollowedMangaParams, users::UserFollowedUserParams,
};
use uuid::Uuid;

use crate::{
    objects::{
        custom_list::lists::CustomListResults, manga::lists::MangaResults,
        scanlation_group::lists::ScanlationGroupResults, user::lists::UserResults,
        ExtractReferenceExpansionFromContext,
    },
    utils::get_mangadex_client_from_graphql_context_with_auth_refresh,
};

#[derive(Debug, Clone, Copy)]
pub struct FollowsQueries;

#[Object]
impl FollowsQueries {
    pub async fn groups(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] mut params: UserFollowedGroupsParams,
    ) -> Result<ScanlationGroupResults> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        params.includes =
            <ScanlationGroupResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        Ok(params.send(&client).await?.into())
    }
    pub async fn is_following_group(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        Ok(client
            .user()
            .follows()
            .group()
            .id(id)
            .get()
            .send()
            .await?
            .is_following)
    }
    pub async fn users(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] params: UserFollowedUserParams,
    ) -> Result<UserResults> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        Ok(params.send(&client).await?.into())
    }
    pub async fn is_following_user(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        Ok(client
            .user()
            .follows()
            .user()
            .id(id)
            .get()
            .send()
            .await?
            .is_following)
    }
    pub async fn mangas(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] mut params: UserFollowedMangaParams,
    ) -> Result<MangaResults> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        params.includes = <MangaResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        Ok(params.send(&client).await?.into())
    }
    pub async fn is_following_mangas(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        Ok(client
            .user()
            .follows()
            .manga()
            .id(id)
            .get()
            .send()
            .await?
            .is_following)
    }
    pub async fn lists(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] params: UserFollowedListParams,
    ) -> Result<CustomListResults> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        Ok(params.send(&client).await?.into())
    }
    pub async fn is_following_lists(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        Ok(client
            .user()
            .follows()
            .list()
            .id(id)
            .get()
            .send()
            .await?
            .is_following)
    }
}
