use async_graphql::{Context, Result, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use crate::objects::chapter::attributes::ChapterAttributes;
use async_stream::stream;

use super::{init_watch_subscription, sub_sleep};

#[derive(Debug, Clone, Copy)]
pub struct ChapterSubscriptions;

#[Subscription]
impl ChapterSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        chapter_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = ChapterAttributes> + 'ctx> {
        let (watches, should_end, unlisten, window) =
            init_watch_subscription::<tauri::Wry>(ctx, sub_id)?;
        let chapter_sub = watches.chapter.subscribe();
        Ok(stream! {
            loop {
                if !*should_end.read().await {
                    if let Ok(has_changed) = chapter_sub.has_changed() {
                        if has_changed {
                            let borrow = {
                                chapter_sub.borrow().as_ref().cloned()
                            };
                            if let Some(data) = borrow {
                                if data.id == chapter_id {
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