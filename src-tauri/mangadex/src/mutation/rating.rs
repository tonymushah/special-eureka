use async_graphql::{Context, EmptyMutation, Object, Result};
use mangadex_api_input_types::rating::create_or_update::CreateUpdateRating;
use uuid::Uuid;

use crate::utils::get_mangadex_client_from_graphql_context;

#[derive(Debug, Clone, Copy)]
pub struct RatingMutations;

#[Object]
impl RatingMutations {
    pub async fn create_update(
        &self,
        ctx: &Context<'_>,
        params: CreateUpdateRating,
    ) -> Result<EmptyMutation> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        params.send(&client).await?;
        Ok(EmptyMutation)
    }
    pub async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<EmptyMutation> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        client.rating().manga_id(id).delete().send().await?;
        Ok(EmptyMutation)
    }
}
