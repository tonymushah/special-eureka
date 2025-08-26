use std::{
    collections::HashMap,
    fmt::Display,
    fs::File,
    io::{BufWriter, Write},
    path::Path,
    str::FromStr,
};

use async_graphql::{Enum, InputObject};
use mangadex_api_input_types::{chapter::list::ChapterListParams, manga::list::MangaListParams};
use mangadex_api_schema_rust::v5::ratings::Rating as MangaRating;
use mangadex_api_types_rust::ReadingStatus;
use serde::{Deserialize, Serialize, Serializer};
use tauri::{AppHandle, Runtime};
use uuid::Uuid;

use crate::{
    constants::MANGADEX_PAGE_LIMIT,
    store::types::structs::content::ContentFeeder,
    utils::{
        source::SendMultiSourceData, splittable_param::SendSplitted,
        traits_utils::MangadexTauriManagerExt,
    },
};

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
    let export_path = <String as AsRef<Path>>::as_ref(&option.export_path).to_path_buf();
    let mut to_use_file = File::create(&export_path)?;

    let client = app.get_mangadex_client_with_auth_refresh().await?;
    let statuses = { client.manga().status().get().send().await?.statuses };
    let mut params = MangaListParams {
        manga_ids: statuses.keys().cloned().collect(),
        has_available_chapters: option.has_available_chapters,
        ..Default::default()
    };
    if !option.exclude_content_profile.unwrap_or_default() {
        params = app.feed(params);
    }
    let priorities = option.priorities.unwrap_or_default();

    let mut mangas: HashMap<Uuid, MangaEntry> = {
        let data = params.send_splitted_default(&client).await?.data;
        {
            let mangas = data
                .iter()
                .cloned()
                .map(crate::objects::manga::MangaObject::from)
                .collect::<Vec<_>>();
            let watches = (*app.get_watches()?).clone();
            tauri::async_runtime::spawn(async move {
                for data in mangas {
                    let _ = watches.manga.send_online(data);
                }
            });
        }
        data.into_iter()
            .flat_map(|manga| {
                let title_id = manga.attributes.links?.my_anime_list?.0;
                let status = *statuses.get(&manga.id)?;
                let priority = match status {
                    ReadingStatus::Completed => priorities.completed,
                    ReadingStatus::Dropped => priorities.dropped,
                    ReadingStatus::OnHold => priorities.on_hold,
                    ReadingStatus::PlanToRead => priorities.plan_to_read,
                    ReadingStatus::Reading => priorities.reading,
                    ReadingStatus::ReReading => priorities.re_reading,
                };
                let times_read: u32 = match status {
                    ReadingStatus::Completed
                    | ReadingStatus::Dropped
                    | ReadingStatus::ReReading => 1,
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
                        my_status: Some(status),
                        my_comments: CData::default().to_string(),
                        my_times_read: times_read,
                        my_tags: CData::default().to_string(),
                        my_priority: Some(priority),
                        my_discuss: YesNo::Yes,
                        my_sns: "default".into(),
                        update_on_import: true,
                        ..Default::default()
                    },
                ))
            })
            .collect()
    };
    if option.include_score.unwrap_or_default() {
        let mut ratings = HashMap::<Uuid, MangaRating>::new();
        for ids in mangas
            .keys()
            .cloned()
            .collect::<Vec<_>>()
            .chunks(MANGADEX_PAGE_LIMIT.try_into()?)
        {
            let client = app.get_mangadex_client_with_auth_refresh().await?;
            ratings.extend(client.rating().get().manga(ids).send().await?.ratings);
        }
        for (manga_id, entry) in mangas.iter_mut() {
            if let Some(rating) = ratings.get(manga_id) {
                entry.my_score = rating.rating as u16;
            }
        }
    }
    {
        let include_read_chapters = option.include_read_chapters.unwrap_or_default();
        let include_read_volumes = option.include_read_volumes.unwrap_or_default();
        if include_read_chapters || include_read_volumes {
            for (id, manga_entry) in mangas.iter_mut() {
                let client = app.get_mangadex_client_with_auth_refresh().await?;
                let read_chapters = client.manga().id(*id).read().get().send().await?.data;
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
        }
    }
    let my_info = MyInfo {
        user_id: option.user_id,
        user_name: option.user_name,
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
