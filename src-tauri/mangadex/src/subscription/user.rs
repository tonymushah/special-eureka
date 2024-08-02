pub mod me;

use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use crate::objects::user::attributes::UserAttributes;
use async_stream::stream;

use super::{init_watch_subscription, sub_sleep};

#[derive(Debug, Clone, Copy)]
pub struct UserSubscriptions;

#[Subscription]
impl UserSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        user_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = UserAttributes> + 'ctx> {
        let (watches, should_end, unlisten, window, is_initial_loading) =
            init_watch_subscription::<tauri::Wry>(ctx, sub_id)?;
        let user_sub = watches.user.subscribe();
        Ok(stream! {
            loop {
                if is_initial_loading.read().map(|read| *read).unwrap_or(false) {
                    if let Ok(mut write) = is_initial_loading.write() {
                        *write = false;
                    }
                    let borrow = {
                        user_sub.borrow().as_ref().cloned()
                    };
                    if let Some(data) = borrow {
                        if data.id == user_id {
                            yield data.attributes.clone()
                        }
                    }
                } else if !should_end.read().map(|read| *read).unwrap_or(true) {
                    if let Ok(has_changed) = user_sub.has_changed() {
                        if has_changed {
                            let borrow = {
                                user_sub.borrow().as_ref().cloned()
                            };
                            if let Some(data) = borrow {
                                if data.id == user_id {
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
