use std::collections::HashMap;

use crate::{
    Result,
    objects::chapter::Chapter,
    store::types::structs::content::ContentFeeder,
    utils::{
        source::SendMultiSourceData,
        splittable_param::SendSplitted,
        traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
    },
};
use async_graphql::{Context, Object};
use mangadex_api_input_types::{
    chapter::list::ChapterListParams, read_marker::batch_read_marker::MarkChapterBatchParam,
};
use mangadex_api_types_rust::RelationshipType;
use uuid::Uuid;

use crate::utils::{
    get_mangadex_client_from_graphql_context_with_auth_refresh, get_watches_from_graphql_context,
    watch::SendData,
};

#[derive(Debug, Clone, Copy)]
pub struct ReadMarkerMutations;

#[Object]
impl ReadMarkerMutations {
    pub async fn manga_read_markers_batch(
        &self,
        ctx: &Context<'_>,
        params: MarkChapterBatchParam,
    ) -> Result<bool> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        params.clone().send(&client).await?;
        params.chapter_ids_read.iter().for_each(|id| {
            let _ = watches.read_marker.send_data((*id, true));
        });
        params.chapter_ids_unread.iter().for_each(|id| {
            let _ = watches.read_marker.send_data((*id, false));
        });
        Ok(true)
    }
    pub async fn read_markers_batch(
        &self,
        ctx: &Context<'_>,
        chapter_ids_read: Vec<Uuid>,
        chapter_ids_unread: Vec<Uuid>,
        update_history: Option<bool>,
        feed_content: Option<bool>,
    ) -> Result<bool> {
        let manga_chapter_ids: HashMap<Uuid, Vec<Uuid>> = {
            let app = ctx.get_app_handle::<tauri::Wry>()?;
            let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
            let chapter_ids = {
                let mut v = Vec::<Uuid>::new();
                v.extend(chapter_ids_read.iter().copied());
                v.extend(chapter_ids_unread.iter().copied());
                v.dedup();
                v
            };
            let mut params = ChapterListParams {
                chapter_ids,
                ..Default::default()
            };
            if feed_content.unwrap_or(true) {
                params = app.feed(params);
            } else {
				params.content_rating = crate::constants::ALL_CONTENT_RATING;
			}
            let client = app.get_mangadex_client()?;
            let chapters = params.send_splitted_default(&client).await?;
            chapters
                .data
                .into_iter()
                .inspect(|item| {
                    let chapter: Chapter = item.clone().into();
                    let _ = watches.chapter.send_online(chapter);
                })
                .fold(HashMap::<Uuid, Vec<Uuid>>::new(), |mut state, item| {
                    if let Some(manga) = item.find_first_relationships(RelationshipType::Manga) {
                        state.entry(manga.id).or_default().push(item.id);
                    }
                    state
                })
        };
        let params = manga_chapter_ids.into_iter().fold(
            Vec::<MarkChapterBatchParam>::new(),
            |mut params, (manga_id, chapter_ids)| {
                let param = MarkChapterBatchParam {
                    manga_id,
                    chapter_ids_read: chapter_ids_read
                        .iter()
                        .filter(|id| chapter_ids.contains(id))
                        .copied()
                        .collect(),
                    chapter_ids_unread: chapter_ids_unread
                        .iter()
                        .filter(|id| chapter_ids.contains(id))
                        .copied()
                        .collect(),
                    update_history: update_history.unwrap_or_default(),
                };
                params.push(param);
                params
            },
        );
        for param in params {
            self.manga_read_markers_batch(ctx, param).await?;
        }
        Ok(true)
    }
}
