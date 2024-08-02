use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use crate::objects::author::attributes::AuthorAttributes;
use async_stream::stream;

use super::{init_watch_subscription, sub_sleep};

#[derive(Debug, Clone, Copy)]
pub struct AuthorSubscriptions;

#[Subscription]
impl AuthorSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        author_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = AuthorAttributes> + 'ctx> {
        let (watches, should_end, unlisten, window, is_initial_loading) =
            init_watch_subscription::<tauri::Wry>(ctx, sub_id)?;
        let author_sub = watches.author.subscribe();
        Ok(stream! {
            loop {
                if is_initial_loading.read().map(|read| *read).unwrap_or(false) {
                    if let Ok(mut write) = is_initial_loading.write() {
                        *write = false;
                    }
                    let borrow = {
                        author_sub.borrow().as_ref().cloned()
                    };
                    if let Some(data) = borrow {
                        if data.id == author_id {
                            yield data.attributes.clone()
                        }
                    }
                }else if !should_end.read().map(|read| *read).unwrap_or(true) {
                    if let Ok(has_changed) = author_sub.has_changed() {
                        if has_changed {
                            let borrow = {
                                author_sub.borrow().as_ref().cloned()
                            };
                            if let Some(data) = borrow {
                                if data.id == author_id {
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
