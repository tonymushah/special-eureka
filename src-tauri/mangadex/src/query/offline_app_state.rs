use async_graphql::{Context, Object, Result};

use crate::utils::{get_offline_app_state, get_watches_from_graphql_context, watch::SendData};

#[derive(Debug, Clone, Copy)]
pub struct OfflineAppStateQueries;

#[Object]
impl OfflineAppStateQueries {
    pub async fn is_mounted(&self, ctx: &Context<'_>) -> Result<bool> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let app_state = get_offline_app_state::<tauri::Wry>(ctx)?;
        let read = app_state.read().await;
        let _ = watches.is_appstate_mounted.send_data(read.is_some());
        Ok(read.is_some())
    }
}
