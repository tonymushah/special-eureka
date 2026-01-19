use std::collections::HashSet;

use actix::Addr;
use eureka_mmanager::{
    DownloadManager,
    download::{manga::MangaDownloadMessage, state::DownloadMessageState},
    history::service::messages::is_in::IsInMessage,
    prelude::{
        AsyncCanBeWaited, AsyncIntoMangaAggreagate, AsyncIsIn, ChapterDataPullAsyncTrait,
        CoverDataPullAsyncTrait, GetManager, GetManagerStateData, HistoryEntry,
        MangaDownloadManager, TaskManagerAddr,
    },
};
use mangadex_api_input_types::manga::aggregate::MangaAggregateParam;
use mangadex_api_schema_rust::v5::MangaObject;
use mangadex_api_types_rust::RelationshipType;
use tauri::{Manager, Runtime};
use uuid::Uuid;

use crate::{
    ins_handle,
    store::{
        TauriManagerMangadexStoreExtractor,
        types::{
            enums::chapter_quality::ChapterQualityStore,
            structs::{content::GetContentProfile, force_443::ForcePort443Store},
        },
    },
    utils::{source::SendMultiSourceData, traits_utils::MangadexTauriManagerExt},
};

use super::cover::raw_cover_download;

#[cfg_attr(feature = "hotpath", hotpath::measure)]
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

#[cfg_attr(feature = "hotpath", hotpath::measure)]
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
                cover,
                RelationshipType::CoverArt,
            )))
            .await?
        {
            let _ = raw_cover_download(&manager, cover).await?;
        } else {
            match manager.get_cover_image(id).await {
                Err(eureka_mmanager::Error::Io(io))
                | Err(eureka_mmanager::Error::ApiCore(eureka_mmanager_core::Error::Io(io)))
                    if io.kind() == std::io::ErrorKind::NotFound =>
                {
                    let _ = raw_cover_download(&manager, cover).await?;
                }
                _d => {
                    if let Err(err) = &_d {
                        dbg!(err);
                    }
                    let _ = _d?;
                }
            }
        }
    }
    Ok(manga)
}

/// This is for a feature that allows you to download titles with some extras...
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash, async_graphql::Enum)]
pub enum MangaDownloadExtras {
    /// Download with all chapters available
    ///
    /// NOTE: The current implement *only* download all chapters that match the current content profile.
    AllChapters,
    /// Download with all chapters that is marked as unread.
    ///
    /// NOTE: This will not work if the user is not logged in.
    /// Also this one also *only* download all *unread* chapters that match the current content profile.
    Unreads,
    /// Download all undownloaded chapters
    ///
    /// NOTE: _Again_, this will *only* download undownloaded that match the current content profile.
    UnDownloadeds,
    /// Download all unread undownloaded chapters.
    ///
    /// Only the one matching the current content profile
    UnReadUnDownloadeds,
    /// Re-download all failed chapters
    ///
    /// Only the one matching the current content profile
    Failed,
    /// Re-download all un-read failed chapters
    ///
    /// Only the one matching the current content profile
    UnReadFailed,
}

pub async fn get_title_chapter_ids<R, M>(app: &M, title_id: Uuid) -> crate::Result<HashSet<Uuid>>
where
    R: Runtime,
    M: Manager<R> + Sync,
{
    let client = app.get_mangadex_client()?;
    let cp = app.app_handle().get_content_profile()?;
    Ok(client
        .manga()
        .id(title_id)
        .aggregate()
        .get()
        .translated_language(cp.translated_languages)
        .send()
        .await?
        .volumes
        .into_iter()
        .flat_map(|v| {
            v.chapters.into_iter().flat_map(|c| {
                let mut chapter_ids = c.others;
                chapter_ids.push(c.id);
                chapter_ids
            })
        })
        .collect())
}

pub async fn get_title_unread_chapters<R, M>(
    app: &M,
    title_id: Uuid,
) -> crate::Result<HashSet<Uuid>>
where
    R: Runtime,
    M: Manager<R> + Sync,
{
    let read: HashSet<_> = {
        let client = app.get_mangadex_client_with_auth_refresh().await?;
        client
            .manga()
            .id(title_id)
            .read()
            .get()
            .send()
            .await?
            .data
            .into_iter()
            .collect()
    };
    let all_chapters = get_title_chapter_ids(app, title_id).await?;
    Ok(&all_chapters - &read)
}

pub async fn get_title_downloaded_chapters_id<R, M>(
    app: &M,
    title_id: Uuid,
) -> crate::Result<HashSet<Uuid>>
where
    R: Runtime,
    M: Manager<R> + Sync,
{
    let maybe_app_state = app.get_offline_app_state()?;
    let cp = app.app_handle().get_content_profile()?;
    let read = maybe_app_state.read().await;
    let state = read
        .as_ref()
        .ok_or(crate::Error::OfflineAppStateNotLoaded)?;
    Ok(state
        .get_chapters()
        .await?
        .aggregate(MangaAggregateParam {
            manga_id: title_id,
            translated_language: cp.translated_languages,
            groups: Default::default(),
        })
        .await
        .volumes
        .into_iter()
        .flat_map(|v| {
            v.chapters.into_iter().flat_map(|c| {
                let mut chapter_ids = c.others;
                chapter_ids.push(c.id);
                chapter_ids
            })
        })
        .collect())
}

