use async_graphql::{Context, Result, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use crate::objects::upload::session_file::attributes::UploadSessionFileAttributes;
use async_stream::stream;

use crate::subscription::{init_watch_subscription, sub_sleep};

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
        let (watches, should_end, unlisten, window, is_initial_loading) =
            init_watch_subscription::<tauri::Wry>(ctx, sub_id)?;
        let upload_session_file_sub = watches.upload_session_file.subscribe();
        Ok(stream! {
            loop {
                if is_initial_loading.read().map(|read| *read).unwrap_or(false) {
                    if let Ok(mut write) = is_initial_loading.write() {
                        *write = false;
                    }
                    let borrow = {
                        upload_session_file_sub.borrow().as_ref().cloned()
                    };
                    if let Some(data) = borrow {
                        if data.id == upload_session_file_id {
                            yield data.attributes.clone()
                        }
                    }
                } else if !should_end.read().map(|read| *read).unwrap_or(true) {
                    if let Ok(has_changed) = upload_session_file_sub.has_changed() {
                        if has_changed {
                            let borrow = {
                                upload_session_file_sub.borrow().as_ref().cloned()
                            };
                            if let Some(data) = borrow {
                                if data.id == upload_session_file_id {
                                    yield data.attributes.clone()
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
