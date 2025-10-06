use std::{
    collections::{HashMap, HashSet},
    fmt::Display,
    fs::File,
    io::{BufWriter, Write},
    path::Path,
    str::FromStr,
};

use async_graphql::{Enum, InputObject};
use mangadex_api::MangaDexClient;
use mangadex_api_input_types::{chapter::list::ChapterListParams, manga::list::MangaListParams};
use mangadex_api_schema_rust::v5::manga_read_markers::MangaReadMarkers;
use mangadex_api_types_rust::{ReadingStatus, RelationshipType};
use serde::{Deserialize, Serialize, Serializer};
use tauri::{AppHandle, Emitter, Runtime};
use uuid::Uuid;

use crate::{
    constants::MANGADEX_PAGE_LIMIT,
    store::types::structs::content::ContentFeeder,
    utils::{
        source::SendMultiSourceData, splittable_param::SendSplitted,
        traits_utils::MangadexTauriManagerExt,
    },
};

#[derive(Debug, Serialize, Clone)]
enum ExportState {
    Preloading,
    GettingStatuses,
    GettingTitlesData,
    GettingScores,
    FetchingReadChapter { manga: Uuid },
    AssemblingInfo,
    WritingToFile,
}

#[derive(Debug, Serialize, Clone)]
struct ExportEventPayload {
    progress: u8,
    state: ExportState,
}

const EVENT_KEY: &str = "special-eureka://mangadex/export-to-mal";

fn emit_event<R: Runtime>(app: &AppHandle<R>, progress: u8, state: ExportState) {
    if let Err(err) = app.emit(EVENT_KEY, ExportEventPayload { progress, state }) {
        log::warn!("{err}");
    }
}

macro_rules! increment_return {
    ($val:ident) => {{
        $val += 1;
        $val
    }};
    ($val:ident, $inc:expr) => {{
        $val += $inc;
        $val
    }};
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct MyInfo {
    pub user_id: String,
    pub user_name: String,
    // TODO Convert to enum
    pub user_export_type: u16,
    pub user_total_manga: u32,
    pub user_total_reading: u32,
    pub user_total_completed: u32,
    pub user_total_onhold: u32,
    pub user_total_dropped: u32,
    pub user_total_plantoread: u32,
}

#[derive(Debug, Clone, Default)]
pub struct CData(pub Option<String>);

impl Display for CData {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "<![CDATA[{}]]>", self.0.clone().unwrap_or_default())?;
        Ok(())
    }
}

#[derive(Debug, Serialize, Deserialize, Clone, Copy, Enum, PartialEq, Eq, PartialOrd, Ord)]
pub enum MALTitlePriority {
    Low,
    Medium,
    High,
}

#[derive(Debug, Clone, Copy, Enum, Default, PartialEq, Eq, PartialOrd, Ord)]
pub enum YesNo {
    Yes,
    #[default]
    No,
}

impl Display for YesNo {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            YesNo::No => write!(f, "NO")?,
            YesNo::Yes => write!(f, "YES")?,
        };
        Ok(())
    }
}

#[derive(Debug, thiserror::Error)]
#[error("Invalid yes/no input")]
#[non_exhaustive]
pub struct YesNoParse;

impl FromStr for YesNo {
    type Err = YesNoParse;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "YES" => Ok(Self::Yes),
            "NO" => Ok(Self::No),
            "yes" => Ok(Self::Yes),
            "no" => Ok(Self::No),
            "Yes" => Ok(Self::Yes),
            "No" => Ok(Self::No),
            _ => Err(YesNoParse),
        }
    }
}

impl Serialize for YesNo {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

impl<'de> Deserialize<'de> for YesNo {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        String::deserialize(deserializer)?
            .parse::<YesNo>()
            .map_err(<D::Error as serde::de::Error>::custom)
    }
}

impl From<YesNo> for bool {
    fn from(value: YesNo) -> Self {
        match value {
            YesNo::Yes => true,
            YesNo::No => false,
        }
    }
}

impl From<bool> for YesNo {
    fn from(value: bool) -> Self {
        if value { Self::Yes } else { Self::No }
    }
}

