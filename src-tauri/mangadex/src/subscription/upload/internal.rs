use async_graphql::{Context, Subscription};
use futures_util::{Stream, StreamExt};
use uuid::Uuid;

use crate::{
    ErrorWrapper,
    upload::UploadManagerEventPayload,
    utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
};

#[derive(Debug, Copy, Clone, Default)]
pub struct InternalUploadSubscriptions;

type IUSResult<T> = Result<T, async_graphql::Error>;

#[Subscription]
impl InternalUploadSubscriptions {
    pub async fn watch_internal_upload_queue_list_ids<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Vec<Uuid>> + 'ctx, ErrorWrapper> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let manager = app.upload_manager();
        let mut event_stream = manager.event_stream()?;
        Ok(async_stream::stream! {
            let mut order = manager.get_queue_order().await;
            yield order;
            while let Some(event) = event_stream.next().await {
                if matches!(event, UploadManagerEventPayload::QueueListUpdate) {
                    order = manager.get_queue_order().await;
                    yield order;
                }
            }
        })
    }
    pub async fn watch_internal_upload_sessions_list_ids<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Vec<Uuid>> + 'ctx, ErrorWrapper> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let manager = app.upload_manager();
        let mut event_stream = manager.event_stream()?;
        Ok(async_stream::stream! {
            let mut ids = manager.get_session_ids().await;
            yield ids;
            while let Some(event) = event_stream.next().await {
                if matches!(event, UploadManagerEventPayload::SessionListUpdate) {
                    ids = manager.get_session_ids().await;
                    yield ids;
                }
            }
        })
    }
}
