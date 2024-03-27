use std::{
    env::temp_dir,
    fs::{create_dir_all, File},
    io::{BufReader, BufWriter, Read, Write},
    path::PathBuf,
};

use async_graphql::{Context, Enum, ErrorExtensions, Result};
use bytes::Bytes;
use mangadex_api::CDN_URL;
use tauri::Runtime;
use url::Url;
use uuid::Uuid;

use crate::utils::{get_mangadex_client_from_graphql_context, get_offline_app_state};

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

pub struct CoverImageQuery {
    pub manga_id: Uuid,
    pub cover_id: Uuid,
    pub filename: String,
    pub mode: Option<CoverImageQuality>,
}

impl CoverImageQuery {
    fn get_online_filename(&self) -> String {
        self.mode
            .as_ref()
            .map(Into::<u16>::into)
            .map(|quality| format!("{}.{quality}.jpg", self.filename.clone()))
            .unwrap_or(self.filename.clone())
    }
    fn get_cover_temp_dir() -> PathBuf {
        let path = temp_dir().join("special-eureka").join("covers");
        let _ = create_dir_all(&path);
        path
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
        Ok(BufReader::new(File::create(
            self.get_cover_temp_image_path(),
        )?))
    }
    fn get_from_cache(&self) -> Result<Bytes> {
        let mut bytes: Vec<u8> = Vec::new();
        self.get_temp_buf_reader()?.read_to_end(&mut bytes)?;
        Ok(bytes.into())
    }
    async fn get_online<'a, R: Runtime>(&'a self, ctx: &'a Context<'a>) -> Result<Bytes> {
        let client = get_mangadex_client_from_graphql_context::<R>(ctx)?;
        let filename = self.get_online_filename();
        let url = Url::parse(format!("{CDN_URL}/covers/{}/{filename}", self.manga_id).as_str())?;
        let response = client
            .get_http_client()
            .read()
            .await
            .client
            .get(url)
            .send()
            .await?;
        if response.status().is_success() {
            let body = response.bytes().await?;
            let mut file = self.get_temp_buf_writer()?;
            file.write_all(&body)?;
            file.flush()?;
            Ok(body)
        } else {
            Err(
                async_graphql::Error::new("Error when fetching the cover image")
                    .extend_with(|_, e| e.set("code", response.status().as_u16())),
            )
        }
    }
    async fn get_offline<'a, R: Runtime>(&'a self, ctx: &'a Context<'a>) -> Result<Bytes> {
        let offline_app_state = get_offline_app_state::<R>(ctx)?;
        let read = offline_app_state.read().await;
        let bytes = read
            .as_ref()
            .ok_or(async_graphql::Error::new("Offline AppState is not loaded"))?
            .cover_utils()
            .with_id(self.cover_id)
            .get_image_buf()?;
        Ok(bytes)
    }
    pub async fn get<'a, R: Runtime>(&'a self, ctx: &'a Context<'a>) -> Result<Bytes> {
        if let Ok(res) = self.get_offline::<R>(ctx).await {
            Ok(res)
        } else if let Ok(res) = self.get_from_cache() {
            Ok(res)
        } else {
            self.get_online::<R>(ctx).await
        }
    }
}