#[derive(Debug, Serialize, Default)]
pub struct MangaEntry {
    pub manga_mangadb_id: String,
    pub manga_title: String,
    pub my_read_volumes: String,
    pub my_read_chapters: String,
    pub my_start_date: String,
    pub my_finish_date: String,
    pub my_scanalation_group: String,
    pub my_score: u16,
    pub my_storage: Option<u32>,
    pub my_retail_volumes: u32,
    #[serde(serialize_with = "serialize_my_status")]
    pub my_status: Option<ReadingStatus>,
    pub my_comments: String,
    pub my_times_read: u32,
    pub my_tags: String,
    #[serde(serialize_with = "serialize_my_priority")]
    pub my_priority: Option<MALTitlePriority>,
    pub my_reread_value: String,
    pub my_rereading: YesNo,
    pub my_discuss: YesNo,
    pub my_sns: String,
    #[serde(serialize_with = "serialize_bool_as_u8")]
    pub update_on_import: bool,
}

fn serialize_my_status<S>(value: &Option<ReadingStatus>, serializer: S) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    if let Some(status) = value.as_ref() {
        match status {
            ReadingStatus::Completed => serializer.serialize_str("Completed"),
            ReadingStatus::Dropped => serializer.serialize_str("Dropped"),
            ReadingStatus::OnHold => serializer.serialize_str("On-Hold"),
            ReadingStatus::PlanToRead => serializer.serialize_str("Plan to Read"),
            ReadingStatus::Reading => serializer.serialize_str("Reading"),
            ReadingStatus::ReReading => serializer.serialize_str("Re-Reading"),
        }
    } else {
        serializer.serialize_str("")
    }
}

fn serialize_my_priority<S>(
    value: &Option<MALTitlePriority>,
    serializer: S,
) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    if let Some(priority) = value.as_ref() {
        match priority {
            MALTitlePriority::Low => serializer.serialize_str("Low"),
            MALTitlePriority::Medium => serializer.serialize_str("Medium"),
            MALTitlePriority::High => serializer.serialize_str("High"),
        }
    } else {
        serializer.serialize_str("")
    }
}

#[derive(Debug, Serialize, Default)]
#[serde(rename = "myanimelist")]
pub struct MyAnimeListXml {
    pub my_info: MyInfo,
    pub manga: Vec<MangaEntry>,
}

fn serialize_bool_as_u8<S>(value: &bool, serializer: S) -> Result<S::Ok, S::Error>
where
    S: serde::Serializer,
{
    serializer.serialize_u8(if *value { 1 } else { 0 })
}

#[derive(Debug, Clone, InputObject, Copy)]
pub struct ReadingStatusPriorities {
    pub completed: MALTitlePriority,
    pub dropped: MALTitlePriority,
    pub on_hold: MALTitlePriority,
    pub plan_to_read: MALTitlePriority,
    pub reading: MALTitlePriority,
    pub re_reading: MALTitlePriority,
}

impl Default for ReadingStatusPriorities {
    fn default() -> Self {
        Self {
            completed: MALTitlePriority::Low,
            dropped: MALTitlePriority::Low,
            on_hold: MALTitlePriority::Medium,
            plan_to_read: MALTitlePriority::Medium,
            re_reading: MALTitlePriority::High,
            reading: MALTitlePriority::High,
        }
    }
}

struct ExportCoreOptions<'a, R: Runtime> {
    app: &'a AppHandle<R>,
    client: &'a MangaDexClient,
    params: MangaListParams,
    priorities: Option<ReadingStatusPriorities>,
    include_read_chapters: Option<bool>,
    include_read_volumes: Option<bool>,
    include_score: Option<bool>,
    export_path: String,
    statuses: HashMap<Uuid, ReadingStatus>,
    progress: u8,
    user_name: String,
    user_id: String,
    allow_none_status: bool,
}

