use actix::Addr;
use eureka_mmanager::{
    download::{manga::MangaDownloadMessage, state::DownloadMessageState},
    history::service::messages::is_in::IsInMessage,
    prelude::{
        AsyncCanBeWaited, GetManager, GetManagerStateData, HistoryEntry, MangaDownloadManager,
        TaskManagerAddr,
    },
    DownloadManager,
};
use mangadex_api_schema_rust::v5::MangaObject;
use mangadex_api_types_rust::RelationshipType;
use tauri::{Manager, Runtime};
use uuid::Uuid;

use crate::utils::traits_utils::MangadexTauriManagerExt;

use super::cover::raw_cover_download;

pub async fn raw_manga_download(
    manager: &Addr<DownloadManager>,
    id: Uuid,
) -> crate::Result<MangaObject> {
    let manga_manager = GetManager::<MangaDownloadManager>::get(manager).await?;
    let mut task = manga_manager
        .new_task(MangaDownloadMessage::new(id).state(DownloadMessageState::Downloading))
        .await?;
    Ok(task.wait().await?.await?)
}

pub async fn download_manga<R, M>(app: &M, id: Uuid) -> crate::Result<MangaObject>
where
    R: Runtime,
    M: Manager<R> + Sync,
{
    let offline_app_state = (**app.get_offline_app_state()?).clone().read_owned().await;
    let Some(manager) = (*offline_app_state).as_ref().map(|d| d.app_state.clone()) else {
        return Err(crate::Error::OfflineAppStateNotLoaded);
    };
    let dirs = manager.get_dir_options().await?;
    let manga = raw_manga_download(&manager, id).await?;
    if let Some(cover) = manga
        .find_first_relationships(RelationshipType::CoverArt)
        .map(|r| r.id)
    {
        if !dirs
            .send(IsInMessage(HistoryEntry::new(
                id,
                RelationshipType::CoverArt,
            )))
            .await?
        {
            let _ = raw_cover_download(&manager, cover).await?;
        }
    }
    Ok(manga)
}
