pub mod pages;

use crate::{
    Result,
    error::Error,
    query::download_state::DownloadStateQueries,
    store::{
        TauriManagerMangadexStoreExtractor, types::enums::chapter_quality::ChapterQualityStore,
    },
    utils::download::chapter::download_chapter,
};

use crate::store::types::enums::chapter_quality::DownloadMode;
use async_graphql::{Context, Object};
use eureka_mmanager::{download::chapter::ChapterDownloadMessage, prelude::*};
use mangadex_api_input_types::chapter::edit::ChapterUpdateParams;
use mangadex_api_schema_rust::{ApiObjectNoRelationships, v5::ChapterAttributes};
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
#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl ChapterMutations {
    pub async fn update(&self, ctx: &Context<'_>, params: ChapterUpdateParams) -> Result<Chapter> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .put_chapter()
            .await;
        let res: ApiObjectNoRelationships<ChapterAttributes> =
            params.send(&client).await?.body.data.into();
        let data: Chapter = res.into();
        let _ = watches.chapter.send_online(data.clone());
        Ok(data)
    }
    pub async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .delete_chapter()
            .await;
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
        let quality = quality.unwrap_or({
            let app = ctx.get_app_handle::<tauri::Wry>()?;
            app.extract::<ChapterQualityStore>().await?.into()
        });

        let tauri_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();

        ins_handle::add_in_queue(&tauri_handle, id)?;

        let res = download_chapter(&tauri_handle, id, quality.into()).await;
        let state = DownloadStateQueries.chapter(ctx, id).await?;
        if let Err(_err) = res {
            ins_handle::add_in_failed(&tauri_handle, id)?;
            Ok(state)
        } else {
            ins_handle::add_in_success(&tauri_handle, id)?;

            let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
            let ola: tauri::State<'_, crate::app_state::OfflineAppState> =
                get_offline_app_state::<tauri::Wry>(ctx)?;
            let offline_app_state_write = ola.read().await;
            let olasw = offline_app_state_write
                .as_ref()
                .map(|a| a.app_state.clone())
                .ok_or(Error::OfflineAppStateNotLoaded)?;
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
    pub async fn pages_cache(
        &self,
        _ctx: &Context<'_>,
        id: Uuid,
        mode: Option<DownloadMode>,
    ) -> pages::ChapterPagesStoreMutation {
        pages::ChapterPagesStoreMutation {
            id,
            mode: mode.unwrap_or_default(),
        }
    }
}
