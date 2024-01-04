use async_graphql::{Context, Object, Result};
use mangadex_api_input_types::{chapter::list::ChapterListParams, manga::list::MangaListParams};
use mangadex_api_types_rust::{ChapterSortOrder, MangaDexDateTime, MangaSortOrder, OrderDirection};
use time::Duration;

use crate::{
    objects::{
        chapter::lists::ChapterResults,
        custom_list::{seasonal::SeasonalData, CustomList},
        manga::lists::MangaResults,
        ExtractReferenceExpansionFromContext,
    },
    utils::get_mangadex_client_from_graphql_context,
};

use super::chapter::list::ChapterListQueries;

#[derive(Debug, Clone, Copy)]
pub struct HomeQueries;

#[Object]
impl HomeQueries {
    pub async fn seasonal(&self, ctx: &Context<'_>) -> Result<CustomList> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let res = {
            let arc_cli = client.get_http_client();
            let cli = arc_cli.read().await;
            SeasonalData::get(&cli.client).await?
        };
        Ok(res.get_result(&client).await?.data.into())
    }
    pub async fn recently_uploaded(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] mut params: ChapterListParams,
    ) -> Result<ChapterResults> {
        params.includes = <ChapterResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        params.order = Some(ChapterSortOrder::ReadableAt(OrderDirection::Descending));
        params.chapter_ids.clear();
        params.chapters.clear();
        ChapterListQueries(params).default(ctx, None).await
    }
    pub async fn recently_added(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] mut params: MangaListParams,
    ) -> Result<MangaResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        params.includes = <MangaResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        params.order = Some(MangaSortOrder::CreatedAt(OrderDirection::Descending));
        params.manga_ids.clear();
        Ok(params.send(&client).await?.into())
    }
    pub async fn popular_titles(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] mut params: MangaListParams,
    ) -> Result<MangaResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        params.includes = <MangaResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        params.order = Some(MangaSortOrder::FollowedCount(OrderDirection::Descending));
        let created_at_since = {
            let d = MangaDexDateTime::default();
            let d = d.as_ref().saturating_sub(Duration::days(30));
            MangaDexDateTime::new(&d)
        };
        params.created_at_since = Some(created_at_since);
        params.manga_ids.clear();
        Ok(params.send(&client).await?.into())
    }
}
