use crate::{
    error::Error,
    objects::{cover::Cover, manga::MangaObject as SelfMangaObject},
    query::download_state::DownloadStateQueries,
    Result,
};

use crate::store::types::enums::chapter_quality::DownloadMode;
use actix::prelude::*;
use async_graphql::{Context, Object};
use eureka_mmanager::{
    download::{
        chapter::ChapterDownloadMessage, cover::CoverDownloadMessage, manga::MangaDownloadMessage,
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
    ins_handle,
    objects::chapter::Chapter,
    utils::{
        download_state::DownloadState,
        get_mangadex_client_from_graphql_context_with_auth_refresh, get_offline_app_state,
        get_watches_from_graphql_context,
        source::SendMultiSourceData,
        traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
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
        quality: Option<DownloadMode>,
    ) -> Result<DownloadState> {
        let tauri_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        let tauri_handle_ = tauri_handle.clone();
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let ola: tauri::State<'_, crate::app_state::OfflineAppState> =
            get_offline_app_state::<tauri::Wry>(ctx)?;
        ins_handle::add_in_queue(&tauri_handle, id)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .map(|a| a.app_state.clone())
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        let olasw_ = olasw.clone();

        let res = spawn(async move {
            let watches = tauri_handle_.get_watches()?;
            let mode: MDDownloadMode = quality.unwrap_or_default().into();
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
                    let _ = watches
                        .manga
                        .send_offline(Into::<SelfMangaObject>::into(data.clone()));
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
                    let _ = watches
                        .cover
                        .send_offline(Into::<Cover>::into(task.wait().await?.await?));
                    info!("Downloaded {} cover art", cover.id);
                }
            }
            Ok::<_, Error>(chapter)
        })
        .await?;
        let state = DownloadStateQueries.chapter(ctx, id).await?;
        if let Err(_err) = res {
            ins_handle::add_in_failed(&tauri_handle, id)?;
            Ok(state)
        } else {
            ins_handle::add_in_success(&tauri_handle, id)?;
            //let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
            let data: Chapter = olasw.get_chapter(id).await?.into();
            let _ = watches.chapter.send_offline(data.clone());
            Ok(state)
        }
    }
    pub async fn cancel_download(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .map(|a| a.app_state.clone())
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        olasw
            .get_chapter_manager()
            .await?
            .new_task(ChapterDownloadMessage::new(id))
            .await?
            .cancel()
            .await?;
        Ok(true)
    }
}
