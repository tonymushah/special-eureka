use async_graphql::{Context, Result, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use crate::objects::custom_list::attributes::CustomListAttributes;
use async_stream::stream;

use super::{init_watch_subscription, sub_sleep};

#[derive(Debug, Clone, Copy)]
pub struct CustomListSubscriptions;

#[Subscription]
impl CustomListSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        custom_list_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = CustomListAttributes> + 'ctx> {
        let (watches, should_end, unlisten, window, is_initial_loading) =
            init_watch_subscription::<tauri::Wry>(ctx, sub_id)?;
        let custom_list_sub = watches.custom_list.subscribe();
        Ok(stream! {
            loop {
                if *is_initial_loading.read().await {
                    let mut write = is_initial_loading.write().await;
                    *write = false;
                    let borrow = {
                        custom_list_sub.borrow().as_ref().cloned()
                    };
                    if let Some(data) = borrow {
                        if data.id == custom_list_id {
                            yield data.attributes.clone();
                        }
                    }
                } else if !*should_end.read().await {
                    if let Ok(has_changed) = custom_list_sub.has_changed() {
                        if has_changed {
                            let borrow = {
                                custom_list_sub.borrow().as_ref().cloned()
                            };
                            if let Some(data) = borrow {
                                if data.id == custom_list_id {
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
