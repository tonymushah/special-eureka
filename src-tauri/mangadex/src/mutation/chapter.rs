use crate::{error::Error, Result};
use async_graphql::{Context, Enum, Object};
use mangadex_api::utils::download::chapter::DownloadMode as MDDownloadMode;
use mangadex_api_input_types::chapter::edit::ChapterUpdateParams;
use mangadex_api_schema_rust::{v5::ChapterAttributes, ApiObjectNoRelationships};
use mangadex_api_types_rust::RelationshipType;
use mangadex_desktop_api2::{settings::file_history::IsIn, utils::ExtractData};
use uuid::Uuid;

use crate::{
    ins_handle::{add_in_chapter_failed, add_in_chapter_queue, add_in_chapter_success},
    objects::chapter::Chapter,
    utils::{
        download_state::DownloadState,
        get_mangadex_client_from_graphql_context_with_auth_refresh, get_offline_app_state,
        get_watches_from_graphql_context,
        source::SendMultiSourceData,
        watch::{SendData, WatcherInnerData},
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
        let _ = watches.chapter.send_online(data.clone());
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
    ) -> Result<DownloadState> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let ola: tauri::State<'_, crate::app_state::OfflineAppState> =
            get_offline_app_state::<tauri::Wry>(ctx)?;
        add_in_chapter_queue(id)?;
        let offline_app_state_write = ola.read().await;
        let mut olasw = offline_app_state_write
            .clone()
            .map(|a| a.app_state.clone())
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
        let state = {
            if olasw.chapter_utils().with_id(id).is_there() {
                DownloadState::Downloaded {
                    has_failed: olasw
                        .history
                        .get_history_w_file_by_rel_or_init(
                            RelationshipType::Chapter,
                            &olasw.dir_options,
                        )
                        .await?
                        .is_in(id)?,
                }
            } else {
                DownloadState::NotDownloaded
            }
        };
        let _ = watches.download_state.send_data(WatcherInnerData {
            id,
            attributes: state,
        });
        if let Err(_err) = res {
            add_in_chapter_failed(id)?;
            Ok(state)
        } else {
            add_in_chapter_success(id)?;
            let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
            let data: Chapter = olasw.chapter_utils().with_id(id).get_data()?.into();
            let _ = watches.chapter.send_offline(data.clone());
            Ok(state)
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
