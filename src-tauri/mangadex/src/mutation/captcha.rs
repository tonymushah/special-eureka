use crate::Result;
use async_graphql::{Context, Object};
use mangadex_api_input_types::captcha::solve::CaptchaSolveParams;

use crate::utils::{
    get_mangadex_client_from_graphql_context,
    traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
};

#[derive(Debug, Clone, Copy)]
pub struct CaptchaMutations;

#[Object]
#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl CaptchaMutations {
    pub async fn solve(&self, ctx: &Context<'_>, params: CaptchaSolveParams) -> Result<bool> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .solve_captcha()
            .await;
        params.send(&client).await?;
        Ok(true)
    }
}
