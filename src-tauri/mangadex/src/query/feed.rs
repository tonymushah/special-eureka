use std::ops::Deref;

use crate::{
    store::types::structs::content::feed_from_gql_ctx, utils::math::divide::divide, Result,
};
use async_graphql::{Context, Object};
use mangadex_api_input_types::{
    feed::{
        custom_list_feed::CustomListMangaFeedParams, followed_manga_feed::FollowedMangaFeedParams,
    },
    manga::list::MangaListParams,
};
use mangadex_api_schema_rust::v5::ChapterCollection;

use crate::{
    objects::{
        chapter::lists::ChapterResults,
        manga_chapter_group::{group_results, MangaChapterGroup},
        ExtractReferenceExpansionFromContext,
    },
    utils::{
        get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_watches_from_graphql_context, source::SendMultiSourceData,
    },
};

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
        let params = {
            let div_res = divide(param.limit.unwrap_or(10), 100);
            let mut all = (0..div_res.quot)
                .map(|d| {
                    let mut param = param.clone();
                    param.offset = Some(param.offset.unwrap_or_default() + d * 100);
                    param.limit = Some(100);
                    param
                })
                .collect::<Vec<_>>();
            all.push({
                let mut param = param.clone();
                param.offset = Some(param.offset.unwrap_or_default() + div_res.quot * 100);
                param.limit = Some(div_res.remainder);
                param
            });
            all
        };
        let mut results = Vec::<ChapterCollection>::new();
        for val in params {
            results.push(val.send(&client).await?);
        }
        let res: ChapterResults = results
            .into_iter()
            .fold(
                ChapterCollection {
                    response: mangadex_api_types_rust::ResponseType::Collection,
                    offset: param.offset.unwrap_or_default(),
                    total: 0,
                    limit: 0,
                    data: Vec::new(),
                    result: mangadex_api_types_rust::ResultType::Ok,
                },
                |mut agg, mut res| {
                    agg.total = res.total;
                    agg.limit += res.limit;
                    agg.data.append(&mut res.data);
                    agg
                },
            )
            .into();
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
                let param = feed_params;
                let params = {
                    let div_res = divide(param.limit.unwrap_or(10), 100);
                    let mut all = (0..div_res.quot)
                        .map(|d| {
                            let mut param = param.clone();
                            param.offset = Some(param.offset.unwrap_or_default() + d * 100);
                            param.limit = Some(100);
                            param
                        })
                        .collect::<Vec<_>>();
                    all.push({
                        let mut param = param.clone();
                        param.offset = Some(param.offset.unwrap_or_default() + div_res.quot * 100);
                        param.limit = Some(div_res.remainder);
                        param
                    });
                    all
                };
                let mut results = Vec::<ChapterCollection>::new();
                for val in params {
                    results.push(val.send(&client).await?);
                }
                let res = results.into_iter().fold(
                    ChapterCollection {
                        response: mangadex_api_types_rust::ResponseType::Collection,
                        offset: param.offset.unwrap_or_default(),
                        total: 0,
                        limit: 0,
                        data: Vec::new(),
                        result: mangadex_api_types_rust::ResultType::Ok,
                    },
                    |mut agg, mut res| {
                        agg.total = res.total;
                        agg.limit += res.limit;
                        agg.data.append(&mut res.data);
                        agg
                    },
                );
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
    ) -> Result<ChapterResults> {
        let mut param: CustomListMangaFeedParams = feed_from_gql_ctx::<tauri::Wry, _>(ctx, params);
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        param.includes = <ChapterResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        let params = {
            let div_res = divide(param.limit.unwrap_or(10), 100);
            let mut all = (0..div_res.quot)
                .map(|d| {
                    let mut param = param.clone();
                    param.offset = Some(param.offset.unwrap_or_default() + d * 100);
                    param.limit = Some(100);
                    param
                })
                .collect::<Vec<_>>();
            all.push({
                let mut param = param.clone();
                param.offset = Some(param.offset.unwrap_or_default() + div_res.quot * 100);
                param.limit = Some(div_res.remainder);
                param
            });
            all
        };
        let mut results = Vec::<ChapterCollection>::new();
        for val in params {
            results.push(val.send(&client).await?);
        }
        let res: ChapterResults = results
            .into_iter()
            .fold(
                ChapterCollection {
                    response: mangadex_api_types_rust::ResponseType::Collection,
                    offset: param.offset.unwrap_or_default(),
                    total: 0,
                    limit: 0,
                    data: Vec::new(),
                    result: mangadex_api_types_rust::ResultType::Ok,
                },
                |mut agg, mut res| {
                    agg.total = res.total;
                    agg.limit += res.limit;
                    agg.data.append(&mut res.data);
                    agg
                },
            )
            .into();
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
    ) -> Result<MangaChapterGroup> {
        let mut feed_params: CustomListMangaFeedParams =
            feed_from_gql_ctx::<tauri::Wry, _>(ctx, feed_params);
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
                let param = feed_params;
                let params = {
                    let div_res = divide(param.limit.unwrap_or(10), 100);
                    let mut all = (0..div_res.quot)
                        .map(|d| {
                            let mut param = param.clone();
                            param.offset = Some(param.offset.unwrap_or_default() + d * 100);
                            param.limit = Some(100);
                            param
                        })
                        .collect::<Vec<_>>();
                    all.push({
                        let mut param = param.clone();
                        param.offset = Some(param.offset.unwrap_or_default() + div_res.quot * 100);
                        param.limit = Some(div_res.remainder);
                        param
                    });
                    all
                };
                let mut results = Vec::<ChapterCollection>::new();
                for val in params {
                    results.push(val.send(&client).await?);
                }
                let res = results.into_iter().fold(
                    ChapterCollection {
                        response: mangadex_api_types_rust::ResponseType::Collection,
                        offset: param.offset.unwrap_or_default(),
                        total: 0,
                        limit: 0,
                        data: Vec::new(),
                        result: mangadex_api_types_rust::ResultType::Ok,
                    },
                    |mut agg, mut res| {
                        agg.total = res.total;
                        agg.limit += res.limit;
                        agg.data.append(&mut res.data);
                        agg
                    },
                );
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
