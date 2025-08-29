use std::{collections::HashMap, fs::File, path::Path};

use async_graphql::InputObject;
use mangadex_api_input_types::{chapter::list::ChapterListParams, manga::list::MangaListParams};
use mangadex_api_schema_rust::v5::MangaReadMarkers;
use mangadex_api_types_rust::{ContentRating, Demographic, MangaStatus, ReadingStatus};
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Runtime};
use url::Url;
use uuid::Uuid;

use crate::{
    constants::MANGADEX_PAGE_LIMIT,
    store::types::structs::content::ContentFeeder,
    utils::{splittable_param::SendSplitted, traits_utils::MangadexTauriManagerExt},
};

#[derive(Debug, Serialize, Deserialize)]
pub struct CSVMangaEntry {
    pub manga_id: Uuid,
    pub title: String,
    pub year: Option<u16>,
    pub reading_status: Option<ReadingStatus>,
    pub my_score: Option<u16>,
    pub my_read_chapters: Option<u32>,
    pub my_read_volumes: Option<u32>,
    pub content_rating: Option<ContentRating>,
    pub demographic: Option<Demographic>,
    pub status: MangaStatus,
    pub description: Option<String>,
    pub amazon_raw: Option<Url>,
    pub anilist_id: Option<String>,
    pub anime_planet_slug: Option<String>,
    pub cd_japan_url: Option<String>,
    pub ebook_japan_url: Option<Url>,
    pub official_english_translation: Option<String>,
    pub kitsu_id: Option<String>,
    pub manga_updates_id: Option<String>,
    pub my_anime_list_id: Option<String>,
    pub novel_updates_id: Option<String>,
    pub raw_url: Option<Url>,
    pub book_walker_url: Option<String>,
    pub md_score: Option<f32>,
    pub forum_url: Option<Url>,
    pub follows: Option<u32>,
}

struct ExportCoreOptions<'a, R: Runtime> {
    app: &'a AppHandle<R>,
    export_path: String,
    include_scores: Option<bool>,
    include_read_chapters: Option<bool>,
    include_read_volumes: Option<bool>,
    statuses: HashMap<Uuid, ReadingStatus>,
    params: MangaListParams,
    include_md_scored: Option<bool>,
    include_forum_url: Option<bool>,
}

