use actix::Addr;
use eureka_mmanager::{
    DownloadManager,
    download::{cover::CoverDownloadMessage, state::DownloadMessageState},
    history::service::messages::is_in::IsInMessage,
    prelude::{
        AsyncCanBeWaited, CoverDownloadManager, GetManager, GetManagerStateData, HistoryEntry,
        TaskManagerAddr,
    },
};
use log::{debug, info};
use mangadex_api_schema_rust::v5::CoverObject;
use mangadex_api_types_rust::RelationshipType;
use tauri::{Manager, Runtime};
use uuid::Uuid;

use crate::utils::traits_utils::MangadexTauriManagerExt;

use super::manga::raw_manga_download;

#[cfg_attr(feature = "hotpath", hotpath::measure)]
pub async fn raw_cover_download(
    manager: &Addr<DownloadManager>,
    id: Uuid,
) -> crate::Result<CoverObject> {
    debug!("Getting cover art {id}");
    debug!("Getting cover manager...");
    let cover_manager = GetManager::<CoverDownloadManager>::get(manager).await?;
    debug!("Got manager");
    debug!("Getting task...");
    let mut task = cover_manager
        .new_task(CoverDownloadMessage::new(id).state(DownloadMessageState::Downloading))
        .await?;
    debug!("Got task");
    debug!("Getting wait...");
    let wait = task.wait().await?;
    debug!("Got wait");
    debug!("Waiting...");
    let res = wait.await?;
    info!("Finished downloading cover {}", res.attributes.file_name);
    Ok(res)
}

#[cfg_attr(feature = "hotpath", hotpath::measure)]
pub async fn cover_download<R, M>(app: &M, id: Uuid) -> crate::Result<CoverObject>
where
    R: Runtime,
    M: Manager<R> + Sync,
{
    let offline_app_state = (**app.get_offline_app_state()?).clone().read_owned().await;
    let Some(manager) = (*offline_app_state).as_ref().map(|d| d.app_state.clone()) else {
        return Err(crate::Error::OfflineAppStateNotLoaded);
    };
    let dirs = manager.get_dir_options().await?;
    let cover = raw_cover_download(&manager, id).await?;
    if let Some(manga) = cover
        .find_first_relationships(RelationshipType::Manga)
        .map(|d| d.id)
        && !dirs
            .send(IsInMessage(HistoryEntry::new(
                manga,
                RelationshipType::Manga,
            )))
            .await?
    {
        raw_manga_download(&manager, manga).await?;
    }
    Ok(cover)
}
