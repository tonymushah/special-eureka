use crate::Result;
use async_graphql::{Context, Object};
use mangadex_api_input_types::captcha::solve::CaptchaSolveParams;

use crate::utils::get_mangadex_client_from_graphql_context;

#[derive(Debug, Clone, Copy)]
pub struct CaptchaMutations;

#[Object]
impl CaptchaMutations {
    pub async fn solve(&self, ctx: &Context<'_>, params: CaptchaSolveParams) -> Result<bool> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        params.send(&client).await?;
        Ok(true)
    }
}
