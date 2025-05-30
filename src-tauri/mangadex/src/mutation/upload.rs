use crate::{
    utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
    Result,
};
use async_graphql::{Context, Object};
use mangadex_api::{
    utils::upload::{abandon_session, check_and_abandon_session_if_exists},
    v5::upload::upload_session_id::post::UploadImage,
};
use mangadex_api_input_types::{
    upload::{
        begin_edit_session::BeginEditUploadSessionParam, begin_session::BeginUploadSessionParam,
        commit::CommitUploadSessionParam, delete_uploaded_image::DeleteImageParam,
        delete_uploaded_images::DeleteImagesParam,
    },
    PathBuf,
};
use std::path::PathBuf as StdPathBuf;
use uuid::Uuid;

use crate::{
    objects::{
        chapter::Chapter,
        upload::{session::UploadSession, session_file::UploadSessionFile},
    },
    utils::{
        get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_watches_from_graphql_context, source::SendMultiSourceData, watch::SendData,
    },
};

#[derive(Debug, thiserror::Error)]
pub enum ChapterUploadError {
    #[error("No files has been uploaded")]
    NoFileUploaded,
    #[error("Got {} errors while uploading files", .0.len())]
    UploadFiles(Vec<mangadex_api_schema_rust::v5::error::MangaDexError_>),
}

#[derive(Debug, Clone, Copy)]
pub struct UploadMutations;

#[Object]
impl UploadMutations {
    pub async fn begin_session(
        &self,
        ctx: &Context<'_>,
        params: BeginUploadSessionParam,
        #[graphql(default = true)] abandon_if_exists: bool,
    ) -> Result<UploadSession> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let rate_limitss = ctx
            .get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?;
        if abandon_if_exists {
            tokio::join!(rate_limitss.get_upload(), rate_limitss.delete_upload());
            check_and_abandon_session_if_exists(&client).await?;
        }
        rate_limitss.begin_upload().await;
        let data: UploadSession = params.send(&client).await?.body.data.into();
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let _ = watches.upload_session.send_data(data.clone());
        Ok(data)
    }
    pub async fn begin_edit_session(
        &self,
        ctx: &Context<'_>,
        params: BeginEditUploadSessionParam,
        #[graphql(default = true)] abandon_if_exists: bool,
    ) -> Result<UploadSession> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let rate_limitss = ctx
            .get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?;
        if abandon_if_exists {
            tokio::join!(rate_limitss.get_upload(), rate_limitss.delete_upload());
            check_and_abandon_session_if_exists(&client).await?;
        }
        rate_limitss.begin_upload().await;
        let data: UploadSession = params.send(&client).await?.body.data.into();
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let _ = watches.upload_session.send_data(data.clone());
        Ok(data)
    }
    pub async fn upload_images_to_session(
        &self,
        ctx: &Context<'_>,
        session_id: Uuid,
        path: PathBuf,
    ) -> Result<UploadSessionFile> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let path: StdPathBuf = path.into();
        let image: UploadImage = path.try_into()?;
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .upload_files()
            .await;
        let res = client
            .upload()
            .upload_session_id(session_id)
            .post()
            .add_file(image)
            .send()
            .await?;
        if !res.errors.is_empty() {
            return Err(ChapterUploadError::UploadFiles(res.errors.clone()).into());
        }
        if res.data.is_empty() {
            return Err(ChapterUploadError::NoFileUploaded.into());
        }
        let data: UploadSessionFile = res
            .data
            .first()
            .cloned()
            .ok_or(ChapterUploadError::NoFileUploaded)?
            .into();
        let _ = watches.upload_session_file.send_data(data.clone());
        Ok(data)
    }
    pub async fn abandon_session(&self, ctx: &Context<'_>, session_id: Uuid) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .delete_upload()
            .await;
        abandon_session(session_id, &client).await?;
        Ok(true)
    }
    pub async fn commit_session(
        &self,
        ctx: &Context<'_>,
        params: CommitUploadSessionParam,
    ) -> Result<Chapter> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .commit_upload()
            .await;
        let res = params.send(&client).await?;
        let data: Chapter = res.data.clone().drop_relationships().into();
        let _ = watches.chapter.send_online(data.clone());
        Ok(data)
    }
    pub async fn delete_file_from_upload_session(
        &self,
        ctx: &Context<'_>,
        params: DeleteImageParam,
    ) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .upload_files()
            .await;
        let _res = params.send(&client).await?;
        Ok(true)
    }
    pub async fn delete_files_from_upload_session(
        &self,
        ctx: &Context<'_>,
        params: DeleteImagesParam,
    ) -> Result<bool> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        ctx.get_app_handle::<tauri::Wry>()?
            .get_specific_rate_limit()?
            .upload_files()
            .await;
        let _res = params.send(&client).await?;
        Ok(true)
    }
}
