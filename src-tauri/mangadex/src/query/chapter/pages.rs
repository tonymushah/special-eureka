use std::path::Path;

use crate::{
    Result,
    error::Error,
    utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
};
use async_graphql::{Context, Object};
use eureka_mmanager::prelude::ChapterDataPullAsyncTrait;
use url::Url;
use uuid::Uuid;

use crate::{
    objects::chapter::pages::ChapterPages,
    utils::{get_mangadex_client_from_graphql_context, get_offline_app_state},
};

#[derive(Clone, Copy, Debug)]
pub struct ChapterPagesQuery {
    pub id: Uuid,
}

#[Object]
#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl ChapterPagesQuery {
    #[graphql(skip)]
    pub async fn pages_online(&self, ctx: &Context<'_>) -> Result<ChapterPages> {
        log::trace!("Passing rate limit");
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .at_home(&self.id)
            .await;
        log::trace!("Rate limit passed");
        let id = self.id;
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        log::trace!("Getted client");
        Ok(client
            .at_home()
            .server()
            .id(id)
            .get()
            .force_port_443(false)
            .send()
            .await?
            .body
            .into())
    }
    #[graphql(skip)]
    pub async fn pages_offline(&self, ctx: &Context<'_>) -> Result<ChapterPages> {
        let id = self.id;
        let off_state = get_offline_app_state::<tauri::Wry>(ctx)?;
        let read_off_state = off_state.read().await;
        let inner_off_state = read_off_state
            .as_ref()
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        let at_home = inner_off_state.get_chapter_images(id).await?;
        let data: Vec<Url> = at_home
            .data
            .iter()
            .flat_map(|i| {
                let path = Path::new(i);
                let ext = path.extension().and_then(|e| e.to_str())?;
                if ext != "json" {
                    let i = path.file_name().and_then(|e| e.to_str())?;
                    Url::parse(
                        format!("{}chapter/{id}/data/{i}", crate::constants::PROTOCOL).as_str(),
                    )
                    .ok()
                } else {
                    None
                }
            })
            .collect();
        let data_saver: Vec<Url> = at_home
            .data_saver
            .iter()
            .flat_map(|i| {
                let path = Path::new(i);
                let ext = path.extension().and_then(|e| e.to_str())?;
                if ext != "json" {
                    let i = path.file_name().and_then(|e| e.to_str())?;
                    Url::parse(
                        format!("{}chapter/{id}/data-saver/{i}", crate::constants::PROTOCOL)
                            .as_str(),
                    )
                    .ok()
                } else {
                    None
                }
            })
            .collect();

        Ok(ChapterPages { data, data_saver })
    }
    pub async fn pages(&self, ctx: &Context<'_>) -> Result<ChapterPages> {
        if let Some(offline) = self.pages_offline(ctx).await.ok().filter(|d| !d.is_empty()) {
            log::debug!("Fetched offline chapter {}", self.id);
            Ok(offline)
        } else {
            log::debug!("Fetching online chapter {}", self.id);
            let re = self.pages_online(ctx).await;
            log::debug!("Fetched online chapter {}", self.id);
            re
        }
    }
}