async fn export_core<R: Runtime>(options: ExportCoreOptions<'_, R>) -> crate::Result<String> {
    let priorities = options.priorities.unwrap_or_default();
    let mut progress = options.progress;
    emit_event(
        options.app,
        increment_return!(progress),
        ExportState::GettingTitlesData,
    );
    let mut mangas: HashMap<Uuid, MangaEntry> = {
        let data = options
            .params
            .send_splitted_default(options.client)
            .await?
            .data;
        {
            let mangas = data
                .iter()
                .cloned()
                .map(crate::objects::manga::MangaObject::from)
                .collect::<Vec<_>>();
            let watches = (*options.app.get_watches()?).clone();
            tauri::async_runtime::spawn(async move {
                for data in mangas {
                    let _ = watches.manga.send_online(data);
                }
            });
        }
        data.into_iter()
            .flat_map(|manga| {
                let title_id = manga.attributes.links?.my_anime_list?.0;
                let status = options.statuses.get(&manga.id).copied();
                if status.is_none() && !options.allow_none_status {
                    return None;
                }
                let priority = status.map(|status| match status {
                    ReadingStatus::Completed => priorities.completed,
                    ReadingStatus::Dropped => priorities.dropped,
                    ReadingStatus::OnHold => priorities.on_hold,
                    ReadingStatus::PlanToRead => priorities.plan_to_read,
                    ReadingStatus::Reading => priorities.reading,
                    ReadingStatus::ReReading => priorities.re_reading,
                });
                let times_read: u32 = match status {
                    Some(ReadingStatus::Completed)
                    | Some(ReadingStatus::Dropped)
                    | Some(ReadingStatus::ReReading) => 1,
                    _ => 0,
                };
                Some((
                    manga.id,
                    MangaEntry {
                        manga_mangadb_id: title_id,
                        manga_title: manga.attributes.title.values().next()?.clone(),
                        my_start_date: "0000-00-00".into(),
                        my_finish_date: "0000-00-00".into(),
                        my_scanalation_group: CData::default().to_string(),
                        my_status: status,
                        my_comments: CData::default().to_string(),
                        my_times_read: times_read,
                        my_tags: CData::default().to_string(),
                        my_priority: priority,
                        my_discuss: YesNo::Yes,
                        my_sns: "default".into(),
                        update_on_import: true,
                        ..Default::default()
                    },
                ))
            })
            .collect()
    };

    if options.include_score.unwrap_or_default() {
        emit_event(
            options.app,
            increment_return!(progress),
            ExportState::GettingScores,
        );
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
                entry.my_score = rating.rating as u16;
            }
        }
    }
    {
        let include_read_chapters = options.include_read_chapters.unwrap_or_default();
        let include_read_volumes = options.include_read_volumes.unwrap_or_default();
        if include_read_chapters || include_read_volumes {
            let titles_len = mangas.len();

            let mut index: usize = 0;
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
                    _ => {
                        index += ids.len();
                        continue;
                    }
                };
                for (id, read_chapters) in read_markers {
                    let Some(manga_entry) = mangas.get_mut(&id) else {
                        index += 1;
                        continue;
                    };
                    emit_event(
                        options.app,
                        increment_return!(progress, {
                            let p: u8 = (index / titles_len).try_into()?;
                            p * (u8::MAX - 12)
                        }),
                        ExportState::FetchingReadChapter { manga: id },
                    );
                    if !read_chapters.is_empty() {
                        let read_chapters = ChapterListParams {
                            chapter_ids: read_chapters,
                            // might exclude some titles
                            content_rating: crate::constants::ALL_CONTENT_RATING.into(),
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
                                manga_entry.my_read_chapters = read_chapters.to_string();
                            }
                        }
                        if include_read_volumes {
                            let maybe_read_volumes = read_chapters
                                .iter()
                                .flat_map(|c| c.attributes.volume.as_ref()?.parse::<u32>().ok())
                                .max();
                            if let Some(read_volumes) = maybe_read_volumes {
                                manga_entry.my_read_volumes = read_volumes.to_string();
                            }
                        }
                    }
                    // tokio::time::sleep(std::time::Duration::from_millis(200)).await;
                    index += 1;
                }
            }
        }
    }

    emit_event(
        options.app,
        increment_return!(progress),
        ExportState::AssemblingInfo,
    );
    let my_info = MyInfo {
        user_id: options.user_id,
        user_name: options.user_name,
        user_export_type: 2,
        user_total_manga: mangas.len().try_into()?,
        user_total_reading: mangas
            .values()
            .filter(|entry| entry.my_status == Some(ReadingStatus::Reading))
            .count()
            .try_into()?,
        user_total_completed: mangas
            .values()
            .filter(|entry| entry.my_status == Some(ReadingStatus::Completed))
            .count()
            .try_into()?,
        user_total_onhold: mangas
            .values()
            .filter(|entry| entry.my_status == Some(ReadingStatus::OnHold))
            .count()
            .try_into()?,
        user_total_dropped: mangas
            .values()
            .filter(|entry| entry.my_status == Some(ReadingStatus::Dropped))
            .count()
            .try_into()?,
        user_total_plantoread: mangas
            .values()
            .filter(|entry| entry.my_status == Some(ReadingStatus::PlanToRead))
            .count()
            .try_into()?,
    };
    let xml_data = MyAnimeListXml {
        my_info,
        manga: mangas.into_values().collect(),
    };

    emit_event(
        options.app,
        increment_return!(progress),
        ExportState::WritingToFile,
    );
    let export_path = <String as AsRef<Path>>::as_ref(&options.export_path).to_path_buf();
    let mut to_use_file = File::create(&export_path)?;
    {
        let mut buf_writer = BufWriter::new(&mut to_use_file);
        serde_xml_rs::to_writer(&mut buf_writer, &xml_data)?;
        buf_writer.flush()?;
    }
    export_path
        .to_str()
        .map(String::from)
        .ok_or(crate::Error::PathToStr)
}

