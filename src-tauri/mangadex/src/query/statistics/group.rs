use std::ops::Deref;

use crate::{error::Error, Result};
use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::{
    constants::MANGADEX_PAGE_LIMIT,
    objects::statistics::Statistics,
    utils::{
        get_mangadex_client_from_graphql_context, get_watches_from_graphql_context, watch::SendData,
    },
};

#[derive(Debug, Clone, Copy)]
pub struct GroupStatisticsQueries;

#[Object]
impl GroupStatisticsQueries {
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<Statistics> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let statistics = client
            .statistics()
            .group()
            .id(id)
            .get()
            .send()
            .await?
            .statistics;
        let res = statistics
            .get_key_value(&id)
            .map(|(k, v)| -> Statistics { Statistics::from((*k, *v)) })
            .ok_or(Error::CannotFindStatistics)?;
        let _ = watches.statistics.send_data(res);
        Ok(res)
    }
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1))] ids: Vec<Uuid>,
    ) -> Result<Vec<Statistics>> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();

        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut res: Vec<Statistics> = Vec::new();
        for ids in ids.chunks(MANGADEX_PAGE_LIMIT.try_into()?) {
            let statistics = client
                .statistics()
                .group()
                .get()
                .group(ids)
                .send()
                .await?
                .statistics;
            statistics
                .into_iter()
                .map(Statistics::from)
                .for_each(|v| res.push(v));
        }

        let _res = res.clone();

        tauri::async_runtime::spawn(async move {
            for data in _res {
                let _ = watches.statistics.send_data(data);
            }
        });

        Ok(res)
    }
}
