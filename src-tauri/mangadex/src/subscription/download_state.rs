pub mod chapter;
pub mod cover;
pub mod manga;

use crate::Result;
use async_graphql::{Context, Subscription};
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
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = DownloadState> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(
                ctx,
                sub_id,
                |w| w.download_state.subscribe(),
            )?
            .option_filter_by_id(object_id),
        )
    }
}
