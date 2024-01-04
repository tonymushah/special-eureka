use async_graphql::{Context, Object, Result};
use mangadex_api_input_types::{
    feed::{
        custom_list_feed::CustomListMangaFeedParams, followed_manga_feed::FollowedMangaFeedParams,
    },
    manga::list::MangaListParams,
};

use crate::{
    objects::{
        chapter::lists::ChapterResults,
        manga_chapter_group::{group_results, MangaChapterGroup},
        ExtractReferenceExpansionFromContext,
    },
    utils::get_mangadex_client_from_graphql_context_with_auth_refresh,
};

#[derive(Debug, Clone, Copy)]
pub struct FeedQueries;

#[Object]
impl FeedQueries {
    pub async fn user_logged_manga_feed(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] mut params: FollowedMangaFeedParams,
    ) -> Result<ChapterResults> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        params.includes = <ChapterResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        Ok(params.send(&client).await?.into())
    }
    pub async fn user_logged_manga_feed_grouped(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] mut feed_params: FollowedMangaFeedParams,
        #[graphql(default)] mut manga_list_params: MangaListParams,
    ) -> Result<MangaChapterGroup> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        feed_params.includes =
            MangaChapterGroup::get_chapter_references_expansions_from_context(ctx);
        manga_list_params.includes =
            MangaChapterGroup::get_manga_references_expansions_from_context(ctx);
        group_results(feed_params.send(&client).await?, ctx, manga_list_params).await
    }
    pub async fn custom_list_feed(
        &self,
        ctx: &Context<'_>,
        mut params: CustomListMangaFeedParams,
    ) -> Result<ChapterResults> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        params.includes = <ChapterResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        Ok(params.send(&client).await?.into())
    }
    pub async fn custom_list_feed_grouped(
        &self,
        ctx: &Context<'_>,
        mut feed_params: CustomListMangaFeedParams,
        #[graphql(default)] mut manga_list_params: MangaListParams,
    ) -> Result<MangaChapterGroup> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        feed_params.includes =
            MangaChapterGroup::get_chapter_references_expansions_from_context(ctx);
        manga_list_params.includes =
            MangaChapterGroup::get_manga_references_expansions_from_context(ctx);
        group_results(feed_params.send(&client).await?, ctx, manga_list_params).await
    }
}
