use crate::Result;
use async_graphql::{Context, Object};
use mangadex_api_input_types::report::{
    list::ListReportParams, list_by_category::ListReasonsByCategory,
};

use crate::{
    objects::{
        report::lists::UserReportResults, report_reason::list::ReportReasonResults,
        ExtractReferenceExpansionFromContext,
    },
    utils::get_mangadex_client_from_graphql_context_with_auth_refresh,
};

#[derive(Debug, Clone, Copy)]
pub struct ReportQueries;

#[Object]
impl ReportQueries {
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] params: ListReportParams,
    ) -> Result<UserReportResults> {
        let mut params = params;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        params.includes =
            <UserReportResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        let res = params.send(&client).await?;
        Ok(res.body.into())
    }
    pub async fn list_by_caterogy(
        &self,
        ctx: &Context<'_>,
        params: ListReasonsByCategory,
    ) -> Result<ReportReasonResults> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        Ok(params.send(&client).await?.into())
    }
}
