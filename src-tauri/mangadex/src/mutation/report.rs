use crate::{
    Result,
    utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
};
use async_graphql::{Context, Object};
use mangadex_api_input_types::report::create::CreateReportParam;

use crate::utils::get_mangadex_client_from_graphql_context_with_auth_refresh;

#[derive(Debug, Clone, Copy)]
pub struct ReportMutations;

#[Object]
#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl ReportMutations {
    pub async fn create(&self, ctx: &Context<'_>, params: CreateReportParam) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .post_report()
            .await;
        let _res = params.send(&client).await?;
        Ok(true)
    }
}
