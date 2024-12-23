use crate::{
    error::Error,
    objects::manga::MangaObject as SelfMangaObject,
    query::download_state::DownloadStateQueries,
    utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
    Result,
};
use actix::Addr;
use async_graphql::{Context, Object};
use eureka_mmanager::prelude::DeleteDataAsyncTrait;
use mangadex_api_input_types::cover::{edit::CoverEditParam, upload::CoverUploadParam};
use mangadex_api_schema_rust::{
    v5::{CoverAttributes, RelatedAttributes},
    ApiObjectNoRelationships,
};
use mangadex_api_types_rust::RelationshipType;
use uuid::Uuid;

use crate::{
    objects::cover::Cover,
    utils::{
        download_state::DownloadState, get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_offline_app_state, get_watches_from_graphql_context, source::SendMultiSourceData,
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
        let tauri_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .map(|a| a.app_state.clone())
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        let manager = olasw.clone();
        let res = tauri::async_runtime::spawn(async move {
            use eureka_mmanager::{
                download::{
                    cover::CoverDownloadMessage, manga::MangaDownloadMessage,
                    state::DownloadMessageState,
                },
                history::service::messages::is_in::IsInMessage,
                prelude::{
                    AsyncCanBeWaited, CoverDownloadManager, DownloadManager, GetManager,
                    GetManagerStateData, HistoryEntry, MangaDownloadManager,
                },
            };
            use log::{info, trace};

            let watches = tauri_handle.get_watches()?;
            trace!("Downloading Cover {id}");
            let dirs =
                <Addr<DownloadManager> as GetManagerStateData>::get_dir_options(&manager).await?;
            let (cover, manga) = {
                let manga_manager =
                    <Addr<DownloadManager> as GetManager<CoverDownloadManager>>::get(&manager)
                        .await?;
                let mut task = manga_manager
                    .send(CoverDownloadMessage::new(id).state(DownloadMessageState::Downloading))
                    .await?;
                let data = task.wait().await?.await?;
                info!(
                    "downloaded cover {} = {:?}",
                    data.id, data.attributes.file_name
                );
                let cover = data
                    .find_first_relationships(RelationshipType::Manga)
                    .ok_or(Error::msg(format!(
                        "Cannot find the title for cover art {}",
                        id,
                    )))?
                    .clone();
                (data, cover)
            };
            if !dirs
                .send(IsInMessage(HistoryEntry::new(
                    manga.id,
                    RelationshipType::Manga,
                )))
                .await?
            {
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
                let _ = watches
                    .manga
                    .send_offline(Into::<SelfMangaObject>::into(task.wait().await?.await?));
                info!(
                    "downloaded title {} = {:?}",
                    manga.id,
                    manga.attributes.and_then(|attr| {
                        let RelatedAttributes::Manga(manga) = attr else {
                            return None;
                        };
                        manga.title.values().next().cloned()
                    })
                );
            }
            Ok::<_, Error>(cover)
        })
        .await;
        let state = DownloadStateQueries.cover(ctx, id).await?;
        res??;
        Ok(state)
    }
    pub async fn remove(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .map(|e| e.app_state.clone())
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        olasw.delete_cover(id).await?;
        Ok(true)
    }
}
