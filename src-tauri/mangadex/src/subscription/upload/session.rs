use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use crate::objects::upload::session::attributes::UploadSessionAttributes;

use crate::subscription::utils::{FilterWatchOptionDataById, WatchSubscriptionStream};

#[derive(Debug, Clone, Copy)]
pub struct UploadSessionSubscriptions;

#[Subscription]
impl UploadSessionSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        upload_session_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = UploadSessionAttributes> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(
                ctx,
                sub_id,
                |w| w.upload_session.subscribe(),
            )?
            .option_filter_by_id(upload_session_id),
        )
    }
}
