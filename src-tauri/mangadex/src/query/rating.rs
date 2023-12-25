use async_graphql::{Context, Object, Result};
use uuid::Uuid;

use crate::{objects::rating::RatingItem, utils::get_mangadex_client_from_graphql_context};

#[derive(Debug, Clone, Copy)]
pub struct RatingQueries;

#[Object]
impl RatingQueries {
    pub async fn lists(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1, max_items = 100))] manga_ids: Vec<Uuid>,
    ) -> Result<Vec<RatingItem>> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
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
