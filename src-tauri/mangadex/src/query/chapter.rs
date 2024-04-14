pub mod get_unique;
pub mod list;
pub mod pages;

use async_graphql::{Context, Object, Result};
use mangadex_api_input_types::{chapter::list::ChapterListParams, manga::list::MangaListParams};
use mangadex_api_types_rust::{ReferenceExpansionResource, RelationshipType};
use mangadex_desktop_api2::{settings::file_history::IsIn, utils::ExtractData};
use uuid::Uuid;

use crate::{
    objects::{
        chapter::{lists::ChapterResults, pages::ChapterPages, Chapter},
        manga_chapter_group::{group_results, MangaChapterGroup},
        ExtractReferenceExpansion, ExtractReferenceExpansionFromContext,
    },
    utils::{
        download_state::DownloadState,
        get_offline_app_state, get_watches_from_graphql_context,
        watch::{SendData, WatcherInnerData},
    },
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
        let mut params = params;
        params.includes = <ChapterResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
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
        #[graphql(default)] chapter_list_params: ChapterListParams,
        #[graphql(default)] manga_list_params: MangaListParams,
    ) -> Result<MangaChapterGroup> {
        let mut chapter_list_params: ChapterListParams = chapter_list_params;
        let mut manga_list_params: MangaListParams = manga_list_params;
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
    pub async fn is_downloaded(&self, ctx: &Context<'_>, id: Uuid) -> Result<DownloadState> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .ok_or(async_graphql::Error::new("Offline AppState Not loaded"))?;
        let state = {
            if olasw.chapter_utils().with_id(id).is_there() {
                DownloadState::Downloaded {
                    has_failed: olasw
                        .history
                        .get_history_w_file_by_rel_or_init(
                            RelationshipType::Chapter,
                            &olasw.dir_options,
                        )
                        .await?
                        .is_in(id)?,
                }
            } else {
                DownloadState::NotDownloaded
            }
        };
        let _ = watches.download_state.send_data(WatcherInnerData {
            id,
            attributes: state,
        });
        Ok(state)
    }
}
