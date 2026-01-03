use std::collections::{HashMap, HashSet};

use itertools::Itertools;
use mangadex_api_input_types::chapter::list::ChapterListParams;
use mangadex_api_schema_rust::v5::MangaReadMarkers;
use tauri::{Manager, Runtime};
use uuid::Uuid;

use crate::{
    store::types::structs::content::ContentFeeder,
    utils::{
        splittable_param::SendSplitted, traits_utils::MangadexTauriManagerExt, watch::SendData,
    },
};

pub async fn has_title_read<M, R>(app: &M, titles: Vec<Uuid>) -> crate::Result<HashMap<Uuid, bool>>
where
    M: Manager<R> + Sync,
    R: Runtime,
{
    let client = app.get_mangadex_client_with_auth_refresh().await?;
    let res = client
        .manga()
        .read()
        .get()
        .manga_ids(titles)
        .grouped(true)
        .send()
        .await?;
    let watches = app.get_watches()?;
    match res {
        MangaReadMarkers::Grouped(g) => Ok(g
            .data
            .into_iter()
            .inspect(|(_, v)| {
                for id in v {
                    watches.read_marker.send_data((*id, true));
                }
            })
            .map(|(k, v)| (k, !v.is_empty()))
            .collect()),
        _ => Err(crate::Error::GotReadMarkersUnGrouped),
    }
}

pub async fn has_chapters_read<M, R>(app: &M, chapters: Vec<Uuid>) -> crate::Result<HashSet<Uuid>>
where
    M: Manager<R> + Sync,
    R: Runtime,
{
    let titles_id = {
        let client = app.get_mangadex_client()?;
        app.app_handle()
            .feed(ChapterListParams {
                chapter_ids: chapters.clone(),
                ..Default::default()
            })
            .send_splitted_default(&client)
            .await?
            .data
            .into_iter()
            .flat_map(|c| {
                c.find_first_relationships(mangadex_api_types_rust::RelationshipType::Manga)
                    .cloned()
            })
            .map(|r| r.id)
            .collect::<HashSet<_>>()
    };
    let chapter_read = {
        let mut chapter_read = HashSet::<Uuid>::new();
        for titles in &titles_id
            .into_iter()
            .chunks(crate::constants::MANGADEX_PAGE_LIMIT.try_into()?)
        {
            let client = app.get_mangadex_client_with_auth_refresh().await?;

            let res = client
                .manga()
                .read()
                .get()
                .manga_ids(titles.collect::<Vec<_>>())
                .send()
                .await?;
            match res {
                MangaReadMarkers::Ungrouped(ug) => {
                    let watches = app.get_watches()?;
                    chapter_read.extend(ug.data.into_iter().inspect(|c| {
                        watches.read_marker.send_data((*c, true));
                    }));
                }
                _ => return Err(crate::Error::GotReadMarkersGrouped),
            }
        }
        chapter_read
    };
    let chapters = chapters.into_iter().collect::<HashSet<_>>();
    Ok(&chapter_read & &chapters)
}
