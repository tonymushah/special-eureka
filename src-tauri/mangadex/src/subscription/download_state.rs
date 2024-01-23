use async_graphql::{Context, Result, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use crate::utils::download_state::DownloadedStateObject;
use async_stream::stream;

use super::{init_watch_subscription, sub_sleep};

#[derive(Debug, Clone, Copy)]
pub struct DownloadStateSubscriptions;

#[Subscription]
impl DownloadStateSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        object_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = DownloadedStateObject> + 'ctx> {
        let (watches, should_end, unlisten, window) =
            init_watch_subscription::<tauri::Wry>(ctx, sub_id)?;
        let download_state_sub = watches.download_state.subscribe();
        Ok(stream! {
            loop {
                if !*should_end.read().await {
                    if let Ok(has_changed) = download_state_sub.has_changed() {
                        if has_changed {
                            let borrow = {
                                download_state_sub.borrow().as_ref().copied()
                            };
                            if let Some(data) = borrow {
                                if data.id == object_id {
                                    yield data.attributes.into()
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