async fn export_core<R: Runtime>(options: ExportCoreOptions<'_, R>) -> crate::Result<String> {
    let mut mangas = {
        let client = options.app.get_mangadex_client()?;
        options
            .params
            .send_splitted_default(&client)
            .await?
            .data
            .into_iter()
            .map(|manga| {
                let entry = CSVMangaEntry {
                    manga_id: manga.id,
                    title: manga
                        .attributes
                        .title
                        .values()
                        .next()
                        .cloned()
                        .unwrap_or_default(),
                    year: manga.attributes.year,
                    reading_status: options.statuses.get(&manga.id).copied(),
                    my_score: None,
                    my_read_chapters: None,
                    my_read_volumes: None,
                    content_rating: manga.attributes.content_rating,
                    demographic: manga.attributes.publication_demographic,
                    status: manga.attributes.status,
                    description: manga.attributes.description.values().next().cloned(),
                    amazon_raw: manga
                        .attributes
                        .links
                        .as_ref()
                        .and_then(|d| d.amazon.clone()),
                    anilist_id: manga
                        .attributes
                        .links
                        .as_ref()
                        .and_then(|d| d.anilist.clone()),
                    anime_planet_slug: manga
                        .attributes
                        .links
                        .as_ref()
                        .and_then(|d| d.anime_planet.clone()),
                    cd_japan_url: manga
                        .attributes
                        .links
                        .as_ref()
                        .and_then(|d| d.cd_japan.clone()),
                    ebook_japan_url: manga
                        .attributes
                        .links
                        .as_ref()
                        .and_then(|d| d.ebook_japan.clone()),
                    official_english_translation: manga
                        .attributes
                        .links
                        .as_ref()
                        .and_then(|d| d.english_translation.clone()),
                    kitsu_id: manga
                        .attributes
                        .links
                        .as_ref()
                        .and_then(|d| d.kitsu.clone()),
                    manga_updates_id: manga
                        .attributes
                        .links
                        .as_ref()
                        .and_then(|d| Some(d.manga_updates.clone()?.0)),
                    my_anime_list_id: manga
                        .attributes
                        .links
                        .as_ref()
                        .and_then(|d| Some(d.my_anime_list.clone()?.0)),
                    novel_updates_id: manga
                        .attributes
                        .links
                        .as_ref()
                        .and_then(|d| Some(d.novel_updates.clone()?.0)),
                    raw_url: manga.attributes.links.as_ref().and_then(|d| d.raw.clone()),
                    book_walker_url: manga
                        .attributes
                        .links
                        .as_ref()
                        .and_then(|d| Some(d.book_walker.clone()?.to_string())),
                    md_score: None,
                    forum_url: None,
                    follows: None,
                };
                (manga.id, entry)
            })
            .collect::<HashMap<_, _>>()
    };
    {
        let include_md_score = options.include_md_scored.unwrap_or_default();
        let include_forums_url = options.include_forum_url.unwrap_or_default();
        if include_forums_url || include_md_score {
            let client = options.app.get_mangadex_client()?;
            for ids in mangas
                .keys()
                .copied()
                .collect::<Vec<_>>()
                .chunks(MANGADEX_PAGE_LIMIT.try_into()?)
            {
                'stats: for (id, stats) in client
                    .statistics()
                    .manga()
                    .get()
                    .manga(ids)
                    .send()
                    .await?
                    .statistics
                {
                    let Some(entry) = mangas.get_mut(&id) else {
                        continue 'stats;
                    };
                    if include_md_score {
                        entry.md_score = stats.rating.bayesian;
                    }
                    if let Some(comments) = stats.comments
                        && include_forums_url
                    {
                        entry.forum_url = Url::parse(&format!(
                            "https://forums.mangadex.org/threads/{}",
                            comments.thread_id
                        ))
                        .ok();
                    }
                }
            }
        }
    }
    if options.include_scores.unwrap_or_default() {
        for ids in mangas
            .keys()
            .cloned()
            .collect::<Vec<_>>()
            .chunks(MANGADEX_PAGE_LIMIT.try_into()?)
        {
            let client = options.app.get_mangadex_client_with_auth_refresh().await?;
            for (id, rating) in client.rating().get().manga(ids).send().await?.ratings {
                let Some(entry) = mangas.get_mut(&id) else {
                    continue;
                };
                entry.my_score = Some(rating.rating as u16);
            }
        }
    }
    {
        let include_read_chapters = options.include_read_chapters.unwrap_or_default();
        let include_read_volumes = options.include_read_volumes.unwrap_or_default();
        if include_read_chapters || include_read_volumes {
            for ids in mangas
                .keys()
                .copied()
                .collect::<Vec<_>>()
                .chunks(MANGADEX_PAGE_LIMIT.try_into()?)
            {
                let client = options.app.get_mangadex_client_with_auth_refresh().await?;
                let read_markers = match client
                    .manga()
                    .read()
                    .get()
                    .manga_ids(ids)
                    .grouped(true)
                    .send()
                    .await?
                {
                    MangaReadMarkers::Grouped(grouped) => grouped.data,
                    _ => continue,
                };
                for (id, read_chapters) in read_markers {
                    let Some(manga_entry) = mangas.get_mut(&id) else {
                        continue;
                    };
                    if !read_chapters.is_empty() {
                        let read_chapters = ChapterListParams {
                            chapter_ids: read_chapters,
                            ..Default::default()
                        }
                        .send_splitted_default(&client)
                        .await?
                        .data;
                        if include_read_chapters {
                            let maybe_read_chapters = read_chapters
                                .iter()
                                .flat_map(|c| c.attributes.chapter.as_ref()?.parse::<u32>().ok())
                                .max();
                            if let Some(read_chapters) = maybe_read_chapters {
                                manga_entry.my_read_chapters = Some(read_chapters);
                            }
                        }
                        if include_read_volumes {
                            let maybe_read_volumes = read_chapters
                                .iter()
                                .flat_map(|c| c.attributes.volume.as_ref()?.parse::<u32>().ok())
                                .max();
                            if let Some(read_volumes) = maybe_read_volumes {
                                manga_entry.my_read_volumes = Some(read_volumes);
                            }
                        }
                    }
                    // tokio::time::sleep(std::time::Duration::from_millis(200)).await;
                }
            }
        }
    }
    let export_path = Path::new(&options.export_path);
    let mut to_use_file = File::create(export_path)?;
    {
        let mut writer = csv::Writer::from_writer(&mut to_use_file);
        for entry in mangas.into_values() {
            writer.serialize(entry)?;
        }
        writer.flush()?;
    }
    export_path
        .to_str()
        .map(String::from)
        .ok_or(crate::Error::PathToStr)
}

