pub mod get_unique;
pub mod image;
pub mod list;

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
#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl CoverQueries {
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        params: Option<CoverListParam>,
    ) -> crate::error::wrapped::Result<CoverResults> {
        let mut params: CoverListParam = params.unwrap_or_default();
        params.includes = <CoverResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        Ok(CoverListQuery { params }.list(ctx).await?)
    }
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> crate::error::wrapped::Result<Cover> {
        Ok(CoverGetUniqueQuery { id }.get(ctx).await?)
    }
    pub async fn get_image(
        &self,
        ctx: &Context<'_>,
        manga_id: Uuid,
        cover_id: Uuid,
        filename: String,
        mode: Option<CoverImageQuality>,
    ) -> crate::error::wrapped::Result<Url> {
        Ok(CoverImageQuery {
            manga_id,
            cover_id,
            filename,
            mode,
        }
        .get::<tauri::Wry>(ctx)
        .await?)
    }
    pub async fn is_downloaded(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> crate::error::wrapped::Result<DownloadState> {
        DownloadStateQueries.cover(ctx, id).await
    }
}
