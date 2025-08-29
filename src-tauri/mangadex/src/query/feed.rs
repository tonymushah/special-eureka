use std::ops::Deref;

use crate::{
    Result,
    store::types::structs::content::feed_from_gql_ctx,
    utils::{get_mangadex_client_from_graphql_context, splittable_param::SendSplitted},
};
use async_graphql::{Context, Object};
use mangadex_api_input_types::{
    feed::{
        custom_list_feed::CustomListMangaFeedParams, followed_manga_feed::FollowedMangaFeedParams,
    },
    manga::list::MangaListParams,
};

use crate::{
    objects::{
        ExtractReferenceExpansionFromContext,
        chapter::lists::ChapterResults,
        manga_chapter_group::{MangaChapterGroup, group_results},
    },
    utils::{
        get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_watches_from_graphql_context, source::SendMultiSourceData,
    },
};

// [x] use `crate::utils::splittable_parm`
#[derive(Debug, Clone, Copy)]
pub struct FeedQueries;

// TODO Implement
#[Object]
impl FeedQueries {
    pub async fn user_logged_manga_feed(
        &self,
        ctx: &Context<'_>,
        params: Option<FollowedMangaFeedParams>,
    ) -> Result<ChapterResults> {
        let mut param = feed_from_gql_ctx::<tauri::Wry, _>(ctx, params.unwrap_or_default());
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        param.includes = <ChapterResults as ExtractReferenceExpansionFromContext>::exctract(ctx);

        let res: ChapterResults = param.send_splitted_default(&client).await?.into();
        Ok({
            let _res = res.clone();
            tauri::async_runtime::spawn(async move {
                for data in _res {
                    let _ = watches.chapter.send_online(data);
                }
            });
            res
        })
    }
    pub async fn user_logged_manga_feed_grouped(
        &self,
        ctx: &Context<'_>,
        feed_params: Option<FollowedMangaFeedParams>,
        manga_list_params: Option<MangaListParams>,
    ) -> Result<MangaChapterGroup> {
        let mut feed_params: FollowedMangaFeedParams =
            feed_from_gql_ctx::<tauri::Wry, _>(ctx, feed_params.unwrap_or_default());
        let mut manga_list_params: MangaListParams =
            feed_from_gql_ctx::<tauri::Wry, _>(ctx, manga_list_params.unwrap_or_default());
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        feed_params.includes =
            MangaChapterGroup::get_chapter_references_expansions_from_context(ctx);
        manga_list_params.includes =
            MangaChapterGroup::get_manga_references_expansions_from_context(ctx);
        group_results(
            {
                let res = feed_params.send_splitted_default(&client).await?;
                let _res: ChapterResults = res.clone().into();
                tauri::async_runtime::spawn(async move {
                    for data in _res {
                        let _ = watches.chapter.send_online(data);
                    }
                });
                res
            },
            ctx,
            manga_list_params,
        )
        .await
    }
    pub async fn custom_list_feed(
        &self,
        ctx: &Context<'_>,
        params: CustomListMangaFeedParams,
        private: Option<bool>,
    ) -> Result<ChapterResults> {
        let mut param: CustomListMangaFeedParams = feed_from_gql_ctx::<tauri::Wry, _>(ctx, params);
        let client = if private.unwrap_or_default() {
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?
        } else {
            get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?
        };

        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        param.includes = <ChapterResults as ExtractReferenceExpansionFromContext>::exctract(ctx);

        let res: ChapterResults = if private.unwrap_or_default() {
            param.send_splitted_default_with_auth(&client).await?.into()
        } else {
            param.send_splitted_default(&client).await?.into()
        };
        Ok({
            let _res = res.clone();
            tauri::async_runtime::spawn(async move {
                for data in _res {
                    let _ = watches.chapter.send_online(data);
                }
            });
            res
        })
    }
    pub async fn custom_list_feed_grouped(
        &self,
        ctx: &Context<'_>,
        feed_params: CustomListMangaFeedParams,
        manga_list_params: Option<MangaListParams>,
        private: Option<bool>,
    ) -> Result<MangaChapterGroup> {
        let mut feed_params: CustomListMangaFeedParams =
            feed_from_gql_ctx::<tauri::Wry, _>(ctx, feed_params);
        let mut manga_list_params: MangaListParams =
            feed_from_gql_ctx::<tauri::Wry, _>(ctx, manga_list_params.unwrap_or_default());
        let client = if private.unwrap_or_default() {
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?
        } else {
            get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?
        };

        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        feed_params.includes =
            MangaChapterGroup::get_chapter_references_expansions_from_context(ctx);
        manga_list_params.includes =
            MangaChapterGroup::get_manga_references_expansions_from_context(ctx);
        group_results(
            {
                let res = if private.unwrap_or_default() {
                    feed_params.send_splitted_default_with_auth(&client).await?
                } else {
                    feed_params.send_splitted_default(&client).await?
                };
                let data = res;
                let _res: ChapterResults = data.clone().into();
                tauri::async_runtime::spawn(async move {
                    for data in _res {
                        let _ = watches.chapter.send_online(data);
                    }
                });
                data
            },
            ctx,
            manga_list_params,
        )
        .await
    }
}
