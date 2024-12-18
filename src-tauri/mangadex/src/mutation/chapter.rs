use crate::{error::Error, query::download_state::DownloadStateQueries, Result};

use actix::prelude::*;
use async_graphql::{Context, Enum, Object};
use eureka_mmanager::{
    download::{
        chapter::{task::DownloadMode as MDM, ChapterDownloadMessage},
        cover::CoverDownloadMessage,
        manga::MangaDownloadMessage,
        state::DownloadMessageState,
    },
    history::service::messages::is_in::IsInMessage,
    prelude::*,
};
use log::{info, trace};
use mangadex_api::utils::download::chapter::DownloadMode as MDDownloadMode;
use mangadex_api_input_types::chapter::edit::ChapterUpdateParams;
use mangadex_api_schema_rust::{v5::ChapterAttributes, ApiObjectNoRelationships};
use mangadex_api_types_rust::RelationshipType;
use tauri::async_runtime::spawn;
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
            .as_ref()
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        olasw.delete_chapter(id).await?;
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
        let olasw = offline_app_state_write
            .clone()
            .map(|a| a.app_state.clone())
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        let olasw_ = olasw.clone();
        let res = spawn(async move {
            let mode: MDDownloadMode = quality.into();
            let manager = olasw_;
            trace!("Downloading title {id}");
            let dirs =
                <Addr<DownloadManager> as GetManagerStateData>::get_dir_options(&manager).await?;
            let (chapter, manga) = {
                let chapter_manager =
                    <Addr<DownloadManager> as GetManager<ChapterDownloadManager>>::get(&manager)
                        .await?;
                let mut task = chapter_manager
                    .send(
                        ChapterDownloadMessage::new(id)
                            .state(DownloadMessageState::Downloading)
                            .mode(mode),
                    )
                    .await?;
                let data = task.wait().await?.await?;
                info!(
                    "downloaded chapter {} = {:?}",
                    data.id, data.attributes.title
                );
                let rel = data
                    .find_first_relationships(RelationshipType::Manga)
                    .ok_or(Error::msg(format!("Cannot find the chapter {} title", id)))?
                    .clone();
                (data, rel)
            };
            if !dirs
                .send(IsInMessage(HistoryEntry::new(
                    manga.id,
                    RelationshipType::Manga,
                )))
                .await?
            {
                let cover = {
                    trace!("Downloading title {}", manga.id);
                    let manga_manager =
                        <Addr<DownloadManager> as GetManager<MangaDownloadManager>>::get(&manager)
                            .await?;
                    let mut task = manga_manager
                        .send(
                            MangaDownloadMessage::new(manga.id)
                                .state(DownloadMessageState::Downloading),
                        )
                        .await?;
                    let data = task.wait().await?.await?;
                    info!(
                        "downloaded title {} = {:?}",
                        data.id,
                        data.attributes.title.values().next()
                    );
                    data.find_first_relationships(RelationshipType::CoverArt)
                        .ok_or(Error::msg(format!(
                            "Cannot find the title {} cover art",
                            manga.id
                        )))?
                        .clone()
                };
                if !dirs
                    .send(IsInMessage(HistoryEntry::new(
                        cover.id,
                        RelationshipType::CoverArt,
                    )))
                    .await?
                {
                    trace!("Downloading {} cover art", cover.id);
                    let cover_manager =
                        <Addr<DownloadManager> as GetManager<CoverDownloadManager>>::get(&manager)
                            .await?;
                    let mut task = cover_manager
                        .send(
                            CoverDownloadMessage::new(cover.id)
                                .state(DownloadMessageState::Downloading),
                        )
                        .await?;
                    task.wait().await?.await?;
                    info!("Downloaded {} cover art", cover.id);
                }
            }
            Ok::<_, Error>(chapter)
        })
        .await?;
        let state = DownloadStateQueries.chapter(ctx, id).await?;
        if let Err(_err) = res {
            add_in_chapter_failed(id)?;
            Ok(state)
        } else {
            add_in_chapter_success(id)?;
            let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
            let data: Chapter = olasw.get_chapter(id).await?.into();
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
