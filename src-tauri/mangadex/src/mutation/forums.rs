use crate::Result;
use async_graphql::{Context, Object, SimpleObject};
use mangadex_api_input_types::forums::create::CreateForumThreadParams;
use url::Url;

use crate::utils::{
    get_mangadex_client_from_graphql_context_with_auth_refresh,
    traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
};

#[derive(Debug, Clone, Copy)]
pub struct ForumsMutations;

#[derive(Debug, Clone, SimpleObject)]
pub struct CreateForumTheardResponse {
    pub forum_id: u32,
    pub forum_url: Url,
    pub replies_count: u32,
}

#[Object]
impl ForumsMutations {
    /// create a forum thread and return the generated forum id
    pub async fn create_thread(
        &self,
        ctx: &Context<'_>,
        params: CreateForumThreadParams,
    ) -> Result<CreateForumTheardResponse> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .post_thread()
            .await;
        let res = params.send(&client).await?;
        Ok(CreateForumTheardResponse {
            forum_id: res.data.id,
            forum_url: format!("https://forums.mangadex.org/threads/{}", res.data.id).parse()?,
            replies_count: res.data.attributes.replies_count,
        })
    }
}
