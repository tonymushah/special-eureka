use async_graphql::{Enum, InputObject};
use mangadex_api_types_rust::ReadingStatus;
use serde::{Deserialize, Serialize};
use std::{fmt::Display, str::FromStr};
use tauri::{AppHandle, Runtime};

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

#[derive(Debug, Clone)]
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

#[derive(Debug, Serialize, Deserialize, Default)]
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
    pub my_status: Option<ReadingStatus>,
    pub my_comments: String,
    pub my_times_read: u32,
    pub my_tags: String,
    pub my_priority: Option<MALTitlePriority>,
    pub my_reread_value: String,
    pub my_rereading: YesNo,
    pub my_discuss: YesNo,
    pub my_sns: String,
    #[serde(serialize_with = "serialize_bool_as_u8")]
    pub update_on_import: bool,
}

#[derive(Debug, Serialize, Deserialize, Default)]
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

#[derive(Debug, Clone, InputObject)]
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
}

pub async fn export_md_library_to_my_anime_list<R>(
    app: &AppHandle<R>,
    option: MDLibraryToMyAnimeListExportOption,
) -> crate::Result<String>
where
    R: Runtime,
{
    todo!()
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
