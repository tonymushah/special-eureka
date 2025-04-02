use async_graphql::{Context, Object};

use crate::{
    store::{
        types::structs::offline_config::OfflineConfigStore, TauriManagerMangadexStoreExtractor,
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
        store_data
            .get_dir_options(app)?
            .chapters
            .to_str()
            .map(String::from)
            .ok_or(crate::Error::OsStrToString)
    }
    /// Often relative to [`Self::data_dir`]
    pub async fn mangas_dir(&self, ctx: &Context<'_>) -> crate::Result<String> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let store_data = app.extract::<OfflineConfigStore>().await?;
        store_data
            .get_dir_options(app)?
            .mangas
            .to_str()
            .map(String::from)
            .ok_or(crate::Error::OsStrToString)
    }
    /// Often relative to [`Self::data_dir`]
    pub async fn covers_dir(&self, ctx: &Context<'_>) -> crate::Result<String> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let store_data = app.extract::<OfflineConfigStore>().await?;
        store_data
            .get_dir_options(app)?
            .covers
            .to_str()
            .map(String::from)
            .ok_or(crate::Error::OsStrToString)
    }
}
