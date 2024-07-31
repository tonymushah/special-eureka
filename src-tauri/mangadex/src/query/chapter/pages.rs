use crate::{error::Error, Result};
use async_graphql::{Context, Object};
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
            .ok_or(Error::new("Offline AppState not found"))?;
        let chapter_utils = inner_off_state.chapter_utils().with_id(id);
        let data: Vec<Url> = chapter_utils
            .get_data_images()
            .unwrap_or_default()
            .into_iter()
            .flat_map(|i| {
                let ext = i.extension().and_then(|e| e.to_str())?;
                if ext != "json" {
                    let i = i.to_str()?;
                    Url::parse(format!("mangadex://chapter/{id}/data/{i}").as_str()).ok()
                } else {
                    None
                }
            })
            .collect();
        let data_saver: Vec<Url> = chapter_utils
            .get_data_saver_images()
            .unwrap_or_default()
            .into_iter()
            .flat_map(|i| {
                let ext = i.extension().and_then(|e| e.to_str())?;
                if ext != "json" {
                    let i = i.to_str()?;
                    Url::parse(format!("mangadex://chapter/{id}/data/{i}").as_str()).ok()
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
