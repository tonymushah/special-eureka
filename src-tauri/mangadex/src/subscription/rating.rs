use std::sync::Arc;

use async_graphql::{Context, Result, Subscription};
use tauri::WindowEvent;
use tokio::{
    sync::RwLock,
    time::{sleep, Duration},
};
use tokio_stream::Stream;
use uuid::Uuid;

use crate::{
    objects::rating::RatingItemAttributes,
    utils::{get_watches_from_graphql_context, get_window_from_async_graphql},
};
use async_stream::stream;

#[derive(Debug, Clone, Copy)]
pub struct RatingSubscriptions;

#[Subscription]
impl RatingSubscriptions {
    pub async fn listen_by_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = RatingItemAttributes> + 'ctx> {
        let should_end = Arc::new(RwLock::new(false));
        let should_end_un = should_end.clone();
        let should_end_un_n = should_end.clone();
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let window = get_window_from_async_graphql::<tauri::Wry>(ctx)?;
        window.on_window_event(move |e| {
            if let WindowEvent::Destroyed = e {
                let mut write = should_end_un_n.blocking_write();
                *write = true;
            }
        });
        let unlisten = window.listen("sub_end", move |e| {
            if let Some(payload) = e.payload() {
                let mut write = should_end_un.blocking_write();
                if let Ok(id) = Uuid::parse_str(payload) {
                    *write = id == sub_id;
                }
            }
        });
        let rating_sub = watches.rating.subscribe();
        Ok(stream! {
            loop {
                if !*should_end.read().await {
                    if let Ok(has_changed) = rating_sub.has_changed() {
                        if has_changed {
                            let borrow = {
                                rating_sub.borrow().as_ref().copied()
                            };
                            if let Some(data) = borrow {
                                if data.id == manga_id {
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
                sleep(Duration::from_secs(1)).await;
            }
            window.unlisten(unlisten);
        })
    }
}
