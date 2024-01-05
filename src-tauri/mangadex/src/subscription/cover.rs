use async_graphql::{Context, Result, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use crate::objects::cover::attributes::CoverAttributes;
use async_stream::stream;

use super::{init_watch_subscription, sub_sleep};

#[derive(Debug, Clone, Copy)]
pub struct CoverSubscriptions;

#[Subscription]
impl CoverSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        cover_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = CoverAttributes> + 'ctx> {
        let (watches, should_end, unlisten, window) =
            init_watch_subscription::<tauri::Wry>(ctx, sub_id)?;
        let cover_sub = watches.cover.subscribe();
        Ok(stream! {
            loop {
                if !*should_end.read().await {
                    if let Ok(has_changed) = cover_sub.has_changed() {
                        if has_changed {
                            let borrow = {
                                cover_sub.borrow().as_ref().cloned()
                            };
                            if let Some(data) = borrow {
                                if data.id == cover_id {
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
