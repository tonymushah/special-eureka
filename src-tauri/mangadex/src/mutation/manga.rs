use std::collections::HashMap;

use crate::{
    error::Error,
    objects::cover::Cover,
    query::download_state::DownloadStateQueries,
    utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
    Result,
};
use actix::Addr;
use async_graphql::{Context, Object};
use eureka_mmanager::{
    download::{
        cover::CoverDownloadMessage, manga::MangaDownloadMessage, state::DownloadMessageState,
    },
    history::service::messages::is_in::IsInMessage,
    prelude::{
        AsyncCanBeWaited, AsyncCancelable, CoverDownloadManager, DeleteDataAsyncTrait, GetManager,
        GetManagerStateData, GetMangaDownloadManager, HistoryEntry, MangaDownloadManager,
        TaskManagerAddr,
    },
    DownloadManager,
};
use mangadex_api_input_types::manga::{
    create::CreateMangaParam, create_relation::MangaCreateRelationParam, list::MangaListParams,
    submit_draft::SubmitMangaDraftParams, update::UpdateMangaParam,
};
use mangadex_api_schema_rust::{v5::MangaAttributes, ApiObjectNoRelationships};
use mangadex_api_types_rust::{MangaRelation, ReadingStatus, RelationshipType};
use uuid::Uuid;

use crate::{
    objects::{
        manga::{related::MangaRelated, MangaObject as Manga},
        ExtractReferenceExpansionFromContext, GetId,
    },
    utils::{
        download_state::DownloadState,
        get_mangadex_client_from_graphql_context_with_auth_refresh, get_offline_app_state,
        get_watches_from_graphql_context,
        source::SendMultiSourceData,
        watch::{is_following::inner::IsFollowingInnerData, SendData},
    },
};

#[derive(Debug, Clone, Copy)]
pub struct MangaMutations;

#[Object]
impl MangaMutations {
    pub async fn download(&self, ctx: &Context<'_>, id: Uuid) -> Result<DownloadState> {
        let tauri_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .map(|a| a.app_state.clone())
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        let manager = olasw.clone();
        let res = tauri::async_runtime::spawn(async move {
            use log::{info, trace};
            trace!("Downloading title {id}");
            let watches = tauri_handle.get_watches()?;
            let dirs =
                <Addr<DownloadManager> as GetManagerStateData>::get_dir_options(&manager).await?;
            let (manga, cover) = {
                let manga_manager =
                    <Addr<DownloadManager> as GetManager<MangaDownloadManager>>::get(&manager)
                        .await?;
                let mut task = manga_manager
                    .send(MangaDownloadMessage::new(id).state(DownloadMessageState::Downloading))
                    .await?;
                let data = task.wait().await?.await?;
                info!(
                    "downloaded title {} = {:?}",
                    data.id,
                    data.attributes.title.values().next()
                );
                let cover = data
                    .find_first_relationships(RelationshipType::CoverArt)
                    .ok_or(Error::msg(format!(
                        "Cannot find the title {} cover art",
                        id
                    )))?
                    .clone();
                (data, cover)
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
            Ok::<_, Error>(manga)
        })
        .await;
        let state = DownloadStateQueries.manga(ctx, id).await?;
        let manga = res??;
        let _ = watches.manga.send_offline(Into::<Manga>::into(manga));
        Ok(state)
    }
    pub async fn create(&self, ctx: &Context<'_>, params: CreateMangaParam) -> Result<Manga> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let data: Manga = Into::<ApiObjectNoRelationships<MangaAttributes>>::into(
            params.send(&client).await?.body.data,
        )
        .into();
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let _ = watches.manga.send_online(data.clone());
        Ok(data)
    }
    pub async fn edit(&self, ctx: &Context<'_>, params: UpdateMangaParam) -> Result<Manga> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let data: Manga = Into::<ApiObjectNoRelationships<MangaAttributes>>::into(
            params.send(&client).await?.body.data,
        )
        .into();
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let _ = watches.manga.send_online(data.clone());
        Ok(data)
    }
    pub async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let _ = client.manga().id(id).delete().send().await?;
        Ok(true)
    }
    pub async fn remove(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .map(|a| a.app_state.clone())
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        let _res = olasw.delete_manga(id).await?;
        Ok(true)
    }
    pub async fn follow(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        client.manga().id(id).follow().post().send().await?;
        let _ = watches.is_following.send_data((
            id,
            IsFollowingInnerData {
                type_: RelationshipType::Manga,
                data: true,
            },
        ));
        Ok(true)
    }
    pub async fn unfollow(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        client.manga().id(id).follow().delete().send().await?;
        let _ = watches.is_following.send_data((
            id,
            IsFollowingInnerData {
                type_: RelationshipType::Manga,
                data: false,
            },
        ));
        Ok(true)
    }
    pub async fn update_reading_status(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        status: Option<ReadingStatus>,
    ) -> Result<bool> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        client
            .manga()
            .id(id)
            .status()
            .post()
            .status(status)
            .send()
            .await?;
        let _ = watches.manga_reading_state.send_data((id, status));
        Ok(true)
    }
    pub async fn submit_draft(
        &self,
        ctx: &Context<'_>,
        params: SubmitMangaDraftParams,
    ) -> Result<Manga> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let data: Manga = Into::<ApiObjectNoRelationships<MangaAttributes>>::into(
            params.send(&client).await?.body.data,
        )
        .into();
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let _ = watches.manga.send_online(data.clone());
        Ok(data)
    }
    pub async fn create_relation(
        &self,
        ctx: &Context<'_>,
        params: MangaCreateRelationParam,
        #[graphql(default)] manga_list_params: MangaListParams,
    ) -> Result<Vec<MangaRelated>> {
        let mut manga_list_params = manga_list_params;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let related_list: HashMap<Uuid, MangaRelation> = params
            .send(&client)
            .await?
            .data
            .into_iter()
            .map(|i| (i.id, i.attributes.relation))
            .collect();
        manga_list_params.includes = <Manga as ExtractReferenceExpansionFromContext>::exctract(ctx);
        manga_list_params.manga_ids = related_list.keys().copied().collect();
        Ok(manga_list_params
            .send(&client)
            .await?
            .data
            .into_iter()
            .map(|i| -> Manga { i.into() })
            .flat_map(|i| -> Option<MangaRelated> {
                Some(MangaRelated {
                    id: i.get_id(),
                    related: *related_list.get(&i.get_id())?,
                    obj: i,
                })
            })
            .collect())
    }
    pub async fn delete_relation(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
        target_manga: Uuid,
    ) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        client
            .manga()
            .manga_id(id)
            .relation()
            .id(target_manga)
            .delete()
            .send()
            .await?;
        Ok(true)
    }
    pub async fn cancel_download(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .map(|e| e.app_state.clone())
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        olasw
            .get_manga_manager()
            .await?
            .new_task(MangaDownloadMessage::new(id))
            .await?
            .cancel()
            .await?;
        Ok(true)
    }
}
