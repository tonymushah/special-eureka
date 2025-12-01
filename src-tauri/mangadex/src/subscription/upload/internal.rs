use async_graphql::{Context, Enum, ErrorExtensions, Subscription};
use futures_util::{Stream, StreamExt};
use std::hash::Hash;
use uuid::Uuid;

use crate::{
    ErrorWrapper,
    upload::{InternUploadSessionGQLObject, UploadManagerEventPayload, UploadSessionState},
    utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
};

#[derive(Debug, Copy, Clone, Default)]
pub struct InternalUploadSubscriptions;

type IUSResult<T> = Result<T, async_graphql::Error>;

#[derive(Debug, Copy, Clone, PartialEq, Eq, PartialOrd, Ord, Hash, Enum)]
pub enum InternUploadQueueState {
    Pending,
    Uploading,
}

impl From<UploadSessionState> for IUSResult<Option<InternUploadQueueState>> {
    fn from(value: UploadSessionState) -> Self {
        match value {
            UploadSessionState::Pending => Ok(Some(InternUploadQueueState::Pending)),
            UploadSessionState::Uploading => Ok(Some(InternUploadQueueState::Uploading)),
            UploadSessionState::Error(error) => Err(ErrorExtensions::extend(error.as_ref())),
        }
    }
}

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
    pub async fn watch_internal_upload_session_obj<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        id: Uuid,
    ) -> Result<impl Stream<Item = Option<InternUploadSessionGQLObject>> + 'ctx, ErrorWrapper> {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let manager = app.upload_manager();
        let mut event_stream = manager.event_stream()?;
        Ok(async_stream::stream! {
            let mut obj = manager.get_intern_session_object(id).await;
            yield obj;
            while let Some(event) = event_stream.next().await {
                obj = match event {
                    UploadManagerEventPayload::SessionListUpdate => {
                        manager.get_intern_session_object(id).await
                    },
                    UploadManagerEventPayload::SessionUpdate { id: got_id } if id == got_id => {
                        manager.get_intern_session_object(id).await
                    },
                    _ => {
                        continue
                    }
                };
                yield obj;
            }
        })
    }
    pub async fn watch_internal_upload_queue_state<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        id: Uuid,
    ) -> Result<impl Stream<Item = IUSResult<Option<InternUploadQueueState>>> + 'ctx, ErrorWrapper>
    {
        let app = ctx.get_app_handle::<tauri::Wry>()?;
        let manager = app.upload_manager();
        let mut event_stream = manager.event_stream()?;
        Ok(async_stream::stream! {
            let mut obj: IUSResult<Option<InternUploadQueueState>> = if let Some(inner) = manager.get_session_queue_state(id).await {
               inner.into()
            } else {
                Ok(None)
            };
            yield obj;
            while let Some(event) = event_stream.next().await {
                let state = match event {
                    UploadManagerEventPayload::QueueListUpdate => {
                        manager.get_session_queue_state(id).await
                    },
                    UploadManagerEventPayload::QueueEntryUpdate { id: got_id } if id == got_id => {
                        manager.get_session_queue_state(id).await
                    },
                    _ => {
                        continue;
                    }
                };
                obj = if let Some(inner) = state {
                    inner.into()
                } else {
                    Ok(None)
                };
                yield obj;
            }
        })
    }
}
