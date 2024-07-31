use crate::{error::Error, Result};
use async_graphql::{Context, Object};
use mangadex_api_types_rust::RelationshipType;
use mangadex_desktop_api2::{settings::file_history::IsIn, utils::ExtractData};
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
        let oas = get_offline_app_state::<tauri::Wry>(ctx)?;
        let oas_r = oas.read().await;
        let app_state = oas_r
            .as_ref()
            .ok_or(Error::new("Offline AppState is not mounted"))?;
        let state = {
            if app_state.chapter_utils().with_id(chapter_id).is_there() {
                DownloadState::Downloaded {
                    has_failed: app_state
                        .history
                        .get_history_w_file_by_rel_or_init(
                            RelationshipType::Chapter,
                            &app_state.dir_options,
                        )
                        .await?
                        .is_in(chapter_id)?,
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
        let oas = get_offline_app_state::<tauri::Wry>(ctx)?;
        let oas_r = oas.read().await;
        let app_state = oas_r
            .as_ref()
            .ok_or(Error::new("Offline AppState is not mounted"))?;
        let state = {
            if app_state.cover_utils().with_id(cover_id).is_there() {
                DownloadState::Downloaded {
                    has_failed: app_state
                        .history
                        .get_history_w_file_by_rel_or_init(
                            RelationshipType::CoverArt,
                            &app_state.dir_options,
                        )
                        .await?
                        .is_in(cover_id)?,
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
        let oas = get_offline_app_state::<tauri::Wry>(ctx)?;
        let oas_r = oas.read().await;
        let app_state = oas_r
            .as_ref()
            .ok_or(Error::new("Offline AppState is not mounted"))?;
        let state = {
            if app_state.manga_utils().with_id(manga_id).is_there() {
                DownloadState::Downloaded {
                    has_failed: app_state
                        .history
                        .get_history_w_file_by_rel_or_init(
                            RelationshipType::Manga,
                            &app_state.dir_options,
                        )
                        .await?
                        .is_in(manga_id)?,
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