#[derive(Debug, InputObject)]
pub struct ExportMDLibraryToCSVOptions {
    pub export_path: String,
    pub include_scores: Option<bool>,
    pub include_read_chapters: Option<bool>,
    pub include_read_volumes: Option<bool>,
    pub has_available_chapters: Option<bool>,
    pub exclude_content_profile: Option<bool>,
    pub include_md_score: Option<bool>,
    pub include_forum_url: Option<bool>,
}

pub async fn export_library_to_csv<R>(
    app: &AppHandle<R>,
    options: ExportMDLibraryToCSVOptions,
) -> crate::Result<String>
where
    R: Runtime,
{
    let statuses = {
        let client = app.get_mangadex_client_with_auth_refresh().await?;
        client.manga().status().get().send().await?.statuses
    };

    let mut params = MangaListParams {
        manga_ids: statuses.keys().copied().collect(),
        has_available_chapters: options.has_available_chapters,
        ..Default::default()
    };
    if !options.exclude_content_profile.unwrap_or_default() {
        params = app.feed(params);
    }

    export_core(ExportCoreOptions {
        app,
        export_path: options.export_path,
        include_scores: options.include_scores,
        include_read_chapters: options.include_read_chapters,
        include_read_volumes: options.include_read_volumes,
        statuses,
        params,
        include_md_scored: options.include_md_score,
        include_forum_url: options.include_forum_url,
    })
    .await
}

#[derive(Debug, InputObject)]
pub struct ExportIdsLibraryToCSVOptions {
    pub export_path: String,
    pub include_scores: Option<bool>,
    pub include_read_chapters: Option<bool>,
    pub include_read_volumes: Option<bool>,
    pub include_reading_status: Option<bool>,
    pub ids: Vec<Uuid>,
    pub include_md_score: Option<bool>,
    pub include_forum_url: Option<bool>,
}

pub async fn export_ids_to_csv<R>(
    app: &AppHandle<R>,
    options: ExportIdsLibraryToCSVOptions,
) -> crate::Result<String>
where
    R: Runtime,
{
    let statuses = if options.include_reading_status.unwrap_or_default() {
        let client = app.get_mangadex_client_with_auth_refresh().await?;
        client.manga().status().get().send().await?.statuses
    } else {
        Default::default()
    };

    let params = MangaListParams {
        manga_ids: options.ids,
        ..Default::default()
    };

    export_core(ExportCoreOptions {
        app,
        export_path: options.export_path,
        include_scores: options.include_scores,
        include_read_chapters: options.include_read_chapters,
        include_read_volumes: options.include_read_volumes,
        statuses,
        params,
        include_md_scored: options.include_md_score,
        include_forum_url: options.include_forum_url,
    })
    .await
}
