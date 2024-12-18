use crate::Result;
use async_graphql::{Context, Object};
use eureka_mmanager::prelude::{
    AsyncIsIn, ChapterDataPullAsyncTrait, CoverDataPullAsyncTrait, GetManagerStateData,
    MangaDataPullAsyncTrait,
};
use uuid::Uuid;

use crate::utils::{
    download_state::DownloadState,
    get_offline_app_state, get_watches_from_graphql_context,
    watch::{SendData, WatcherInnerData},
};

#[derive(Debug, Clone, Copy)]
pub struct DownloadStateQueries;

#[Object]
impl DownloadStateQueries {
    pub async fn chapter(&self, ctx: &Context<'_>, chapter_id: Uuid) -> Result<DownloadState> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .ok_or(crate::Error::OfflineAppStateNotLoaded)?;
        let state = {
            if let Ok(chapter) = olasw.get_chapter(chapter_id).await {
                DownloadState::Downloaded {
                    has_failed: olasw.get_history().await?.is_in(&chapter).await?,
                }
            } else {
                DownloadState::NotDownloaded
            }
        };
        let _ = watches.download_state.send_data(WatcherInnerData {
            id: chapter_id,
            attributes: state,
        });
        Ok(state)
    }
    pub async fn cover(&self, ctx: &Context<'_>, cover_id: Uuid) -> Result<DownloadState> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .ok_or(crate::Error::OfflineAppStateNotLoaded)?;
        let state = {
            if let Ok(chapter) = olasw.get_cover(cover_id).await {
                DownloadState::Downloaded {
                    has_failed: olasw.get_history().await?.is_in(&chapter).await?,
                }
            } else {
                DownloadState::NotDownloaded
            }
        };
        let _ = watches.download_state.send_data(WatcherInnerData {
            id: cover_id,
            attributes: state,
        });
        Ok(state)
    }
    pub async fn manga(&self, ctx: &Context<'_>, manga_id: Uuid) -> Result<DownloadState> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .ok_or(crate::Error::OfflineAppStateNotLoaded)?;
        let state = {
            if let Ok(manga) = olasw.get_manga(manga_id).await {
                DownloadState::Downloaded {
                    has_failed: olasw.get_history().await?.is_in(&manga).await?,
                }
            } else {
                DownloadState::NotDownloaded
            }
        };
        let _ = watches.download_state.send_data(WatcherInnerData {
            id: manga_id,
            attributes: state,
        });
        Ok(state)
    }
}
