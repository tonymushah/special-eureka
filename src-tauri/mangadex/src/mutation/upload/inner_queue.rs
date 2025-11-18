use std::path::PathBuf;

use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::{
    ErrorWrapper,
    upload::InternUploadSessionCommitData,
    utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
};

pub struct InternalSessionsMutations;

#[Object]
impl InternalSessionsMutations {
    pub async fn session(&self, id: Uuid) -> InternalSessionMutation {
        InternalSessionMutation(id)
    }
    /// Returns the internal session id
    pub async fn create_session(
        &self,
        ctx: &Context<'_>,
        manga_id: Uuid,
        groups: Option<Vec<Uuid>>,
    ) -> Result<Uuid, ErrorWrapper> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?;
        let manager = app_handle.upload_manager();
        Ok(manager.create_session(manga_id, groups).await?)
    }
    pub async fn start_queue_runner(
        &self,
        ctx: &Context<'_>,
    ) -> Result<Option<bool>, ErrorWrapper> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?;
        let manager = app_handle.upload_manager();
        manager.start_queue_runner().await;
        Ok(None)
    }
    pub async fn swap_queue_order(
        &self,
        ctx: &Context<'_>,
        a: Uuid,
        b: Uuid,
    ) -> Result<Option<bool>, ErrorWrapper> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?;
        let manager = app_handle.upload_manager();
        manager.swap(a, b).await?;
        Ok(None)
    }
}

pub struct InternalSessionMutation(Uuid);

#[Object]
impl InternalSessionMutation {
    pub async fn send_in_queue(&self, ctx: &Context<'_>) -> Result<Option<bool>, ErrorWrapper> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?;
        let manager = app_handle.upload_manager();
        manager.send_session_in_queue(self.0).await?;
        Ok(None)
    }
    pub async fn remove(&self, ctx: &Context<'_>) -> Result<Option<bool>, ErrorWrapper> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?;
        let manager = app_handle.upload_manager();
        manager.remove_session(self.0).await?;
        Ok(None)
    }
    pub async fn add_file(
        &self,
        ctx: &Context<'_>,
        img_path: String,
        index: Option<u32>,
    ) -> Result<Option<bool>, ErrorWrapper> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?;
        let manager = app_handle.upload_manager();
        manager
            .add_file_to_session(self.0, img_path.into(), index)
            .await?;
        Ok(None)
    }
    pub async fn add_files(
        &self,
        ctx: &Context<'_>,
        img_paths: Vec<String>,
        index: Option<u32>,
    ) -> Result<Option<bool>, ErrorWrapper> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?;
        let manager = app_handle.upload_manager();
        manager
            .add_files_to_session(
                self.0,
                img_paths.into_iter().map(PathBuf::from).collect(),
                index,
            )
            .await?;
        Ok(None)
    }
    pub async fn remove_file(
        &self,
        ctx: &Context<'_>,
        img_path: String,
    ) -> Result<Option<bool>, ErrorWrapper> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?;
        let manager = app_handle.upload_manager();
        manager.remove_file_from_session(self.0, img_path).await?;
        Ok(None)
    }
    pub async fn remove_files(
        &self,
        ctx: &Context<'_>,
        img_paths: Vec<String>,
    ) -> Result<Option<bool>, ErrorWrapper> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?;
        let manager = app_handle.upload_manager();
        manager.remove_files_from_session(self.0, img_paths).await?;
        Ok(None)
    }
    pub async fn set_commit_data(
        &self,
        ctx: &Context<'_>,
        commit_data: Option<InternUploadSessionCommitData>,
        start_runner: Option<bool>,
    ) -> Result<Option<bool>, ErrorWrapper> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?;
        let manager = app_handle.upload_manager();
        if start_runner.unwrap_or_default() {
            manager
                .set_commit_data_and_send_to_queue(self.0, commit_data)
                .await?;
        } else {
            manager.set_commit_data(self.0, commit_data).await?;
        }
        Ok(None)
    }
}
