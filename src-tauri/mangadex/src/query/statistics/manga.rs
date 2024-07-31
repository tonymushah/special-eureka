use std::ops::Deref;

use crate::{error::Error, Result};
use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::{
    objects::statistics::manga::MangaStatistics as Statistics,
    utils::{
        get_mangadex_client_from_graphql_context, get_watches_from_graphql_context, watch::SendData,
    },
};

#[derive(Debug, Clone, Copy)]
pub struct MangaStatisticsQueries;

#[Object]
impl MangaStatisticsQueries {
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<Statistics> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;

        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let statistics = client
            .statistics()
            .manga()
            .id(id)
            .get()
            .send()
            .await?
            .statistics;

        let res = statistics
            .get_key_value(&id)
            .map(|(k, v)| -> Statistics { Statistics::from((*k, *v)) })
            .ok_or(Error::new(
                "Can't find the statistics for the given manga id",
            ))?;

        let _ = watches.manga_statistics.send_data(res);

        Ok(res)
    }
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1, max_items = 100))] ids: Vec<Uuid>,
    ) -> Result<Vec<Statistics>> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();

        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let statistics = client
            .statistics()
            .manga()
            .get()
            .manga(ids)
            .send()
            .await?
            .statistics;
        let res: Vec<Statistics> = statistics.into_iter().map(Statistics::from).collect();

        let _res = res.clone();

        tauri::async_runtime::spawn(async move {
            for data in _res {
                let _ = watches.manga_statistics.send_data(data);
            }
        });

        Ok(res)
    }
}
