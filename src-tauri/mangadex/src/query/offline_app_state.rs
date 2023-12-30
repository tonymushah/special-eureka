use async_graphql::{Context, Object, Result};

use crate::utils::get_offline_app_state;

#[derive(Debug, Clone, Copy)]
pub struct OfflineAppStateQueries;

#[Object]
impl OfflineAppStateQueries {
    pub async fn is_mounted(&self, ctx: &Context<'_>) -> Result<bool> {
        let app_state = get_offline_app_state::<tauri::Wry>(ctx)?;
        let read = app_state.read().await;
        Ok(read.is_some())
    }
}
