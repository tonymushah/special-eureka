pub mod get_unique;
pub mod list;
pub mod pages;

use crate::{
    Result, store::types::structs::content::feed_from_gql_ctx,
    utils::traits_utils::MangadexAsyncGraphQLContextExt,
};
use async_graphql::{Context, Object};
use mangadex_api_input_types::{chapter::list::ChapterListParams, manga::list::MangaListParams};
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::{
    objects::{
        ExtractReferenceExpansion, ExtractReferenceExpansionFromContext,
        chapter::{Chapter, lists::ChapterResults, pages::ChapterPages},
        manga_chapter_group::{MangaChapterGroup, group_results},
    },
    utils::download_state::DownloadState,
};

use get_unique::GetUniqueChapterQuery;
use list::{ChapterListQueries, GetAllChapterParams};

use self::pages::ChapterPagesQuery;

use super::download_state::DownloadStateQueries;

#[derive(Debug, Clone, Copy)]
pub struct ChapterQueries;

#[Object]
impl ChapterQueries {
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        params: Option<ChapterListParams>,
        offline_params: Option<GetAllChapterParams>,
        feed_content: Option<bool>,
    ) -> Result<ChapterResults> {
        let feed_content = feed_content.unwrap_or(true);
        let mut params = params.unwrap_or_default();
        if feed_content {
            params = feed_from_gql_ctx::<tauri::Wry, _>(ctx, params);
        }
        params.includes = <ChapterResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        ChapterListQueries::no_feed(params)
            .default(ctx, offline_params)
            .await
    }

    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<Chapter> {
        GetUniqueChapterQuery({
            let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
            if let Some(rel) = ctx
                .field()
                .selection_set()
                .find(|f| f.name() == "relationships")
            {
                let mut out = <Chapter as ExtractReferenceExpansion>::exctract(rel);
                includes.append(&mut out);
            }
            includes.dedup();
            includes
        })
        .get(ctx, id)
        .await
    }
    pub async fn pages(&self, ctx: &Context<'_>, id: Uuid) -> Result<ChapterPages> {
        ChapterPagesQuery { id }.pages(ctx).await
    }
    pub async fn list_with_group_by_manga(
        &self,
        ctx: &Context<'_>,
        chapter_list_params: Option<ChapterListParams>,
        manga_list_params: Option<MangaListParams>,
        feed_content: Option<bool>,
    ) -> Result<MangaChapterGroup> {
        let feed_content = feed_content.unwrap_or_default();
        let mut chapter_list_params: ChapterListParams = chapter_list_params.unwrap_or_default();
        if feed_content {
            chapter_list_params = feed_from_gql_ctx::<tauri::Wry, _>(ctx, chapter_list_params);
        }
        let mut manga_list_params: MangaListParams =
            feed_from_gql_ctx::<tauri::Wry, _>(ctx, manga_list_params.unwrap_or_default());
        chapter_list_params.includes =
            MangaChapterGroup::get_chapter_references_expansions_from_context(ctx);
        manga_list_params.includes =
            MangaChapterGroup::get_manga_references_expansions_from_context(ctx);
        group_results(
            ChapterListQueries::new(chapter_list_params, ctx.get_app_handle::<tauri::Wry>()?)
                ._default(ctx, None)
                .await?,
            ctx,
            manga_list_params,
        )
        .await
    }
    pub async fn is_downloaded(&self, ctx: &Context<'_>, id: Uuid) -> Result<DownloadState> {
        DownloadStateQueries.chapter(ctx, id).await
    }
}
