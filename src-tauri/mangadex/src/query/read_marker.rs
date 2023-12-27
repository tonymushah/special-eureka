use async_graphql::{Context, Error, Object, Result};
use mangadex_api_schema_rust::v5::MangaReadMarkers;
use uuid::Uuid;

use crate::{
    objects::read_marker::{grouped::MangaReadMarkerGroupedItems, user_history::UserHistoryEntry},
    utils::get_mangadex_client_from_graphql_context_with_auth_refresh,
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
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        Ok(client.manga().id(manga_id).read().get().send().await?.data)
    }
    pub async fn manga_read_markers(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1, max_items = 100))] manga_ids: Vec<Uuid>,
    ) -> Result<Vec<Uuid>> {
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
            Ok(res.data)
        } else {
            Err(Error::new("Invalid Response : Expected `MangaReadMarkers::Ungrouped` found `MangaReadMarkers::Grouped`"))
        }
    }
    pub async fn manga_read_markers_grouped(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1, max_items = 100))] manga_ids: Vec<Uuid>,
    ) -> Result<Vec<MangaReadMarkerGroupedItems>> {
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
                .map(|i| -> MangaReadMarkerGroupedItems { i.into() })
                .collect())
        } else {
            Err(Error::new("Invalid Response : Expected `MangaReadMarkers::Grouped` found `MangaReadMarkers::Ungrouped`"))
        }
    }
    pub async fn user_history(&self, ctx: &Context<'_>) -> Result<Vec<UserHistoryEntry>> {
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
            .map(|entry| -> UserHistoryEntry { entry.into() })
            .collect())
    }
}
