use std::path::Path;

use async_graphql::{Context, InputObject, Object};
use eureka_mmanager::DirsOptions;

use crate::{
    store::{
        TauriManagerMangadexStoreExtractor,
        types::structs::offline_config::{OfflineConfig, OfflineConfigStore},
    },
    utils::traits_utils::MangadexAsyncGraphQLContextExt,
};

#[derive(Debug, Clone, Copy)]
pub struct OfflineConfigObject;

#[Object]
impl OfflineConfigObject {
    pub async fn data_dir(&self, ctx: &Context<'_>) -> crate::Result<String> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let store_data = app.extract::<OfflineConfigStore>().await?;
        store_data
            .get_dir_options(app)?
            .data_dir
            .to_str()
            .map(String::from)
            .ok_or(crate::Error::OsStrToString)
    }
    /// Often relative to [`Self::data_dir`]
    pub async fn chapters_dir(&self, ctx: &Context<'_>) -> crate::Result<String> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let store_data = app.extract::<OfflineConfigStore>().await?;
        let dir_options = store_data.get_dir_options(app)?;
        let data_dir = &dir_options.data_dir;
        data_dir
            .join(&dir_options.chapters)
            .to_str()
            .map(String::from)
            .ok_or(crate::Error::OsStrToString)
    }
    /// Often relative to [`Self::data_dir`]
    pub async fn mangas_dir(&self, ctx: &Context<'_>) -> crate::Result<String> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let store_data = app.extract::<OfflineConfigStore>().await?;
        let dir_options = store_data.get_dir_options(app)?;
        let data_dir = &dir_options.data_dir;
        data_dir
            .join(&dir_options.mangas)
            .to_str()
            .map(String::from)
            .ok_or(crate::Error::OsStrToString)
    }
    /// Often relative to [`Self::data_dir`]
    pub async fn covers_dir(&self, ctx: &Context<'_>) -> crate::Result<String> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let store_data = app.extract::<OfflineConfigStore>().await?;
        let dir_options = store_data.get_dir_options(app)?;
        let data_dir = &dir_options.data_dir;
        data_dir
            .join(&dir_options.covers)
            .to_str()
            .map(String::from)
            .ok_or(crate::Error::OsStrToString)
    }
}

#[derive(Debug, Clone, InputObject)]
pub struct OfflineConfigInput {
    pub data_directory: String,
    pub chapters_directory: Option<String>,
    pub mangas_directory: Option<String>,
    pub covers_directory: Option<String>,
}

impl From<&OfflineConfigInput> for DirsOptions {
    fn from(value: &OfflineConfigInput) -> Self {
        let mut dirs_opt = DirsOptions::new_from_data_dir(&value.data_directory);
        if let Some(chapters) = value.chapters_directory.as_ref() {
            dirs_opt.chapters = Path::new(chapters).to_path_buf();
        }
        if let Some(mangas) = value.mangas_directory.as_ref() {
            dirs_opt.mangas = Path::new(mangas).to_path_buf();
        }
        if let Some(covers) = value.covers_directory.as_ref() {
            dirs_opt.covers = Path::new(covers).to_path_buf();
        }
        dirs_opt
    }
}

impl From<&OfflineConfigInput> for OfflineConfig {
    fn from(value: &OfflineConfigInput) -> Self {
        Self {
            dir_options: value.into(),
        }
    }
}
