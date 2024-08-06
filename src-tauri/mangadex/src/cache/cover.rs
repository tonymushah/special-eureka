use std::{
    env::temp_dir,
    error::Error,
    fmt::Display,
    fs::{create_dir_all, remove_dir_all, File},
    io::{BufReader, BufWriter, Read, Write},
    path::PathBuf,
};

use crate::{query::cover::image::CoverImageQuery, Result};
use async_graphql::Enum;
use bytes::Bytes;
use mangadex_api::CDN_URL;
use reqwest::Client;
use url::Url;
use uuid::Uuid;

#[derive(Debug, Enum, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum CoverImageQuality {
    V512,
    V256,
}

impl From<CoverImageQuality> for u16 {
    fn from(value: CoverImageQuality) -> Self {
        match value {
            CoverImageQuality::V512 => 512,
            CoverImageQuality::V256 => 256,
        }
    }
}

impl From<&CoverImageQuality> for u16 {
    fn from(value: &CoverImageQuality) -> Self {
        Into::<u16>::into(*value)
    }
}

#[derive(Debug)]
pub struct TryFromCoverImageQualityError(pub(crate) ());

impl Display for TryFromCoverImageQualityError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        writeln!(f, "Cannot transform an int into CoverImageQuality")
    }
}

impl Error for TryFromCoverImageQualityError {}

impl TryFrom<u16> for CoverImageQuality {
    type Error = TryFromCoverImageQualityError;
    fn try_from(value: u16) -> std::result::Result<Self, Self::Error> {
        match value {
            512 => Ok(CoverImageQuality::V512),
            256 => Ok(CoverImageQuality::V256),
            _ => Err(TryFromCoverImageQualityError(())),
        }
    }
}

pub struct CoverImageCache {
    pub manga_id: Uuid,
    pub cover_id: Uuid,
    pub filename: String,
    pub mode: Option<CoverImageQuality>,
}

impl CoverImageCache {
    fn get_online_filename(&self) -> String {
        self.mode
            .as_ref()
            .map(Into::<u16>::into)
            .map(|quality| format!("{}.{quality}.jpg", self.filename.clone()))
            .unwrap_or(self.filename.clone())
    }
    pub fn get_cover_temp_dir() -> PathBuf {
        let path = temp_dir().join("special-eureka").join("covers");
        let _ = create_dir_all(&path);
        path
    }
    pub fn clear_cover_temp_dir() -> crate::Result<()> {
        let path = Self::get_cover_temp_dir();
        remove_dir_all(path)?;
        Ok(())
    }
    fn get_cover_temp_image_path(&self) -> PathBuf {
        Self::get_cover_temp_dir().join(self.get_online_filename())
    }
    fn get_temp_buf_writer(&self) -> Result<BufWriter<File>> {
        Ok(BufWriter::new(File::create(
            self.get_cover_temp_image_path(),
        )?))
    }
    fn get_temp_buf_reader(&self) -> Result<BufReader<File>> {
        Ok(BufReader::new(File::open(
            self.get_cover_temp_image_path(),
        )?))
    }
    pub fn get_from_cache(&self) -> Result<Bytes> {
        let mut bytes: Vec<u8> = Vec::new();
        self.get_temp_buf_reader()?.read_to_end(&mut bytes)?;
        Ok(bytes.into())
    }
    pub fn is_in_cache(&self) -> bool {
        self.get_cover_temp_image_path().exists()
    }
    pub fn seed(&self, bytes: &Bytes) -> Result<()> {
        let mut writer = self.get_temp_buf_writer()?;
        writer.write_all(bytes)?;
        writer.flush()?;
        Ok(())
    }
    pub async fn get_online(&self, client: &Client) -> Result<Bytes> {
        let filename = self.get_online_filename();
        let url = Url::parse(format!("{CDN_URL}/covers/{}/{filename}", self.manga_id).as_str())?;

        let response = client.get(url).send().await?;
        if response.status().is_success() {
            let body = response.bytes().await?;
            let mut file = self.get_temp_buf_writer()?;
            file.write_all(&body)?;
            file.flush()?;
            Ok(body)
        } else {
            Err(crate::Error::CoverFetch)
        }
    }
}

impl From<CoverImageQuery> for CoverImageCache {
    fn from(value: CoverImageQuery) -> Self {
        let CoverImageQuery {
            manga_id,
            cover_id,
            filename,
            mode,
        } = value;
        Self {
            manga_id,
            cover_id,
            filename,
            mode,
        }
    }
}
