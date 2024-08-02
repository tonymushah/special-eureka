pub mod get_unique;
pub mod image;
pub mod list;

use crate::{error::Error, Result};
use async_graphql::{Context, Object};
use mangadex_api_input_types::cover::list::CoverListParam;
use mangadex_api_types_rust::RelationshipType;
use mangadex_desktop_api2::{settings::file_history::IsIn, utils::ExtractData};
use url::Url;
use uuid::Uuid;

use crate::{
    cache::cover::CoverImageQuality,
    objects::{
        cover::{lists::CoverResults, Cover},
        ExtractReferenceExpansionFromContext,
    },
    utils::{
        download_state::DownloadState,
        get_offline_app_state, get_watches_from_graphql_context,
        watch::{SendData, WatcherInnerData},
    },
};

use self::{get_unique::CoverGetUniqueQuery, image::CoverImageQuery, list::CoverListQuery};

#[derive(Debug, Clone, Copy)]
pub struct CoverQueries;

#[Object]
impl CoverQueries {
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] params: CoverListParam,
    ) -> Result<CoverResults> {
        let mut params: CoverListParam = params;
        params.includes = <CoverResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        CoverListQuery { params }.list(ctx).await
    }
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<Cover> {
        CoverGetUniqueQuery { id }.get(ctx).await
    }
    pub async fn get_image(
        &self,
        ctx: &Context<'_>,
        manga_id: Uuid,
        cover_id: Uuid,
        filename: String,
        mode: Option<CoverImageQuality>,
    ) -> Result<Url> {
        CoverImageQuery {
            manga_id,
            cover_id,
            filename,
            mode,
        }
        .get::<tauri::Wry>(ctx)
        .await
    }
    pub async fn is_downloaded(&self, ctx: &Context<'_>, id: Uuid) -> Result<DownloadState> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        let state = {
            if olasw.cover_utils().with_id(id).is_there() {
                DownloadState::Downloaded {
                    has_failed: olasw
                        .history
                        .get_history_w_file_by_rel_or_init(
                            RelationshipType::CoverArt,
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
        Ok(state)
    }
}
