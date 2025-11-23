use std::{
    collections::{BTreeMap, HashMap},
    fs::Metadata,
    ops::Deref,
};

use async_graphql::{ComplexObject, InputObject, SimpleObject};
use image::ImageFormat;
use mangadex_api_types_rust::{Language, MangaDexDateTime};
use tempfile::TempDir;
use url::Url;
use uuid::Uuid;

use crate::constants::PROTOCOL;

use super::ArcRwLock;

#[derive(Clone, Debug, SimpleObject, InputObject)]
#[graphql(input_name = "InternUploadSessionCommitDataInput")]
pub struct InternUploadSessionCommitData {
    pub volume: Option<String>,
    pub chapter: Option<String>,
    pub title: Option<String>,
    pub translated_language: Language,
    pub external_url: Option<Url>,
    pub publish_at: Option<MangaDexDateTime>,
    /// Required after the May 15th incident
    pub terms_accepted: Option<bool>,
}

#[derive(Debug)]
pub struct InternUploadSession {
    pub(super) manga_id: Uuid,
    pub(super) groups: Vec<Uuid>,
    pub(super) temp_dir: TempDir,
    pub(super) images: Vec<String>,
    pub(super) commit_data: Option<InternUploadSessionCommitData>,
}

pub const CHAPTER_TOTAL_SIZE_LIMIT: u64 = 150_000_000;

pub const CHAPTER_IMAGE_FILE_LIMIT: u64 = 20_000_000;

pub const SIZE_LIMIT: u32 = 10_000;

pub const FILES_LIMIT: u32 = 500;

#[derive(Debug, thiserror::Error)]
pub enum CheckUploadSessionError {
    #[error(transparent)]
    Io(#[from] std::io::Error),
    #[error(transparent)]
    Image(#[from] image::ImageError),
    #[error("Reached files number limit ({} > {})", .0, FILES_LIMIT)]
    ReachedFilesNumberLimit(u32),
    #[error("Chapter total size is to big ({} > 300 MB)", .0)]
    ChapterTotalSizeTooBig(u64),
    #[error("Chapter image `{}` size is too big ({} + {} > {}px)", .filename, .width, .height, SIZE_LIMIT)]
    ImageSizeTooBig {
        width: u32,
        height: u32,
        filename: String,
    },
    #[error("Chapter image `{}` file size is too big ({} > 500MB)", .filename, .size)]
    ImageFileSizeTooBig { size: u64, filename: String },
    #[error("Chapter image `{}` file format is invalid", .filename)]
    InvalidFormat { filename: String },
}

impl InternUploadSession {
    pub fn check(&self) -> Result<(), CheckUploadSessionError> {
        if self.images.len() > FILES_LIMIT as usize {
            return Err(CheckUploadSessionError::ReachedFilesNumberLimit(
                self.images.len() as _,
            ));
        }
        let images_metadata = self
            .images
            .iter()
            .map(|filename| {
                let path = self.temp_dir.path().join(filename);
                Ok::<(String, Metadata), std::io::Error>((
                    filename.clone(),
                    std::fs::metadata(path)?,
                ))
            })
            .collect::<std::io::Result<HashMap<_, _>>>()?;
        {
            let total_len = images_metadata
                .values()
                .map(|metadata| metadata.len())
                .sum::<u64>();
            if total_len > CHAPTER_TOTAL_SIZE_LIMIT {
                return Err(CheckUploadSessionError::ChapterTotalSizeTooBig(total_len));
            }
        }
        for (filename, metadata) in images_metadata {
            if metadata.len() > CHAPTER_IMAGE_FILE_LIMIT {
                return Err(CheckUploadSessionError::ImageFileSizeTooBig {
                    size: metadata.len(),
                    filename,
                });
            }
            let img_path = self.temp_dir.path().join(&filename);
            if !matches!(
                image::ImageFormat::from_path(&img_path)?,
                ImageFormat::Jpeg | ImageFormat::Gif | ImageFormat::Png
            ) {
                return Err(CheckUploadSessionError::InvalidFormat { filename });
            }
            {
                let img = image::open(&img_path)?;
                if img.width() + img.height() > SIZE_LIMIT {
                    return Err(CheckUploadSessionError::ImageSizeTooBig {
                        width: img.width(),
                        height: img.height(),
                        filename,
                    });
                }
            }
        }
        Ok(())
    }
}

impl InternUploadSession {
    pub fn to_gql_object(&self, session_id: Uuid) -> InternUploadSessionGQLObject {
        InternUploadSessionGQLObject {
            session_id,
            manga_id: self.manga_id,
            groups: self.groups.clone(),
            images: self.images.clone(),
            commit_data: self.commit_data.clone(),
        }
    }
}

#[derive(Debug, Clone, SimpleObject)]
#[graphql(complex)]
pub struct InternUploadSessionGQLObject {
    #[graphql(skip)]
    pub session_id: Uuid,
    pub manga_id: Uuid,
    pub groups: Vec<Uuid>,
    pub images: Vec<String>,
    pub commit_data: Option<InternUploadSessionCommitData>,
}

#[ComplexObject]
impl InternUploadSessionGQLObject {
    pub async fn images_url(&self) -> Result<Vec<Url>, crate::ErrorWrapper> {
        Ok(self
            .images
            .iter()
            .map(|image| -> Result<Url, url::ParseError> {
                format!("{PROTOCOL}upload-image/{}/{}", self.session_id, image).parse()
            })
            .collect::<Result<_, url::ParseError>>()?)
    }
}

#[derive(Debug, Clone, Default)]
pub struct UploadSessions(ArcRwLock<BTreeMap<Uuid, InternUploadSession>>);

impl Deref for UploadSessions {
    type Target = ArcRwLock<BTreeMap<Uuid, InternUploadSession>>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
