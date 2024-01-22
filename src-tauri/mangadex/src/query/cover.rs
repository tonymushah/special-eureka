pub mod get_unique;
pub mod list;

use async_graphql::{Context, Object, Result};
use mangadex_api_input_types::cover::list::CoverListParam;
use uuid::Uuid;

use crate::objects::{
    cover::{lists::CoverResults, Cover},
    ExtractReferenceExpansionFromContext,
};

use self::{get_unique::CoverGetUniqueQuery, list::CoverListQuery};

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
}
