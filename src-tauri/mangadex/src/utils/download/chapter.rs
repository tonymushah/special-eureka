use actix::Addr;
use eureka_mmanager::{
    DownloadManager,
    download::{
        chapter::{ChapterDownloadMessage, task::DownloadMode},
        state::DownloadMessageState,
    },
    history::service::messages::is_in::IsInMessage,
    prelude::{
        AsyncCanBeWaited, ChapterDownloadManager, GetManager, GetManagerStateData, HistoryEntry,
        TaskManagerAddr,
    },
};
use mangadex_api_schema_rust::v5::ChapterObject;
use mangadex_api_types_rust::RelationshipType;
use tauri::{Manager, Runtime};
use uuid::Uuid;

use crate::{
    store::{TauriManagerMangadexStoreExtractor, types::structs::force_443::ForcePort443Store},
    utils::traits_utils::MangadexTauriManagerExt,
};

#[cfg_attr(feature = "hotpath", hotpath::measure)]
pub async fn raw_chapter_download(
    manager: &Addr<DownloadManager>,
    id: Uuid,
    quality: DownloadMode,
    force_port_443: bool,
) -> crate::Result<ChapterObject> {
    let mut task = raw_chapter_download_no_wait(manager, id, quality, force_port_443).await?;
    Ok(task.wait().await?.await?)
}

pub async fn raw_chapter_download_no_wait(
    manager: &Addr<DownloadManager>,
    id: Uuid,
    quality: DownloadMode,
    force_port_443: bool,
) -> Result<Addr<eureka_mmanager::prelude::ChapterDownloadTask>, crate::Error> {
    let chapter_manager = GetManager::<ChapterDownloadManager>::get(manager).await?;
    let task = chapter_manager
        .new_task(
            ChapterDownloadMessage::new(id)
                .mode(quality)
                .force_port_443(force_port_443)
                .state(DownloadMessageState::Downloading),
        )
        .await?;
    Ok(task)
}

#[cfg_attr(feature = "hotpath", hotpath::measure)]
pub async fn download_chapter<R, M>(
    app: &M,
    id: Uuid,
    quality: DownloadMode,
) -> crate::Result<ChapterObject>
where
    R: Runtime,
    M: Manager<R> + Sync,
{
    app.get_specific_rate_limit()?.at_home(&id).await;
    let offline_app_state = (**app.get_offline_app_state()?).clone().read_owned().await;
    let Some(manager) = (*offline_app_state).as_ref().map(|d| d.app_state.clone()) else {
        return Err(crate::Error::OfflineAppStateNotLoaded);
    };
    let dirs = manager.get_dir_options().await?;
    let chapter = raw_chapter_download(
        &manager,
        id,
        quality,
        *app.extract::<ForcePort443Store>().await.unwrap_or_default(),
    )
    .await?;
    if let Some(manga) = chapter
        .find_first_relationships(RelationshipType::Manga)
        .map(|d| d.id)
        && !dirs
            .send(IsInMessage(HistoryEntry::new(
                manga,
                RelationshipType::Manga,
            )))
            .await?
        {
            super::manga::download_manga(app, manga).await?;
        }
    Ok(chapter)
}
