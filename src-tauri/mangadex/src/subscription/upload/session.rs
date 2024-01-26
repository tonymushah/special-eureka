use async_graphql::{Context, Result, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use crate::objects::upload::session::attributes::UploadSessionAttributes;
use async_stream::stream;

use crate::subscription::{init_watch_subscription, sub_sleep};

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
        let (watches, should_end, unlisten, window, is_initial_loading) =
            init_watch_subscription::<tauri::Wry>(ctx, sub_id)?;
        let upload_session_sub = watches.upload_session.subscribe();
        Ok(stream! {
            loop {
                if *is_initial_loading.read().await {
                    let mut write = is_initial_loading.write().await;
                    *write = false;
                    let borrow = {
                        upload_session_sub.borrow().as_ref().cloned()
                    };
                    if let Some(data) = borrow {
                        if data.id == upload_session_id {
                            yield data.attributes
                        }
                    }
                } else if !*should_end.read().await {
                    if let Ok(has_changed) = upload_session_sub.has_changed() {
                        if has_changed {
                            let borrow = {
                                upload_session_sub.borrow().as_ref().cloned()
                            };
                            if let Some(data) = borrow {
                                if data.id == upload_session_id {
                                    yield data.attributes
                                }
                            }
                        }
                    }else {
                        break;
                    }
                } else{
                    break;
                }
                sub_sleep().await;
            }
            window.unlisten(unlisten);
        })
    }
}
