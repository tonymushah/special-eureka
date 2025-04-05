use actix::Addr;
use eureka_mmanager::{
    download::{
        chapter::{task::DownloadMode, ChapterDownloadMessage},
        state::DownloadMessageState,
    },
    history::service::messages::is_in::IsInMessage,
    prelude::{
        AsyncCanBeWaited, ChapterDownloadManager, GetManager, GetManagerStateData, HistoryEntry,
        TaskManagerAddr,
    },
    DownloadManager,
};
use mangadex_api_schema_rust::v5::ChapterObject;
use mangadex_api_types_rust::RelationshipType;
use tauri::{Manager, Runtime};
use uuid::Uuid;

use crate::utils::{
    download::{cover::raw_cover_download, manga::raw_manga_download},
    traits_utils::MangadexTauriManagerExt,
};

pub async fn raw_chapter_download(
    manager: &Addr<DownloadManager>,
    id: Uuid,
    quality: DownloadMode,
) -> crate::Result<ChapterObject> {
    let chapter_manager = GetManager::<ChapterDownloadManager>::get(manager).await?;
    let mut task = chapter_manager
        .new_task(
            ChapterDownloadMessage::new(id)
                .mode(quality)
                .state(DownloadMessageState::Downloading),
        )
        .await?;
    Ok(task.wait().await?.await?)
}

pub async fn download_chapter<R, M>(
    app: &M,
    id: Uuid,
    quality: DownloadMode,
) -> crate::Result<ChapterObject>
where
    R: Runtime,
    M: Manager<R> + Sync,
{
    let offline_app_state = (**app.get_offline_app_state()?).clone().read_owned().await;
    let Some(manager) = (*offline_app_state).as_ref().map(|d| d.app_state.clone()) else {
        return Err(crate::Error::OfflineAppStateNotLoaded);
    };
    let dirs = manager.get_dir_options().await?;
    let chapter = raw_chapter_download(&manager, id, quality).await?;
    if let Some(manga) = chapter
        .find_first_relationships(RelationshipType::Manga)
        .map(|d| d.id)
    {
        if !dirs
            .send(IsInMessage(HistoryEntry::new(
                manga,
                RelationshipType::Manga,
            )))
            .await?
        {
            if let Some(cover) = raw_manga_download(&manager, manga)
                .await?
                .find_first_relationships(RelationshipType::CoverArt)
                .map(|d| d.id)
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
        }
    }
    Ok(chapter)
}
