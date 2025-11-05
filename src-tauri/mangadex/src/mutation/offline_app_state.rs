use crate::error::wrapped::Result;
use async_graphql::{Context, Object};

use crate::utils::{mount_offline_app_state, unmount_offline_app_state};

#[derive(Debug, Clone, Copy)]
pub struct OfflineAppStateMutations;

#[Object]
#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl OfflineAppStateMutations {
    pub async fn mount_offline_app_state(&self, ctx: &Context<'_>) -> Result<bool> {
        mount_offline_app_state::<tauri::Wry>(ctx)
            .await
            .map_err(crate::ErrorWrapper::from)
    }
    pub async fn unmount_offline_app_state(&self, ctx: &Context<'_>) -> Result<bool> {
        unmount_offline_app_state::<tauri::Wry>(ctx)
            .await
            .map_err(crate::ErrorWrapper::from)
    }
}
