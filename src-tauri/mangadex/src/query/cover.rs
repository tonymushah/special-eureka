pub mod get_unique;
pub mod image;
pub mod list;

use crate::Result;
use async_graphql::{Context, Object};
use mangadex_api_input_types::cover::list::CoverListParam;
use url::Url;
use uuid::Uuid;

use crate::{
    cache::cover::CoverImageQuality,
    objects::{
        ExtractReferenceExpansionFromContext,
        cover::{Cover, lists::CoverResults},
    },
    utils::download_state::DownloadState,
};

use self::{get_unique::CoverGetUniqueQuery, image::CoverImageQuery, list::CoverListQuery};

use super::download_state::DownloadStateQueries;

#[derive(Debug, Clone, Copy)]
pub struct CoverQueries;

#[Object]
impl CoverQueries {
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] params: CoverListParam,
    ) -> Result<CoverResults> {
        let mut params: CoverListParam = params;
        params.includes = <CoverResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        CoverListQuery { params }.list(ctx).await
    }
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<Cover> {
        CoverGetUniqueQuery { id }.get(ctx).await
    }
    pub async fn get_image(
        &self,
        ctx: &Context<'_>,
        manga_id: Uuid,
        cover_id: Uuid,
        filename: String,
        mode: Option<CoverImageQuality>,
    ) -> Result<Url> {
        CoverImageQuery {
            manga_id,
            cover_id,
            filename,
            mode,
        }
        .get::<tauri::Wry>(ctx)
        .await
    }
    pub async fn is_downloaded(&self, ctx: &Context<'_>, id: Uuid) -> Result<DownloadState> {
        DownloadStateQueries.cover(ctx, id).await
    }
}