#[derive(Debug, Clone, InputObject)]
pub struct MDLibraryToMyAnimeListExportOption {
    pub user_name: String,
    pub user_id: String,
    pub priorities: Option<ReadingStatusPriorities>,
    pub include_read_chapters: Option<bool>,
    pub include_read_volumes: Option<bool>,
    pub include_score: Option<bool>,
    pub export_path: String,
    pub exclude_content_profile: Option<bool>,
    pub has_available_chapters: Option<bool>,
}

// TODO Implement start_date and finish date
pub async fn export_md_library_to_my_anime_list<R>(
    app: &AppHandle<R>,
    option: MDLibraryToMyAnimeListExportOption,
) -> crate::Result<String>
where
    R: Runtime,
{
    let mut progress = 0;
    emit_event(app, progress, ExportState::Preloading);

    let client = app.get_mangadex_client_with_auth_refresh().await?;

    emit_event(
        app,
        increment_return!(progress),
        ExportState::GettingStatuses,
    );
    let statuses = { client.manga().status().get().send().await?.statuses };

    emit_event(
        app,
        increment_return!(progress),
        ExportState::GettingTitlesData,
    );
    let mut params = MangaListParams {
        manga_ids: statuses.keys().cloned().collect(),
        has_available_chapters: option.has_available_chapters,
        ..Default::default()
    };
    if !option.exclude_content_profile.unwrap_or_default() {
        params = app.feed(params);
    }

    export_core(ExportCoreOptions {
        app,
        client: &client,
        params,
        priorities: option.priorities,
        progress,
        statuses,
        include_read_chapters: option.include_read_chapters,
        include_read_volumes: option.include_read_volumes,
        include_score: option.include_score,
        export_path: option.export_path,
        user_name: option.user_name,
        user_id: option.user_id,
        allow_none_status: false,
    })
    .await
}

#[derive(Debug, Clone, InputObject)]
pub struct MDIdsToMyAnimeListExportOption {
    pub user_name: String,
    pub user_id: String,
    pub priorities: Option<ReadingStatusPriorities>,
    pub include_read_chapters: Option<bool>,
    pub include_read_volumes: Option<bool>,
    pub include_score: Option<bool>,
    pub export_path: String,
    pub ids: Vec<Uuid>,
}

