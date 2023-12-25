use async_graphql::{Context, EmptyMutation, Enum, Error, Object, Result};
use mangadex_api::utils::download::chapter::DownloadMode as MDDownloadMode;
use mangadex_api_input_types::chapter::edit::ChapterUpdateParams;
use mangadex_api_schema_rust::{v5::ChapterAttributes, ApiObjectNoRelationships};
use uuid::Uuid;

use crate::{
    objects::chapter::Chapter,
    utils::{get_mangadex_client_from_graphql_context_with_auth_refresh, get_offline_app_state},
};

#[derive(Debug, Clone, Copy)]
pub struct ChapterMutations;

#[Object]
impl ChapterMutations {
    pub async fn update(&self, ctx: &Context<'_>, params: ChapterUpdateParams) -> Result<Chapter> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let res: ApiObjectNoRelationships<ChapterAttributes> =
            params.send(&client).await?.body.data.into();
        Ok(res.into())
    }
    pub async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<EmptyMutation> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let _ = client.chapter().id(id).delete().send().await?;
        Ok(EmptyMutation)
    }
    /// Remove the chapter from the current device or offline
    pub async fn remove(&self, ctx: &Context<'_>, id: Uuid) -> Result<EmptyMutation> {
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let mut offline_app_state_write = ola.write().await;
        let olasw = offline_app_state_write
            .as_mut()
            .ok_or(Error::new("Offline AppState Not loaded"))?;
        olasw.chapter_utils().with_id(id).delete()?;
        Ok(EmptyMutation)
    }
    pub async fn download(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        #[graphql(default_with = "default_download_quality()")] quality: DownloadMode,
    ) -> Result<EmptyMutation> {
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let mut offline_app_state_write = ola.write().await;
        let olasw = offline_app_state_write
            .as_mut()
            .ok_or(Error::new("Offline AppState Not loaded"))?;
        let chapter_download = olasw.chapter_download(id);
        let _ = match quality {
            DownloadMode::Normal => chapter_download.download_chapter(olasw).await?,
            DownloadMode::DataSaver => chapter_download.download_chapter_data_saver(olasw).await?,
        };
        Ok(EmptyMutation)
    }
}

#[derive(Clone, Enum, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum DownloadMode {
    Normal,
    DataSaver,
}

impl From<MDDownloadMode> for DownloadMode {
    fn from(value: MDDownloadMode) -> Self {
        match value {
            MDDownloadMode::Normal => Self::Normal,
            MDDownloadMode::DataSaver => Self::DataSaver,
        }
    }
}

impl From<DownloadMode> for MDDownloadMode {
    fn from(value: DownloadMode) -> Self {
        match value {
            DownloadMode::Normal => Self::Normal,
            DownloadMode::DataSaver => Self::DataSaver,
        }
    }
}

fn default_download_quality() -> DownloadMode {
    DownloadMode::Normal
}
