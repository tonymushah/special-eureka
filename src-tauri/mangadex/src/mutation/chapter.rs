use async_graphql::{Context, Enum, Error, Object, Result};
use mangadex_api::utils::download::chapter::DownloadMode as MDDownloadMode;
use mangadex_api_input_types::chapter::edit::ChapterUpdateParams;
use mangadex_api_schema_rust::{v5::ChapterAttributes, ApiObjectNoRelationships};
use mangadex_desktop_api2::utils::ExtractData;
use uuid::Uuid;

use crate::{
    ins_handle::{add_in_chapter_failed, add_in_chapter_queue, add_in_chapter_success},
    objects::chapter::Chapter,
    utils::{
        get_mangadex_client_from_graphql_context_with_auth_refresh, get_offline_app_state,
        get_watches_from_graphql_context, watch::SendData,
    },
};

#[derive(Debug, Clone, Copy)]
pub struct ChapterMutations;

#[Object]
impl ChapterMutations {
    pub async fn update(&self, ctx: &Context<'_>, params: ChapterUpdateParams) -> Result<Chapter> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let res: ApiObjectNoRelationships<ChapterAttributes> =
            params.send(&client).await?.body.data.into();
        let data: Chapter = res.into();
        let _ = watches.chapter.send_data(data.clone());
        Ok(data)
    }
    pub async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let _ = client.chapter().id(id).delete().send().await?;
        Ok(true)
    }
    /// Remove the chapter from the current device or offline
    pub async fn remove(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .clone()
            .ok_or(Error::new("Offline AppState Not loaded"))?;
        olasw.chapter_utils().with_id(id).delete()?;
        Ok(true)
    }
    pub async fn download(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        #[graphql(default_with = "default_download_quality()")] quality: DownloadMode,
    ) -> Result<bool> {
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        add_in_chapter_queue(id)?;
        let offline_app_state_write = ola.read().await;
        let mut olasw = offline_app_state_write
            .clone()
            .ok_or(Error::new("Offline AppState Not loaded"))?;
        let chapter_download = olasw.chapter_download(id);
        let res = match quality {
            DownloadMode::Normal => chapter_download.download_chapter(&mut olasw).await,
            DownloadMode::DataSaver => {
                chapter_download
                    .download_chapter_data_saver(&mut olasw)
                    .await
            }
        };
        if let Err(_err) = res {
            add_in_chapter_failed(id)?;
            Ok(false)
        } else {
            add_in_chapter_success(id)?;
            Ok(true)
        }
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
