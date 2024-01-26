use async_graphql::{Context, Object, Result};
use mangadex_api_types_rust::RelationshipType;
use uuid::Uuid;

use crate::utils::{
    get_mangadex_client_from_graphql_context_with_auth_refresh, get_watches_from_graphql_context,
    watch::{is_following::inner::IsFollowingInnerData, SendData},
};

#[derive(Debug, Clone, Copy)]
pub struct UserMutations;

#[Object]
impl UserMutations {
    pub async fn follow(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        client.user().id(id).follow().post().send().await?;
        let _ = watches.is_following.send_data((
            id,
            IsFollowingInnerData {
                type_: RelationshipType::User,
                data: true,
            },
        ));
        Ok(true)
    }
    pub async fn unfollow(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        client.user().id(id).follow().delete().send().await?;
        let _ = watches.is_following.send_data((
            id,
            IsFollowingInnerData {
                type_: RelationshipType::User,
                data: false,
            },
        ));
        Ok(true)
    }
}