pub async fn get_title_undownloaded_chapters<R, M>(
    app: &M,
    title_id: Uuid,
) -> crate::Result<HashSet<Uuid>>
where
    R: Runtime,
    M: Manager<R> + Sync,
{
    let downloaded: HashSet<_> = get_title_downloaded_chapters_id(app, title_id).await?;
    let all_chapters = get_title_chapter_ids(app, title_id).await?;
    Ok(&all_chapters - &downloaded)
}

pub async fn get_title_failed_chapters<R, M>(
    app: &M,
    title_id: Uuid,
) -> crate::Result<HashSet<Uuid>>
where
    R: Runtime,
    M: Manager<R> + Sync,
{
    let downloaded = get_title_downloaded_chapters_id(app, title_id).await?;
    let maybe_app_state = app.get_offline_app_state()?;
    let read = maybe_app_state.read().await;
    let state = read
        .as_ref()
        .ok_or(crate::Error::OfflineAppStateNotLoaded)?;
    let history = state.app_state.get_history().await?;
    let mut failed = HashSet::<Uuid>::new();
    for id in downloaded {
        if history
            .is_in(HistoryEntry::new(id, RelationshipType::Chapter))
            .await?
        {
            failed.insert(id);
        }
    }
    Ok(failed)
}

pub async fn get_title_undownloaded_unread_chapters<R, M>(
    app: &M,
    title_id: Uuid,
) -> crate::Result<HashSet<Uuid>>
where
    R: Runtime,
    M: Manager<R> + Sync,
{
    // Humm... won't this call `GET /manga/{id}/aggregate` twice?
    //
    // This is somewhat dumb but I am lazy to copy-paste and rethink again about how to do it
    // _Heh_ I am sure it will be fine...
    // Let me add a TODO for those who want to make some useful contribution in the ~far~ future.
    //
    // TODO: make this func only call `GET /manga/{id}/aggregate` once
    let undownloaded = get_title_undownloaded_chapters(app, title_id).await?;
    let unread = get_title_unread_chapters(app, title_id).await?;
    // I love HashSet man...
    Ok(&undownloaded & &unread)
}

pub async fn get_title_failed_unread_chapters<R, M>(
    app: &M,
    title_id: Uuid,
) -> crate::Result<HashSet<Uuid>>
where
    R: Runtime,
    M: Manager<R> + Sync,
{
    let failed = get_title_failed_chapters(app, title_id).await?;
    let unread = get_title_unread_chapters(app, title_id).await?;
    Ok(&failed & &unread)
}

pub async fn download_title_with_extras<R, M>(
    app: &M,
    title_id: Uuid,
    extras: Option<MangaDownloadExtras>,
) -> crate::Result<MangaObject>
where
    R: Runtime,
    M: Manager<R> + Sync,
{
    let mg_obj = download_manga(app, title_id).await?;
    if let Some(extras) = extras {
        let chap_ids = match extras {
            MangaDownloadExtras::AllChapters => get_title_chapter_ids(app, title_id).await?,
            MangaDownloadExtras::UnDownloadeds => {
                get_title_undownloaded_chapters(app, title_id).await?
            }
            MangaDownloadExtras::UnReadUnDownloadeds => {
                get_title_undownloaded_unread_chapters(app, title_id).await?
            }
            MangaDownloadExtras::Unreads => get_title_unread_chapters(app, title_id).await?,
            MangaDownloadExtras::Failed => get_title_failed_chapters(app, title_id).await?,
            MangaDownloadExtras::UnReadFailed => {
                get_title_failed_unread_chapters(app, title_id).await?
            }
        };
        for id in chap_ids {
            let rate_limit = app.get_specific_rate_limit()?;
            let (offline_app_state, _) = tokio::join!(
                (**app.get_offline_app_state()?).clone().read_owned(),
                rate_limit.at_home(&id)
            );
            let Some(manager) = (*offline_app_state).as_ref().map(|d| d.app_state.clone()) else {
                return Err(crate::Error::OfflineAppStateNotLoaded);
            };

            let wait = super::chapter::raw_chapter_download_no_wait(
                &manager,
                id,
                (*app
                    .extract::<ChapterQualityStore>()
                    .await
                    .unwrap_or_default())
                .into(),
                *app.extract::<ForcePort443Store>().await.unwrap_or_default(),
            )
            .await?
            .wait()
            .await?;
            {
                ins_handle::add_in_queue(app.app_handle(), id)?;
                let app = app.app_handle().clone();

                tokio::spawn(async move {
                    match wait.await {
                        Ok(res) => {
                            if let Err(err) = ins_handle::add_in_success(&app, id) {
                                log::error!("{err}");
                            }
                            let data: crate::objects::chapter::Chapter = res.into();
                            app.get_watches()?.chapter.send_offline(data);
                        }
                        Err(err) => {
                            if let Err(e) = ins_handle::add_in_failed(&app, id) {
                                log::error!("{e}");
                            }
                            log::error!("chapter id {id} => {err}");
                        }
                    }
                    Ok::<_, crate::Error>(())
                });
            }
        }
    }
    Ok(mg_obj)
}
