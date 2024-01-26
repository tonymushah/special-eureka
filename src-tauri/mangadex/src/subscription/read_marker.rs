use async_graphql::{Context, Result, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use async_stream::stream;

use super::{init_watch_subscription, sub_sleep};

#[derive(Debug, Clone, Copy)]
pub struct ChapterReadMarkerSubscriptions;

#[Subscription]
impl ChapterReadMarkerSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        chapter_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        let (watches, should_end, unlisten, window, is_initial_loading) =
            init_watch_subscription::<tauri::Wry>(ctx, sub_id)?;
        let read_marker_sub = watches.read_marker.subscribe();
        Ok(stream! {
            loop {
                if *is_initial_loading.read().await {
                    let mut write = is_initial_loading.write().await;
                    *write = false;
                    let borrow = {
                        read_marker_sub.borrow().as_ref().copied()
                    };
                    if let Some(data) = borrow {
                        if data.id == chapter_id {
                            yield data.attributes
                        }
                    }
                } else if !*should_end.read().await {
                    if let Ok(has_changed) = read_marker_sub.has_changed() {
                        if has_changed {
                            let borrow = {
                                read_marker_sub.borrow().as_ref().copied()
                            };
                            if let Some(data) = borrow {
                                if data.id == chapter_id {
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
