use std::{io::Read, vec::Vec};

use async_graphql::{Context, Enum, Result};
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
    async fn get_online<'a, R: Runtime>(&'a self, ctx: &'a Context<'a>) -> Result<Bytes> {
        let client = get_mangadex_client_from_graphql_context::<R>(ctx)?;
        let filename = self
            .mode
            .as_ref()
            .map(Into::<u16>::into)
            .map(|quality| format!("{}.{quality}.jpg", self.filename.clone()))
            .unwrap_or(self.filename.clone());
        let url = Url::parse(format!("{CDN_URL}/covers/{}/{filename}", self.manga_id).as_str())?;
        Ok(client
            .get_http_client()
            .read()
            .await
            .client
            .get(url)
            .send()
            .await?
            .bytes()
            .await?)
    }
    async fn get_offline<'a, R: Runtime>(&'a self, ctx: &'a Context<'a>) -> Result<Bytes> {
        let offline_app_state = get_offline_app_state::<R>(ctx)?;
        let read = offline_app_state.read().await;
        let mut image_buf_reader = read
            .as_ref()
            .ok_or(async_graphql::Error::new("Offline AppState is not loaded"))?
            .cover_utils()
            .with_id(self.cover_id)
            .get_image_buf_reader()?;
        let mut bytes = Vec::<u8>::new();
        image_buf_reader.read_to_end(&mut bytes)?;
        Ok(bytes.into())
    }
    pub async fn get<'a, R: Runtime>(&'a self, ctx: &'a Context<'a>) -> Result<Bytes> {
        if let Ok(res) = self.get_offline::<R>(ctx).await {
            Ok(res)
        } else {
            self.get_online::<R>(ctx).await
        }
    }
}
