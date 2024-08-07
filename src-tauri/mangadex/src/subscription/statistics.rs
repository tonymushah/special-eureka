pub mod manga;

use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use crate::objects::statistics::StatisticsComments;
use async_stream::stream;

use super::{init_watch_subscription, sub_sleep};

#[derive(Debug, Clone, Copy)]
pub struct StatisticsSubscriptions;

#[Subscription]
impl StatisticsSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = StatisticsComments> + 'ctx> {
        let (watches, should_end, unlisten, window, is_initial_loading) =
            init_watch_subscription::<tauri::Wry>(ctx, sub_id)?;
        let cover_sub = watches.statistics.subscribe();
        Ok(stream! {
            loop {
                if is_initial_loading.read().map(|read| *read).unwrap_or(false) {
                    if let Ok(mut write) = is_initial_loading.write() {
                        *write = false;
                    }
                    let borrow = {
                        cover_sub.borrow().as_ref().copied()
                    };
                    if let Some(data) = borrow {
                        if data.id == id {
                            if let Some(attributes) = data.attributes {
                                yield attributes;
                            }
                        }
                    }
                } else if !should_end.read().map(|read| *read).unwrap_or(true) {
                    if let Ok(has_changed) = cover_sub.has_changed() {
                        if has_changed {
                            let borrow = {
                                cover_sub.borrow().as_ref().copied()
                            };
                            if let Some(data) = borrow {
                                if data.id == id {
                                    if let Some(attributes) = data.attributes {
                                        yield attributes;
                                    }
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
