use crate::{error::Error, Result};
use async_graphql::{Context, Object};
use mangadex_api_schema_rust::v5::MangaReadMarkers;
use uuid::Uuid;

use crate::{
    objects::read_marker::{grouped::MangaReadMarkerGroupedItems, user_history::UserHistoryEntry},
    utils::{
        get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_watches_from_graphql_context, watch::SendData,
    },
};

#[derive(Debug, Clone, Copy)]
pub struct ReadMarkerQueries;

#[Object]
impl ReadMarkerQueries {
    pub async fn manga_read_markers_by_manga_id(
        &self,
        ctx: &Context<'_>,
        manga_id: Uuid,
    ) -> Result<Vec<Uuid>> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let data = client.manga().id(manga_id).read().get().send().await?.data;
        data.iter().for_each(|id| {
            let _ = watches.read_marker.send_data((*id, true));
        });
        Ok(data)
    }
    pub async fn manga_read_markers(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1, max_items = 100))] manga_ids: Vec<Uuid>,
    ) -> Result<Vec<Uuid>> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        if let MangaReadMarkers::Ungrouped(res) = client
            .manga()
            .read()
            .get()
            .manga_ids(manga_ids)
            .send()
            .await?
        {
            res.data.iter().for_each(|id| {
                let _ = watches.read_marker.send_data((*id, true));
            });
            Ok(res.data)
        } else {
            Err(Error::GotReadMarkersGrouped)
        }
    }
    pub async fn manga_read_markers_grouped(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1, max_items = 100))] manga_ids: Vec<Uuid>,
    ) -> Result<Vec<MangaReadMarkerGroupedItems>> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        if let MangaReadMarkers::Grouped(res) = client
            .manga()
            .read()
            .get()
            .manga_ids(manga_ids)
            .grouped(true)
            .send()
            .await?
        {
            Ok(res
                .data
                .into_iter()
                .map(|i| -> MangaReadMarkerGroupedItems {
                    i.1.iter().for_each(|id| {
                        let _ = watches.read_marker.send_data((*id, true));
                    });
                    i.into()
                })
                .collect())
        } else {
            Err(Error::GotReadMarkersUnGrouped)
        }
    }
    pub async fn user_history(&self, ctx: &Context<'_>) -> Result<Vec<UserHistoryEntry>> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        Ok(client
            .user()
            .history()
            .get()
            .send()
            .await?
            .ratings
            .into_iter()
            .map(|entry| -> UserHistoryEntry {
                let _ = watches.read_marker.send_data((entry.chapter_id, true));
                entry.into()
            })
            .collect())
    }
}