pub async fn export_manga_ids_to_my_anime_list<R>(
    app: &AppHandle<R>,
    option: MDIdsToMyAnimeListExportOption,
) -> crate::Result<String>
where
    R: Runtime,
{
    let mut progress = 0;
    emit_event(app, progress, ExportState::Preloading);

    emit_event(
        app,
        increment_return!(progress),
        ExportState::GettingStatuses,
    );
    let statuses = match app.get_mangadex_client_with_auth_refresh().await {
        Ok(client) => client
            .manga()
            .status()
            .get()
            .send()
            .await
            .map(|res| res.statuses)
            .unwrap_or_default()
            .into_iter()
            .filter(|(id, _)| option.ids.contains(id))
            .collect::<HashMap<_, _>>(),
        Err(_) => Default::default(),
    };

    let params = MangaListParams {
        manga_ids: option.ids,
        ..Default::default()
    };

    let client = app.get_mangadex_client()?;
    export_core(ExportCoreOptions {
        app,
        client: &client,
        params,
        priorities: option.priorities,
        progress,
        statuses,
        include_read_chapters: option.include_read_chapters,
        include_read_volumes: option.include_read_volumes,
        include_score: option.include_score,
        export_path: option.export_path,
        user_name: option.user_name,
        user_id: option.user_id,
        allow_none_status: true,
    })
    .await
}

#[derive(Debug, Clone, InputObject)]
pub struct MDCustomListsToMyAnimeListExportOption {
    pub user_name: String,
    pub user_id: String,
    pub priorities: Option<ReadingStatusPriorities>,
    pub include_read_chapters: Option<bool>,
    pub include_read_volumes: Option<bool>,
    pub include_score: Option<bool>,
    pub export_path: String,
    pub ids: Vec<Uuid>,
    pub include_private: Option<bool>,
}

pub async fn export_custom_lists_to_my_anime_list<R>(
    app: &AppHandle<R>,
    option: MDCustomListsToMyAnimeListExportOption,
) -> crate::Result<String>
where
    R: Runtime,
{
    let include_private = option.include_private.unwrap_or_default();

    let mut manga_ids = HashSet::<Uuid>::new();
    for custom_list_id in option.ids {
        let client = if include_private {
            app.get_mangadex_client_with_auth_refresh().await?
        } else {
            app.get_mangadex_client()?
        };
        let Ok(res) = client
            .custom_list()
            .id(custom_list_id)
            .get()
            .with_auth(include_private)
            .send()
            .await
        else {
            continue;
        };
        manga_ids.extend(
            res.data
                .find_relationships(RelationshipType::Manga)
                .into_iter()
                .map(|e| e.id),
        );
    }
    export_manga_ids_to_my_anime_list(
        app,
        MDIdsToMyAnimeListExportOption {
            user_name: option.user_name,
            user_id: option.user_id,
            priorities: option.priorities,
            include_read_chapters: option.include_read_chapters,
            include_read_volumes: option.include_read_volumes,
            include_score: option.include_score,
            export_path: option.export_path,
            ids: manga_ids.into_iter().collect(),
        },
    )
    .await
}

#[cfg(test)]
mod playground {
    use serde::{Deserialize, Serialize};

    #[derive(Debug, Serialize, Deserialize, PartialEq, Eq, PartialOrd, Ord)]
    #[serde(rename = "document")]
    struct Document(#[serde(serialize_with = "super::serialize_bool_as_u8")] bool);

    #[test]
    fn play1() {
        println!("{}", serde_xml_rs::to_string(&Document(true)).unwrap());
        println!("{}", serde_xml_rs::to_string(&Document(false)).unwrap());
    }

    #[test]
    fn play2() {
        assert_eq!(
            serde_xml_rs::from_str::<Document>("<Document>1</Document>").unwrap(),
            Document(true)
        );
        assert_eq!(
            serde_xml_rs::from_str::<Document>("<Document>0</Document>").unwrap(),
            Document(false)
        );
    }

    #[test]
    fn serialize_my_anime_list() {
        println!(
            "{}",
            serde_xml_rs::to_string(&super::MyAnimeListXml {
                manga: vec![Default::default()],
                ..Default::default()
            })
            .unwrap()
        )
    }
}
