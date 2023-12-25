use async_graphql::{Context, Object, Result};
use uuid::Uuid;

use crate::{
    objects::rating::RatingItem, utils::get_mangadex_client_from_graphql_context_with_auth_refresh,
};

#[derive(Debug, Clone, Copy)]
pub struct RatingQueries;

#[Object]
impl RatingQueries {
    pub async fn lists(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1, max_items = 100))] manga_ids: Vec<Uuid>,
    ) -> Result<Vec<RatingItem>> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        Ok(client
            .rating()
            .get()
            .manga(manga_ids)
            .send()
            .await?
            .ratings
            .into_iter()
            .map(|i| -> RatingItem { i.into() })
            .collect())
    }
}
