use async_graphql::{Context, Result, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use crate::store::types::enums::{direction::Direction, reading_mode::ReadingMode};
use async_stream::stream;

use crate::subscription::{init_watch_subscription, sub_sleep};

#[derive(Debug, Clone, Copy)]
pub struct UserOptionSubscriptions;

#[Subscription]
impl UserOptionSubscriptions {
    pub async fn listen_to_page_direction<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = Direction> + 'ctx> {
        let (watches, should_end, unlisten, window) =
            init_watch_subscription::<tauri::Wry>(ctx, sub_id)?;
        let page_direction_sub = watches.page_direction.subscribe();
        Ok(stream! {
            loop {
                if !*should_end.read().await {
                    if let Ok(has_changed) = page_direction_sub.has_changed() {
                        if has_changed {
                            let borrow = {
                                *page_direction_sub.borrow()
                            };
                            yield borrow;
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
    pub async fn listen_to_sidebar_direction<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = Direction> + 'ctx> {
        let (watches, should_end, unlisten, window) =
            init_watch_subscription::<tauri::Wry>(ctx, sub_id)?;
        let sidebar_direction_sub = watches.sidebar_direction.subscribe();
        Ok(stream! {
            loop {
                if !*should_end.read().await {
                    if let Ok(has_changed) = sidebar_direction_sub.has_changed() {
                        if has_changed {
                            let borrow = {
                                *sidebar_direction_sub.borrow()
                            };
                            yield borrow;
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
    pub async fn listen_to_reading_mode<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = ReadingMode> + 'ctx> {
        let (watches, should_end, unlisten, window) =
            init_watch_subscription::<tauri::Wry>(ctx, sub_id)?;
        let reading_mode_sub = watches.reading_mode.subscribe();
        Ok(stream! {
            loop {
                if !*should_end.read().await {
                    if let Ok(has_changed) = reading_mode_sub.has_changed() {
                        if has_changed {
                            let borrow = {
                                *reading_mode_sub.borrow()
                            };
                            yield borrow;
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
