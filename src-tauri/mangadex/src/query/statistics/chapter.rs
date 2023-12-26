use async_graphql::{Context, Error, Object, Result};
use uuid::Uuid;

use crate::{objects::statistics::Statistics, utils::get_mangadex_client_from_graphql_context};

#[derive(Debug, Clone, Copy)]
pub struct ChapterStatisticsQueries;

#[Object]
impl ChapterStatisticsQueries {
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<Statistics> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let statistics = client
            .statistics()
            .chapter()
            .id(id)
            .get()
            .send()
            .await?
            .statistics;
        statistics
            .get_key_value(&id)
            .map(|(k, v)| -> Statistics { Statistics::from((*k, *v)) })
            .ok_or(Error::new(
                "Can't find the statistics for the given chapter id",
            ))
    }
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1, max_items = 100))] ids: Vec<Uuid>,
    ) -> Result<Vec<Statistics>> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let statistics = client
            .statistics()
            .chapter()
            .get()
            .chapter(ids)
            .send()
            .await?
            .statistics;
        Ok(statistics.into_iter().map(Statistics::from).collect())
    }
}
