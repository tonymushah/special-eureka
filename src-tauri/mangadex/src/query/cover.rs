pub mod get_unique;
pub mod image;
pub mod list;

use async_graphql::{Context, Object, Result};
use bytes::Bytes;
use mangadex_api_input_types::cover::list::CoverListParam;
use uuid::Uuid;

use crate::{
    objects::{
        cover::{lists::CoverResults, Cover},
        ExtractReferenceExpansionFromContext,
    },
    query::cover::image::CoverImageQuality,
};

use self::{get_unique::CoverGetUniqueQuery, image::CoverImageQuery, list::CoverListQuery};

#[derive(Debug, Clone, Copy)]
pub struct CoverQueries;

#[Object]
impl CoverQueries {
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] mut params: CoverListParam,
    ) -> Result<CoverResults> {
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
    ) -> Result<Bytes> {
        CoverImageQuery {
            manga_id,
            cover_id,
            filename,
            mode,
        }
        .get::<tauri::Wry>(ctx)
        .await
    }
}
