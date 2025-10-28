use crate::{
    Result,
    cache::cover::{CoverImageCache, CoverImageQuality},
};
use async_graphql::Context;
use eureka_mmanager::prelude::CoverDataPullAsyncTrait;
use tauri::Runtime;
use url::Url;
use uuid::Uuid;

use crate::utils::{get_mangadex_client_from_graphql_context, get_offline_app_state};

#[derive(Debug, Clone)]
pub struct CoverImageQuery {
    pub manga_id: Uuid,
    pub cover_id: Uuid,
    pub filename: String,
    pub mode: Option<CoverImageQuality>,
}

#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl CoverImageQuery {
    async fn fetch_online<'a, R: Runtime>(&'a self, ctx: &'a Context<'a>) -> Result<()> {
        let cache: CoverImageCache = self.clone().into();
        let client = get_mangadex_client_from_graphql_context::<R>(ctx)?;
        let http_client = client.get_http_client();
        let read = http_client.read().await;
        cache.get_online(&read.client).await?;
        Ok(())
    }
    async fn is_offline<'a, R: Runtime>(&'a self, ctx: &'a Context<'a>) -> Result<bool> {
        let offline_app_state = get_offline_app_state::<R>(ctx)?;
        let read = offline_app_state.read().await;
        Ok(read
            .as_ref()
            .ok_or(crate::Error::OfflineAppStateNotLoaded)?
            .get_cover_image(self.cover_id)
            .await
            .is_ok())
    }
    fn is_in_cache(&self) -> bool {
        let cache: CoverImageCache = self.clone().into();
        cache.is_in_cache()
    }
    fn get_url(&self) -> Result<Url> {
        let mut url = Url::parse(
            format!(
                "{}covers/{}/{}",
                crate::constants::PROTOCOL,
                self.cover_id,
                &self.filename
            )
            .as_str(),
        )?;
        url.query_pairs_mut()
            .append_pair("mangaId", self.manga_id.to_string().as_str());
        if let Some(quality) = self.mode {
            url.query_pairs_mut()
                .append_pair("mode", format!("{}", Into::<u16>::into(quality)).as_str());
        }
        Ok(url)
    }
    pub async fn get<'a, R: Runtime>(&'a self, ctx: &'a Context<'a>) -> Result<Url> {
        if !(self.is_offline::<R>(ctx).await.unwrap_or_default() || self.is_in_cache()) {
            self.fetch_online::<R>(ctx).await?;
        }
        self.get_url()
    }
}
