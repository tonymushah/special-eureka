use std::{
    env::temp_dir,
    error::Error,
    fmt::Display,
    fs::{File, create_dir_all, remove_dir_all},
    io::{BufReader, BufWriter, Cursor, Read, Seek, Write},
    path::PathBuf,
};

use crate::Result;
use async_graphql::Enum;
use image::DynamicImage;
use itertools::Itertools;
use mangadex_api::{CDN_URL, MangaDexClient};
use mangadex_api_schema_rust::{ApiObjectNoRelationships, v5::CoverAttributes};
use mangadex_api_types_rust::ReferenceExpansionResource;
use reqwest::{Client, header::CACHE_CONTROL};
use serde::{Deserialize, Serialize};
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

macro_rules! impl_quality_try_convert {
	($($t:ty,)*) => {
        $(
	       	impl TryFrom<$t> for CoverImageQuality {
	            type Error = TryFromCoverImageQualityError;
	            fn try_from(value: $t) -> std::result::Result<Self, Self::Error> {
	                match value {
	                    512 => Ok(CoverImageQuality::V512),
	                    256 => Ok(CoverImageQuality::V256),
	                    _ => Err(TryFromCoverImageQualityError(())),
	                }
	            }
	        }
        )*
    };
}

impl_quality_try_convert!(u16, u32, u64, usize,);
impl_quality_try_convert!(i16, i32, i64, isize,);

impl Error for TryFromCoverImageQualityError {}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq, PartialOrd, Ord)]
struct CoverImageCacheEntry {
    cover_id: Uuid,
    manga_id: Uuid,
    filename: String,
    primary_cover: bool,
}

#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl CoverImageCacheEntry {
    const CACHE_FILENAME: &str = "cover_image_entries.csv";
    fn get_cover_image_cache_file() -> std::io::Result<File> {
        let path = CoverImageCache::get_cover_temp_dir().join(Self::CACHE_FILENAME);
        if !std::fs::exists(&path)? {
            std::fs::OpenOptions::new()
                .read(true)
                .create(true)
                .truncate(true)
                .write(true)
                .open(path)
        } else {
            std::fs::OpenOptions::new()
                .read(true)
                .write(true)
                .open(path)
        }
    }
    fn append_entry(&self) -> csv::Result<()> {
        let mut file = Self::get_cover_image_cache_file()?;
        let mut all_entry = csv::Reader::from_reader(&mut file)
            .deserialize::<Self>()
            .flatten()
            .collect_vec();
        file.rewind()?;
        if !all_entry.iter().any(|entry| entry == self) {
            all_entry.push(self.clone());
            let mut writer = csv::Writer::from_writer(&mut file);
            for e in all_entry {
                writer.serialize(e)?;
            }
            writer.flush()?;
        }
        Ok(())
    }
    fn get_csv_reader() -> csv::Result<csv::Reader<File>> {
        Ok(csv::Reader::from_reader(Self::get_cover_image_cache_file()?))
    }
    fn get_entry_by_cover_id(cover_id: Uuid) -> csv::Result<Option<Self>> {
        Ok(Self::get_csv_reader()?
            .deserialize::<Self>()
            .flatten()
            .find(|entry| entry.cover_id == cover_id))
    }
    fn get_entry_by_manga_id(manga_id: Uuid) -> csv::Result<Option<Self>> {
        Ok(Self::get_csv_reader()?
            .deserialize::<Self>()
            .flatten()
            .find(|entry| entry.manga_id == manga_id && entry.primary_cover))
    }
}

impl From<CoverImageCacheEntry> for CoverImageCache {
    fn from(value: CoverImageCacheEntry) -> Self {
        Self {
            manga_id: value.manga_id,
            cover_id: value.cover_id,
            filename: value.filename,
            mode: None,
        }
    }
}

pub struct CoverImageCache {
    pub manga_id: Uuid,
    pub cover_id: Uuid,
    pub filename: String,
    pub mode: Option<CoverImageQuality>,
}

