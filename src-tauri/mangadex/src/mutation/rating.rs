use crate::Result;
use async_graphql::{Context, Object};
use mangadex_api_input_types::rating::create_or_update::CreateUpdateRating;
use mangadex_api_types_rust::MangaDexDateTime;
use uuid::Uuid;

use crate::{
    objects::rating::RatingItem,
    utils::{
        get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_watches_from_graphql_context, watch::SendData,
    },
};

#[derive(Debug, Clone, Copy)]
pub struct RatingMutations;

#[Object]
impl RatingMutations {
    pub async fn create_update(
        &self,
        ctx: &Context<'_>,
        params: CreateUpdateRating,
    ) -> Result<bool> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        params.clone().send(&client).await?;
        let _ = watches.rating.send_data(RatingItem {
            id: params.manga_id,
            rating: params.rating,
            created_at: MangaDexDateTime::default(),
        });
        Ok(true)
    }
    pub async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        client.rating().manga_id(id).delete().send().await?;
        Ok(true)
    }
}
