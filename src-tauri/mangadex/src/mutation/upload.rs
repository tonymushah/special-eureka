use async_graphql::{Context, EmptyMutation, Error, Object, Result};
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
    utils::get_mangadex_client_from_graphql_context_with_auth_refresh,
};

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
        if abandon_if_exists {
            check_and_abandon_session_if_exists(&client).await?;
        }
        Ok(params.send(&client).await?.body.data.into())
    }
    pub async fn begin_edit_session(
        &self,
        ctx: &Context<'_>,
        params: BeginEditUploadSessionParam,
        #[graphql(default = true)] abandon_if_exists: bool,
    ) -> Result<UploadSession> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        if abandon_if_exists {
            check_and_abandon_session_if_exists(&client).await?;
        }
        Ok(params.send(&client).await?.body.data.into())
    }
    pub async fn upload_images_to_session(
        &self,
        ctx: &Context<'_>,
        session_id: Uuid,
        path: PathBuf,
    ) -> Result<UploadSessionFile> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let path: StdPathBuf = path.try_into()?;
        let image: UploadImage = path.try_into()?;
        let res = client
            .upload()
            .upload_session_id(session_id)
            .post()
            .add_file(image)
            .send()
            .await?;
        if !res.errors.is_empty() {
            return Err(Error::new_with_source(res.errors.get(0).cloned().ok_or(
                Error::new("The error array is not empty but any error has been found"),
            )?));
        }
        if res.data.is_empty() {
            return Err(Error::new("No files has been uploaded"));
        }
        Ok(res
            .data
            .get(0)
            .cloned()
            .ok_or(Error::new("No files has been uploaded"))?
            .into())
    }
    pub async fn abandon_session(
        &self,
        ctx: &Context<'_>,
        session_id: Uuid,
    ) -> Result<EmptyMutation> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        abandon_session(session_id, &client).await?;
        Ok(EmptyMutation)
    }
    pub async fn commit_session(
        &self,
        ctx: &Context<'_>,
        params: CommitUploadSessionParam,
    ) -> Result<Chapter> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let res = params.send(&client).await?;
        Ok(res.data.clone().drop_relationships().into())
    }
    pub async fn delete_file_from_upload_session(
        &self,
        ctx: &Context<'_>,
        params: DeleteImageParam,
    ) -> Result<EmptyMutation> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let _res = params.send(&client).await?;
        Ok(EmptyMutation)
    }
    pub async fn delete_files_from_upload_session(
        &self,
        ctx: &Context<'_>,
        params: DeleteImagesParam,
    ) -> Result<EmptyMutation> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let _res = params.send(&client).await?;
        Ok(EmptyMutation)
    }
}
