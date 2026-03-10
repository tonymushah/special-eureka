use std::ops::Deref;

use crate::error::wrapped::Result;

use crate::objects::manga_chapter_group::{GroupsResultsExtras, groups_results_with_extras};
use crate::utils::traits_utils::MangadexAsyncGraphQLContextExt;
use crate::{
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
        ExtractReferenceExpansionFromContext, chapter::lists::ChapterResults,
        manga_chapter_group::MangaChapterGroup,
    },
    utils::{
        get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_watches_from_graphql_context, source::SendMultiSourceData,
    },
};

// [x] use `crate::utils::splittable_parm`
#[derive(Debug, Clone, Copy)]
pub struct FeedQueries;

#[Object]
#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl FeedQueries {
    pub async fn user_logged_manga_feed(
        &self,
        ctx: &Context<'_>,
        params: Option<FollowedMangaFeedParams>,
        exclude_blacklisted_scans_groups: Option<bool>,
        exclude_blacklisted_users: Option<bool>,
    ) -> Result<ChapterResults> {
        let mut param = feed_from_gql_ctx::<tauri::Wry, _>(ctx, params.unwrap_or_default());
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        param.includes = <ChapterResults as ExtractReferenceExpansionFromContext>::exctract(ctx);

        let app = ctx.get_app_handle::<tauri::Wry>()?;

        // TODO refactor this
        loop {
            let mut res: ChapterResults =
                param.clone().send_splitted_default(&client).await?.into();

            if exclude_blacklisted_scans_groups.unwrap_or_default() {
                *res = crate::blacklist::filters::filter_scanlation_groups_chapters(
                    app.clone(),
                    std::mem::take(&mut *res),
                )
                .await?;
            }
            if exclude_blacklisted_users.unwrap_or_default() {
                *res = crate::blacklist::filters::filter_users_chapters(
                    app.clone(),
                    std::mem::take(&mut *res),
                )
                .await?;
            }

            if res.is_empty() {
                let next_offset = res.info.offset + res.info.limit;
                if next_offset < res.info.total {
                    param.offset = Some(next_offset);
                    continue;
                }
            }
            break Ok({
                let _res = res.clone();
                tauri::async_runtime::spawn(async move {
                    for data in _res {
                        let _ = watches.chapter.send_online(data);
                    }
                });
                res
            });
        }
    }
    pub async fn user_logged_manga_feed_grouped(
        &self,
        ctx: &Context<'_>,

        feed_params: Option<FollowedMangaFeedParams>,
        manga_list_params: Option<MangaListParams>,
        only_unread_titles: Option<bool>,
        exclude_blacklisted_scans_groups: Option<bool>,
        exclude_blacklisted_users: Option<bool>,
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
        Ok(groups_results_with_extras(
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
            GroupsResultsExtras {
                only_unread_titles: only_unread_titles.unwrap_or_default(),
                exclude_blacklisted_scans_groups: exclude_blacklisted_scans_groups
                    .unwrap_or_default(),
                exclude_blacklisted_users: exclude_blacklisted_users.unwrap_or_default(),
                ..Default::default()
            },
        )
        .await?)
    }
    pub async fn custom_list_feed(
        &self,
        ctx: &Context<'_>,
        params: CustomListMangaFeedParams,
        private: Option<bool>,
        exclude_blacklisted_scans_groups: Option<bool>,
        exclude_blacklisted_users: Option<bool>,
    ) -> Result<ChapterResults> {
        let mut param: CustomListMangaFeedParams = feed_from_gql_ctx::<tauri::Wry, _>(ctx, params);

        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        param.includes = <ChapterResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        loop {
            let client = if private.unwrap_or_default() {
                get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx)
                    .await?
            } else {
                get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?
            };
            let mut res: ChapterResults = if private.unwrap_or_default() {
                param
                    .clone()
                    .send_splitted_default_with_auth(&client)
                    .await?
                    .into()
            } else {
                param.clone().send_splitted_default(&client).await?.into()
            };
            if exclude_blacklisted_scans_groups.unwrap_or_default() {
                *res = crate::blacklist::filters::filter_scanlation_groups_chapters(
                    app.clone(),
                    std::mem::take(&mut *res),
                )
                .await?;
            }
            if exclude_blacklisted_users.unwrap_or_default() {
                *res = crate::blacklist::filters::filter_users_chapters(
                    app.clone(),
                    std::mem::take(&mut *res),
                )
                .await?;
            }
            if res.is_empty() {
                let next_offset = res.info.offset + res.info.limit;
                if next_offset < res.info.total {
                    param.offset = Some(next_offset);
                    continue;
                }
            }
            break Ok({
                let _res = res.clone();
                tauri::async_runtime::spawn(async move {
                    for data in _res {
                        let _ = watches.chapter.send_online(data);
                    }
                });
                res
            });
        }
    }
    pub async fn custom_list_feed_grouped(
        &self,
        ctx: &Context<'_>,
        feed_params: CustomListMangaFeedParams,
        manga_list_params: Option<MangaListParams>,
        private: Option<bool>,
        only_unread_titles: Option<bool>,
        exclude_blacklisted_scans_groups: Option<bool>,
        exclude_blacklisted_users: Option<bool>,
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
        Ok(groups_results_with_extras(
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
            GroupsResultsExtras {
                only_unread_titles: only_unread_titles.unwrap_or_default(),
                exclude_blacklisted_scans_groups: exclude_blacklisted_scans_groups
                    .unwrap_or_default(),
                exclude_blacklisted_users: exclude_blacklisted_users.unwrap_or_default(),
                ..Default::default()
            },
        )
        .await?)
    }
}
