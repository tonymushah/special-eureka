use crate::utils::watch::upload::session_file::UploadSessionFileWatch;
use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use crate::objects::upload::session_file::attributes::UploadSessionFileAttributes;
use crate::subscription::utils::{FilterWatchOptionDataById, WatchSubscriptionStream};

#[derive(Debug, Clone, Copy)]
pub struct UploadSessionFileSubscriptions;

#[Subscription]
impl UploadSessionFileSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        upload_session_file_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = UploadSessionFileAttributes> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context_watch_as_ref::<
                UploadSessionFileWatch,
            >(ctx, sub_id)?
            .option_filter_by_id(upload_session_file_id),
        )
    }
}
