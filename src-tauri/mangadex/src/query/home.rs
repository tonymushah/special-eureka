use crate::{
    objects::GetId,
    utils::{read_marker::has_title_read, traits_utils::MangadexAsyncGraphQLContextExt},
};

use async_graphql::{Context, Object};
use mangadex_api_input_types::{chapter::list::ChapterListParams, manga::list::MangaListParams};
use mangadex_api_types_rust::{ChapterSortOrder, MangaDexDateTime, MangaSortOrder, OrderDirection};
use time::Duration;

use crate::{
    objects::{
        ExtractReferenceExpansionFromContext,
        chapter::lists::ChapterResults,
        custom_list::{CustomList, seasonal::SeasonalData, staff_picks::StaffPicksData},
        manga::lists::MangaResults,
    },
    utils::{
        get_mangadex_client_from_graphql_context, get_watches_from_graphql_context, watch::SendData,
    },
};

use super::{chapter::list::ChapterListQueries, manga::list::MangaListQueries};

#[derive(Debug, Clone, Copy)]
pub struct HomeQueries;

#[Object]
#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl HomeQueries {
    pub async fn seasonal(&self, ctx: &Context<'_>) -> crate::error::wrapped::Result<CustomList> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let res = {
            let arc_cli = client.get_http_client();
            let cli = arc_cli.read().await;
            SeasonalData::get(&cli.client).await?
        };
        Ok({
            let data: CustomList = res.get_result(&client).await?.data.into();
            let _ = watches.custom_list.send_data(data.clone());
            data
        })
    }
    pub async fn staff_picks(
        &self,
        ctx: &Context<'_>,
    ) -> crate::error::wrapped::Result<CustomList> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let res = {
            let arc_cli = client.get_http_client();
            let cli = arc_cli.read().await;
            StaffPicksData::get(&cli.client).await?
        };
        Ok({
            let data: CustomList = res.get_result(&client).await?.data.into();
            let _ = watches.custom_list.send_data(data.clone());
            data
        })
    }
    pub async fn recently_uploaded(
        &self,
        ctx: &Context<'_>,
        params: Option<ChapterListParams>,
    ) -> crate::error::wrapped::Result<ChapterResults> {
        let mut params: ChapterListParams = params.unwrap_or_default();
        params.includes = <ChapterResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        params.order = Some(ChapterSortOrder::ReadableAt(OrderDirection::Descending));
        params.chapter_ids.clear();
        params.chapters.clear();
        ChapterListQueries::new(params, ctx.get_app_handle::<tauri::Wry>()?)
            .default(ctx, None)
            .await
    }
    pub async fn recently_added(
        &self,
        ctx: &Context<'_>,
        params: Option<MangaListParams>,
    ) -> crate::error::wrapped::Result<MangaResults> {
        let mut params = params.unwrap_or_default();
        params.includes = <MangaResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        params.order = Some(MangaSortOrder::CreatedAt(OrderDirection::Descending));
        params.has_available_chapters = Some(true);
        params.manga_ids.clear();
        loop {
            let mut res: MangaResults =
                MangaListQueries::new(params.clone(), ctx.get_app_handle::<tauri::Wry>()?)
                    .list(ctx)
                    .await?;
            let read_marker = has_title_read(
                ctx.get_app_handle::<tauri::Wry>()?,
                res.iter().map(|d| d.get_id()).collect(),
            )
            .await
            .unwrap_or_default();
            res.retain(|d| !read_marker.get(&d.get_id()).copied().unwrap_or_default());
            if res.is_empty() {
                params.offset =
                    Some(params.offset.unwrap_or_default() + params.limit.unwrap_or_default());
                continue;
            }
            return Ok(res);
        }
    }
    pub async fn popular_titles(
        &self,
        ctx: &Context<'_>,
        params: Option<MangaListParams>,
    ) -> crate::error::wrapped::Result<MangaResults> {
        let mut params = params.unwrap_or_default();
        params.includes = <MangaResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        params.order = Some(MangaSortOrder::FollowedCount(OrderDirection::Descending));
        let created_at_since = {
            let d = MangaDexDateTime::default();
            let d = d.as_ref().saturating_sub(Duration::days(30));
            MangaDexDateTime::new(&d)
        };
        params.created_at_since = Some(created_at_since);
        params.manga_ids.clear();
        Ok({
            let res: MangaResults =
                MangaListQueries::new(params, ctx.get_app_handle::<tauri::Wry>()?)
                    .list(ctx)
                    .await?;
            res
        })
    }
}
