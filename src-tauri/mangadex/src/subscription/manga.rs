use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use crate::objects::manga::attributes::GraphQLMangaAttributes as MangaAttributes;
use async_stream::stream;

use super::{init_watch_subscription, sub_sleep};

#[derive(Debug, Clone, Copy)]
pub struct MangaSubscriptions;

#[Subscription]
impl MangaSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = MangaAttributes> + 'ctx> {
        let (watches, should_end, unlisten, window, is_initial_loading) =
            init_watch_subscription::<tauri::Wry>(ctx, sub_id)?;
        let manga_sub = watches.manga.subscribe();
        Ok(stream! {
            loop {
                if is_initial_loading.read().map(|read| *read).unwrap_or(false) {
                    if let Ok(mut write) = is_initial_loading.write() {
                        *write = false;
                    }
                    let borrow = {
                        manga_sub.borrow().as_ref().cloned()
                    };
                    if let Some(data) = borrow {
                        if data.id == manga_id {
                            yield data.attributes.inner_data()
                        }
                    }
                } else if !should_end.read().map(|read| *read).unwrap_or(true) {
                    if let Ok(has_changed) = manga_sub.has_changed() {
                        if has_changed {
                            let borrow = {
                                manga_sub.borrow().as_ref().cloned()
                            };
                            if let Some(data) = borrow {
                                if data.id == manga_id {
                                    yield data.attributes.inner_data()
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