#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
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
    pub fn get_from_cache(&self) -> Result<Vec<u8>> {
        let mut bytes: Vec<u8> = Vec::new();
        self.get_temp_buf_reader()?.read_to_end(&mut bytes)?;
        Ok(bytes)
    }
    pub fn is_in_cache(&self) -> bool {
        self.get_cover_temp_image_path().exists()
    }
    pub fn seed_from_dynamic_image(&self, mut img: DynamicImage) -> Result<Vec<u8>> {
        if let Some(quality) = self.mode {
            let new_width: u32 = match quality {
                CoverImageQuality::V256 => 256,
                CoverImageQuality::V512 => 512,
            };
            img = img.resize(
                new_width,
                (img.height() * new_width) / img.width(),
                image::imageops::FilterType::Nearest,
            );
        }
        let mut buf = Cursor::new(Vec::<u8>::new());
        img.write_to(&mut buf, image::ImageFormat::Jpeg)?;
        buf.rewind()?;
        buf.get_mut().shrink_to_fit();
        let mut writer = self.get_temp_buf_writer()?;
        std::io::copy(&mut buf, &mut writer)?;
        writer.flush()?;
        Ok(buf.into_inner())
    }
    pub fn seed(&self, bytes: &[u8]) -> Result<()> {
        let mut writer = self.get_temp_buf_writer()?;
        writer.write_all(bytes)?;
        writer.flush()?;
        Ok(())
    }
    pub async fn get_online(&self, client: &Client) -> Result<Vec<u8>> {
        let filename = self.get_online_filename();
        let url = Url::parse(format!("{CDN_URL}/covers/{}/{filename}", self.manga_id).as_str())?;

        let response = client
            .get(url)
            .header(CACHE_CONTROL, format!("max-age={}", 3600 * 24 * 7))
            .send()
            .await?;
        if response.status().is_success() {
            let body = response.bytes().await?;
            let mut file = self.get_temp_buf_writer()?;
            file.write_all(&body)?;
            file.flush()?;
            Ok(body.to_vec())
        } else {
            Err(crate::Error::CoverFetch)
        }
    }
    pub async fn get_cover_image_by_cover_id(
        cover_id: Uuid,
        quality: Option<CoverImageQuality>,
        client: &MangaDexClient,
    ) -> crate::Result<(Vec<u8>, Self)> {
        let cache: Self =
            if let Some(entry) = CoverImageCacheEntry::get_entry_by_cover_id(cover_id)? {
                let mut c: Self = entry.into();
                c.mode = quality;
                c
            } else {
                let cover_obj = client.cover().cover_id(cover_id).get().send().await?.data;
                let manga_id = cover_obj
                    .find_first_relationships(mangadex_api_types_rust::RelationshipType::Manga)
                    .map(|rel| rel.id)
                    .ok_or(crate::Error::RelatedMangaNotFound)?;
                let filename = cover_obj.attributes.file_name;
                CoverImageCacheEntry {
                    cover_id,
                    manga_id,
                    primary_cover: false,
                    filename: filename.clone(),
                }
                .append_entry()?;
                Self {
                    manga_id,
                    cover_id,
                    filename,
                    mode: quality,
                }
            };
        let buf = if cache.is_in_cache() {
            cache.get_from_cache()?
        } else {
            cache
                .get_online(&client.get_http_client().read().await.client)
                .await?
        };
        Ok((buf, cache))
    }
    /// This function will automatically handle if it is
    pub async fn get_cover_image_by_manga_id(
        manga_id: Uuid,
        quality: Option<CoverImageQuality>,
        client: &MangaDexClient,
    ) -> crate::Result<(Vec<u8>, Self)> {
        let cache: Self = if let Some(entry) =
            CoverImageCacheEntry::get_entry_by_manga_id(manga_id)?
        {
            let mut c: Self = entry.into();
            c.mode = quality;
            c
        } else {
            let manga_obj = client
                .manga()
                .id(manga_id)
                .get()
                .include(ReferenceExpansionResource::CoverArt)
                .send()
                .await?
                .data;
            let cover_obj = manga_obj
                .find_first_relationships(mangadex_api_types_rust::RelationshipType::CoverArt)
                .and_then(|rel| {
                    TryInto::<ApiObjectNoRelationships<CoverAttributes>>::try_into(rel.clone()).ok()
                })
                .ok_or(crate::Error::RelatedMangaNotFound)?;
            let filename = cover_obj.attributes.file_name;
            CoverImageCacheEntry {
                cover_id: cover_obj.id,
                manga_id,
                primary_cover: true,
                filename: filename.clone(),
            }
            .append_entry()?;
            Self {
                manga_id,
                cover_id: cover_obj.id,
                filename,
                mode: quality,
            }
        };
        let buf = if cache.is_in_cache() {
            cache.get_from_cache()?
        } else {
            cache
                .get_online(&client.get_http_client().read().await.client)
                .await?
        };
        Ok((buf, cache))
    }
}
