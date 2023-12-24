use async_graphql::{Context, Object, Result};
use mangadex_api_input_types::forums::create::CreateForumThreadParams;

use crate::utils::get_mangadex_client_from_graphql_context;

#[derive(Debug, Clone, Copy)]
pub struct ForumsMutations;

#[Object]
impl ForumsMutations {
    /// create a forum thread and return the generated forum id
    pub async fn create_thread(
        &self,
        ctx: &Context<'_>,
        params: CreateForumThreadParams,
    ) -> Result<u32> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let res = params.send(&client).await?;
        Ok(res.data.id)
    }
}
