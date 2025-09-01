pub mod export;

use std::{collections::HashMap, time::Duration};

use crate::{
    Result,
    error::Error,
    query::download_state::DownloadStateQueries,
    store::types::structs::content::feed_from_gql_ctx,
    utils::{
        download::manga::download_manga,
        traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
    },
};
use async_graphql::{Context, Object};
use eureka_mmanager::{
    download::manga::MangaDownloadMessage,
    prelude::{AsyncCancelable, DeleteDataAsyncTrait, GetMangaDownloadManager, TaskManagerAddr},
};
use mangadex_api_input_types::{
    custom_list::{add_manga::CustomListAddMangaParam, remove_manga::CustomListRemoveMangaParam},
    manga::{
        create::CreateMangaParam, create_relation::MangaCreateRelationParam, list::MangaListParams,
        submit_draft::SubmitMangaDraftParams, update::UpdateMangaParam,
    },
};
use mangadex_api_schema_rust::{ApiObjectNoRelationships, v5::MangaAttributes};
use mangadex_api_types_rust::{MangaRelation, ReadingStatus, RelationshipType};
use uuid::Uuid;

use crate::{
    objects::{
        ExtractReferenceExpansionFromContext, GetId,
        manga::{MangaObject as Manga, related::MangaRelated},
    },
    utils::{
        download_state::DownloadState,
        get_mangadex_client_from_graphql_context_with_auth_refresh, get_offline_app_state,
        get_watches_from_graphql_context,
        source::SendMultiSourceData,
        watch::{SendData, is_following::inner::IsFollowingInnerData},
    },
};

use super::custom_list::CustomListMutations;

#[derive(Debug, Clone, Copy)]
pub struct MangaMutations;

#[Object]
impl MangaMutations {
    pub async fn download(&self, ctx: &Context<'_>, id: Uuid) -> Result<DownloadState> {
        let tauri_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let res = download_manga(&tauri_handle, id).await?;
        let state = DownloadStateQueries.manga(ctx, id).await?;
        let manga = res;
        let _ = watches.manga.send_offline(Into::<Manga>::into(manga));
        Ok(state)
    }
    pub async fn create(&self, ctx: &Context<'_>, params: CreateMangaParam) -> Result<Manga> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .post_manga()
            .await;
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
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .put_manga()
            .await;
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
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .delete_manga()
            .await;
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
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .commit_manga_draft()
            .await;
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
        manga_list_params: Option<MangaListParams>,
    ) -> Result<Vec<MangaRelated>> {
        let mut manga_list_params =
            feed_from_gql_ctx::<tauri::Wry, _>(ctx, manga_list_params.unwrap_or_default());
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
    pub async fn update_reading_status_batch(
        &self,
        ctx: &Context<'_>,
        manga_ids: Vec<Uuid>,
        status: Option<ReadingStatus>,
    ) -> Result<bool> {
        for manga_id in manga_ids {
            self.update_reading_status(ctx, manga_id, status).await?;
            tokio::time::sleep(Duration::from_millis(100)).await;
        }
        Ok(true)
    }
    pub async fn follow_batch(&self, ctx: &Context<'_>, manga_ids: Vec<Uuid>) -> Result<bool> {
        for manga_id in manga_ids {
            self.follow(ctx, manga_id).await?;
            tokio::time::sleep(Duration::from_millis(100)).await;
        }
        Ok(true)
    }
    pub async fn unfollow_batch(&self, ctx: &Context<'_>, manga_ids: Vec<Uuid>) -> Result<bool> {
        for manga_id in manga_ids {
            self.unfollow(ctx, manga_id).await?;
            tokio::time::sleep(Duration::from_millis(100)).await;
        }
        Ok(true)
    }
    pub async fn add_to_list_batch(
        &self,
        ctx: &Context<'_>,
        manga_id: Uuid,
        custom_lists: Vec<Uuid>,
    ) -> Result<bool> {
        for custom_list in custom_lists {
            CustomListMutations
                .add_manga(
                    ctx,
                    CustomListAddMangaParam {
                        manga_id,
                        list_id: custom_list,
                    },
                )
                .await?;
            tokio::time::sleep(Duration::from_millis(100)).await;
        }
        Ok(true)
    }
    pub async fn remove_from_list_batch(
        &self,
        ctx: &Context<'_>,
        manga_id: Uuid,
        custom_lists: Vec<Uuid>,
    ) -> Result<bool> {
        for custom_list in custom_lists {
            CustomListMutations
                .remove_manga(
                    ctx,
                    CustomListRemoveMangaParam {
                        manga_id,
                        list_id: custom_list,
                    },
                )
                .await?;
            tokio::time::sleep(Duration::from_millis(100)).await;
        }
        Ok(true)
    }
    pub async fn export(&self) -> export::MangaExportMutations {
        export::MangaExportMutations
    }
}
