use crate::{error::Error, Result};
use async_graphql::{Context, Object};
use mangadex_api_schema_rust::v5::MangaReadMarkers;
use uuid::Uuid;

use crate::{
    constants::MANGADEX_PAGE_LIMIT,
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
        #[graphql(validator(min_items = 1))] manga_ids: Vec<Uuid>,
    ) -> Result<Vec<Uuid>> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let mut to_ret = Vec::<Uuid>::default();
        for ids in manga_ids.chunks(MANGADEX_PAGE_LIMIT.try_into()?) {
            if let MangaReadMarkers::Ungrouped(res) =
                client.manga().read().get().manga_ids(ids).send().await?
            {
                res.data.into_iter().for_each(|id| {
                    to_ret.push(id);
                    let _ = watches.read_marker.send_data((id, true));
                });
            } else {
                return Err(Error::GotReadMarkersGrouped);
            }
        }

        Ok(to_ret)
    }
    pub async fn manga_read_markers_grouped(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1))] manga_ids: Vec<Uuid>,
    ) -> Result<Vec<MangaReadMarkerGroupedItems>> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let mut to_ret = Vec::<MangaReadMarkerGroupedItems>::default();
        for ids in manga_ids.chunks(MANGADEX_PAGE_LIMIT.try_into()?) {
            if let MangaReadMarkers::Grouped(res) = client
                .manga()
                .read()
                .get()
                .manga_ids(ids)
                .grouped(true)
                .send()
                .await?
            {
                res.data.into_iter().for_each(|(id, chapters)| {
                    chapters.iter().for_each(|id| {
                        let _ = watches.read_marker.send_data((*id, true));
                    });
                    to_ret.push(MangaReadMarkerGroupedItems {
                        manga_id: id,
                        chapters,
                    });
                });
            } else {
                return Err(Error::GotReadMarkersUnGrouped);
            }
        }

        Ok(to_ret)
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
