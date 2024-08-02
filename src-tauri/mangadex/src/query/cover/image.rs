use crate::{
    cache::cover::{CoverImageCache, CoverImageQuality},
    Result,
};
use async_graphql::Context;
use bytes::Bytes;
use tauri::Runtime;
use uuid::Uuid;

use crate::utils::{get_mangadex_client_from_graphql_context, get_offline_app_state};

#[derive(Debug, Clone)]
pub struct CoverImageQuery {
    pub manga_id: Uuid,
    pub cover_id: Uuid,
    pub filename: String,
    pub mode: Option<CoverImageQuality>,
}

impl CoverImageQuery {
    async fn get_online<'a, R: Runtime>(&'a self, ctx: &'a Context<'a>) -> Result<Bytes> {
        let cache: CoverImageCache = self.clone().into();
        let client = get_mangadex_client_from_graphql_context::<R>(ctx)?;
        let http_client = client.get_http_client();
        let read = http_client.read().await;
        cache.get_online(&read.client).await
    }
    async fn get_offline<'a, R: Runtime>(&'a self, ctx: &'a Context<'a>) -> Result<Bytes> {
        let offline_app_state = get_offline_app_state::<R>(ctx)?;
        let read = offline_app_state.read().await;
        let bytes = read
            .as_ref()
            .ok_or(crate::Error::OfflineAppStateNotLoaded)?
            .cover_utils()
            .with_id(self.cover_id)
            .get_image_buf()?;
        Ok(bytes)
    }
    fn get_from_cache(&self) -> Result<Bytes> {
        let cache: CoverImageCache = self.clone().into();
        cache.get_from_cache()
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
