use std::ops::Deref;

use crate::Result;
use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::{
    constants::MANGADEX_PAGE_LIMIT,
    objects::rating::RatingItem,
    utils::{
        get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_watches_from_graphql_context, watch::SendData,
    },
};

#[derive(Debug, Clone, Copy)]
pub struct RatingQueries;

#[Object]
impl RatingQueries {
    pub async fn lists(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1))] manga_ids: Vec<Uuid>,
    ) -> Result<Vec<RatingItem>> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        let mut res: Vec<RatingItem> = Vec::new();
        for ids in manga_ids.chunks(MANGADEX_PAGE_LIMIT.try_into()?) {
            client
                .rating()
                .get()
                .manga(ids)
                .send()
                .await?
                .ratings
                .into_iter()
                .map(|i| -> RatingItem { i.into() })
                .for_each(|rating| {
                    res.push(rating);
                });
        }
        let _res = res.clone();
        tauri::async_runtime::spawn(async move {
            for data in _res {
                let _ = watches.rating.send_data(data);
            }
        });
        Ok(res)
    }
}
