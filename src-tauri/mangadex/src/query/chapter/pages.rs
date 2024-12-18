use std::path::Path;

use crate::{error::Error, Result};
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
impl ChapterPagesQuery {
    #[graphql(skip)]
    pub async fn pages_online(&self, ctx: &Context<'_>) -> Result<ChapterPages> {
        let id = self.id;
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
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
                let ext = Path::new(i).extension().and_then(|e| e.to_str())?;
                if ext != "json" {
                    let i = i.as_str();
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
                let ext = Path::new(i).extension().and_then(|e| e.to_str())?;
                if ext != "json" {
                    let i = i.as_str();
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
        if let Ok(offline) = self.pages_offline(ctx).await {
            Ok(offline)
        } else {
            self.pages_online(ctx).await
        }
    }
}
