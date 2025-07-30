pub mod chapter;
pub mod cover;
pub mod manga;

use crate::Result;
use async_graphql::{Context, Subscription};
use eureka_mmanager::OwnedError;
use tokio_stream::Stream;
use uuid::Uuid;

use crate::utils::download_state::DownloadState;

use super::utils::{FilterWatchOptionDataById, WatchSubscriptionStream};

#[derive(Debug, Clone, Copy)]
pub struct DownloadStateSubscriptions;

#[Subscription]
impl DownloadStateSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        object_id: Uuid,
    ) -> Result<impl Stream<Item = DownloadState> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
                w.download_state.subscribe()
            })?
            .option_filter_by_id(object_id),
        )
    }
}

pub trait NextTaskValue {
    type DownloadingState;
    fn pending() -> Self;
    fn downloading(value: Self::DownloadingState) -> Self;
    fn error(error: OwnedError) -> Self;
    fn done() -> Self;
    fn canceled() -> Self;
    fn offline_app_state_not_loaded() -> Self;
    fn is_pending(&self) -> bool;
    fn is_done(&self) -> bool;
    fn is_canceled(&self) -> bool;
    fn is_offline_app_state_not_loaded(&self) -> bool;
}
