use std::collections::HashSet;

use crate::{
    Result,
    error::Error,
    objects::chapter::Chapter,
    utils::{
        source::SendMultiSourceData,
        splittable_param::SendSplitted,
        traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
    },
};
use async_graphql::{Context, Object};
use mangadex_api_input_types::chapter::list::ChapterListParams;
use mangadex_api_schema_rust::v5::MangaReadMarkers;
use mangadex_api_types_rust::RelationshipType;
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
#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
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
    pub async fn chapter_read_markers(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1))] chapters: Vec<Uuid>,
    ) -> Result<Vec<Uuid>> {
        let manga_ids = {
            let app = ctx.get_app_handle::<tauri::Wry>()?;
            let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
            let chapter_ids = chapters.clone();
            let params = ChapterListParams {
                chapter_ids,
                ..Default::default()
            };
            let client = app.get_mangadex_client()?;
            let chapters = params.send_splitted_default(&client).await?;
            chapters
                .data
                .into_iter()
                .inspect(|item| {
                    let chapter: Chapter = item.clone().into();
                    let _ = watches.chapter.send_online(chapter);
                })
                .flat_map(|d| {
                    let manga = d.find_first_relationships(RelationshipType::Manga)?;
                    Some(manga.id)
                })
                .collect::<HashSet<_>>()
        };
        let read_chapters = self
            .manga_read_markers(ctx, manga_ids.into_iter().collect())
            .await?;
        {
            let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
            for unread in chapters
                .iter()
                .filter(|chapter| !read_chapters.contains(*chapter))
            {
                let _ = watches.read_marker.send_data((*unread, false));
            }
        }
        Ok(read_chapters)
    }
}
