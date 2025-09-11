use std::{
    fs::{File, create_dir_all},
    io::{self, BufWriter, Write},
    path::Path,
};

use async_graphql::{Context, Object};
use bytes::Buf;
use eureka_mmanager::{
    download::cover::CoverDownloadMessage,
    prelude::{AsyncCancelable, DeleteDataAsyncTrait, GetCoverDownloadManager, TaskManagerAddr},
};
use mangadex_api_input_types::cover::{edit::CoverEditParam, upload::CoverUploadParam};
use mangadex_api_schema_rust::{ApiObjectNoRelationships, v5::CoverAttributes};
use uuid::Uuid;

use crate::{
    Result,
    error::Error,
    query::download_state::DownloadStateQueries,
    utils::{download::cover::cover_download, traits_utils::MangadexAsyncGraphQLContextExt},
};
use crate::{
    objects::cover::Cover,
    utils::{
        download_state::DownloadState, get_mangadex_client_from_graphql_context,
        get_mangadex_client_from_graphql_context_with_auth_refresh, get_offline_app_state,
        get_watches_from_graphql_context, source::SendMultiSourceData,
        traits_utils::MangadexTauriManagerExt,
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
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .post_cover()
            .await;
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
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .put_cover()
            .await;
        let data: ApiObjectNoRelationships<CoverAttributes> =
            params.send(&client).await?.body.data.into();
        let data: Cover = data.into();
        let _ = watches.cover.send_online(data.clone());
        Ok(data)
    }
    pub async fn delete(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .delete_cover()
            .await;
        let _ = client.cover().cover_id(id).delete().send().await?;
        Ok(true)
    }
    pub async fn download(&self, ctx: &Context<'_>, id: Uuid) -> Result<DownloadState> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let res = cover_download(app, id).await;
        let state = DownloadStateQueries.cover(ctx, id).await?;
        res?;
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
    pub async fn cancel_download(&self, ctx: &Context<'_>, id: Uuid) -> Result<bool> {
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .map(|e| e.app_state.clone())
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        olasw
            .get_cover_manager()
            .await?
            .new_task(CoverDownloadMessage::new(id))
            .await?
            .cancel()
            .await?;
        Ok(true)
    }
    pub async fn save_image(
        &self,
        ctx: &Context<'_>,
        cover_id: Uuid,
        export_dir: String,
    ) -> Result<String, crate::error::ErrorWrapper> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let (file, bytes) = client
            .download()
            .cover()
            .build()
            .map_err(mangadex_api_types_rust::error::Error::BuilderError)?
            .via_cover_id(cover_id)
            .await?;
        let bytes = bytes?;
        create_dir_all(&export_dir)?;
        let export_path = Path::new(&export_dir).join(file);
        let mut file = File::create(&export_path)?;
        {
            let mut buf_writer = BufWriter::new(&mut file);
            io::copy(&mut bytes.reader(), &mut buf_writer)?;
            buf_writer.flush()?;
        }
        export_path
            .to_str()
            .map(String::from)
            .ok_or(crate::error::ErrorWrapper::from(crate::Error::PathToStr))
    }
}
