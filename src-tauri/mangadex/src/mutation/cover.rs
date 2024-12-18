use crate::{error::Error, Result};
use async_graphql::{Context, Object};
use mangadex_api_input_types::cover::{edit::CoverEditParam, upload::CoverUploadParam};
use mangadex_api_schema_rust::{v5::CoverAttributes, ApiObjectNoRelationships};
use mangadex_api_types_rust::RelationshipType;
use uuid::Uuid;

use crate::{
    objects::cover::Cover,
    utils::{
        download_state::DownloadState,
        get_mangadex_client_from_graphql_context_with_auth_refresh, get_offline_app_state,
        get_watches_from_graphql_context,
        source::SendMultiSourceData,
        watch::{SendData, WatcherInnerData},
    },
};

#[derive(Debug, Clone, Copy)]
pub struct CoverMutations;

#[Object]
impl CoverMutations {
    pub async fn upload(&self, ctx: &Context<'_>, params: CoverUploadParam) -> Result<Cover> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let data: ApiObjectNoRelationships<CoverAttributes> =
            params.send(&client).await?.body.data.into();
        let data: Cover = data.into();
        let _ = watches.cover.send_online(data.clone());
        Ok(data)
    }
    pub async fn edit(&self, ctx: &Context<'_>, params: CoverEditParam) -> Result<Cover> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let data: ApiObjectNoRelationships<CoverAttributes> =
            params.send(&client).await?.body.data.into();
        let data: Cover = data.into();
        let _ = watches.cover.send_online(data.clone());
        Ok(data)
    }
    pub async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let _ = client.cover().cover_id(id).delete().send().await?;
        Ok(true)
    }
    pub async fn download(&self, ctx: &Context<'_>, id: Uuid) -> Result<DownloadState> {
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let mut olasw = offline_app_state_write
            .clone()
            .map(|a| a.app_state.clone())
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let data: Cover = olasw
            .cover_download(id)
            .download(&mut olasw)
            .await?
            .data
            .into();
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
        let _ = watches.cover.send_offline(data.clone());
        Ok(state)
    }
    pub async fn remove(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .clone()
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        olasw.cover_utils().with_id(id).delete()?;
        Ok(true)
    }
}
