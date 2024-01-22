pub mod get_unique;
pub mod list;
pub mod pages;

use async_graphql::{Context, Object, Result};
use mangadex_api_input_types::{chapter::list::ChapterListParams, manga::list::MangaListParams};
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::objects::{
    chapter::{lists::ChapterResults, pages::ChapterPages, Chapter},
    manga_chapter_group::{group_results, MangaChapterGroup},
    ExtractReferenceExpansion,
};

use get_unique::GetUniqueChapterQuery;
use list::{ChapterListQueries, GetAllChapterParams};

use self::pages::ChapterPagesQuery;

#[derive(Debug, Clone, Copy)]
pub struct ChapterQueries;

#[Object]
impl ChapterQueries {
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] params: ChapterListParams,
        offline_params: Option<GetAllChapterParams>,
    ) -> Result<ChapterResults> {
        ChapterListQueries(params)
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
        #[graphql(default)] mut chapter_list_params: ChapterListParams,
        #[graphql(default)] mut manga_list_params: MangaListParams,
    ) -> Result<MangaChapterGroup> {
        chapter_list_params.includes =
            MangaChapterGroup::get_chapter_references_expansions_from_context(ctx);
        manga_list_params.includes =
            MangaChapterGroup::get_manga_references_expansions_from_context(ctx);
        group_results(
            ChapterListQueries(chapter_list_params)
                ._default(ctx, None)
                .await?,
            ctx,
            manga_list_params,
        )
        .await
    }
}
