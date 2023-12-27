use async_graphql::{Context, Object, Result};
use mangadex_api_input_types::forums::create::CreateForumThreadParams;

use crate::utils::get_mangadex_client_from_graphql_context_with_auth_refresh;

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
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let res = params.send(&client).await?;
        Ok(res.data.id)
    }
}
