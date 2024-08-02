use crate::Result;
use async_graphql::{Context, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use mangadex_api_types_rust::RelationshipType;

use async_stream::stream;

use super::{init_watch_subscription, sub_sleep};

#[derive(Debug, Clone, Copy)]
pub struct IsFollowingSubscriptions;

#[Subscription]
impl IsFollowingSubscriptions {
    pub async fn listen_by_manga_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        let (watches, should_end, unlisten, window, is_initial_loading) =
            init_watch_subscription::<tauri::Wry>(ctx, sub_id)?;
        let is_following_sub = watches.is_following.subscribe();
        Ok(stream! {
            loop {
                if is_initial_loading.read().map(|read| *read).unwrap_or(false) {
                    if let Ok(mut write) = is_initial_loading.write() {
                        *write = false;
                    }
                    let borrow = {
                        is_following_sub.borrow().as_ref().copied()
                    };
                    if let Some(data) = borrow {
                        if data.attributes.type_ == RelationshipType::Manga && data.id == manga_id {
                            yield data.attributes.data
                        }
                    }
                } else if !should_end.read().map(|read| *read).unwrap_or(true) {
                    if let Ok(has_changed) = is_following_sub.has_changed() {
                        if has_changed {
                            let borrow = {
                                is_following_sub.borrow().as_ref().copied()
                            };
                            if let Some(data) = borrow {
                                if data.attributes.type_ == RelationshipType::Manga && data.id == manga_id {
                                    yield data.attributes.data
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
    pub async fn listen_by_group_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        group_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        let (watches, should_end, unlisten, window, is_initial_loading) =
            init_watch_subscription::<tauri::Wry>(ctx, sub_id)?;
        let is_following_sub = watches.is_following.subscribe();
        Ok(stream! {
            loop {
                if is_initial_loading.read().map(|read| *read).unwrap_or(false) {
                    if let Ok(mut write) = is_initial_loading.write() {
                        *write = false;
                    }
                    let borrow = {
                        is_following_sub.borrow().as_ref().copied()
                    };
                    if let Some(data) = borrow {
                        if data.attributes.type_ == RelationshipType::ScanlationGroup && data.id == group_id {
                            yield data.attributes.data
                        }
                    }
                } else if !should_end.read().map(|read| *read).unwrap_or(true) {
                    if let Ok(has_changed) = is_following_sub.has_changed() {
                        if has_changed {
                            let borrow = {
                                is_following_sub.borrow().as_ref().copied()
                            };
                            if let Some(data) = borrow {
                                if data.attributes.type_ == RelationshipType::ScanlationGroup && data.id == group_id {
                                    yield data.attributes.data
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
    pub async fn listen_by_user_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        user_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        let (watches, should_end, unlisten, window, is_initial_loading) =
            init_watch_subscription::<tauri::Wry>(ctx, sub_id)?;
        let is_following_sub = watches.is_following.subscribe();
        Ok(stream! {
            loop {
                if is_initial_loading.read().map(|read| *read).unwrap_or(false) {
                    if let Ok(mut write) = is_initial_loading.write() {
                        *write = false;
                    }
                    let borrow = {
                        is_following_sub.borrow().as_ref().copied()
                    };
                    if let Some(data) = borrow {
                        if data.attributes.type_ == RelationshipType::User && data.id == user_id {
                            yield data.attributes.data
                        }
                    }
                } else if !should_end.read().map(|read| *read).unwrap_or(true) {
                    if let Ok(has_changed) = is_following_sub.has_changed() {
                        if has_changed {
                            let borrow = {
                                is_following_sub.borrow().as_ref().copied()
                            };
                            if let Some(data) = borrow {
                                if data.attributes.type_ == RelationshipType::User && data.id == user_id {
                                    yield data.attributes.data
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
    pub async fn listen_by_custom_list_id<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        custom_list_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        let (watches, should_end, unlisten, window, is_initial_loading) =
            init_watch_subscription::<tauri::Wry>(ctx, sub_id)?;
        let is_following_sub = watches.is_following.subscribe();
        Ok(stream! {
            loop {
                if is_initial_loading.read().map(|read| *read).unwrap_or(false) {
                    if let Ok(mut write) = is_initial_loading.write() {
                        *write = false;
                    }
                    let borrow = {
                        is_following_sub.borrow().as_ref().copied()
                    };
                    if let Some(data) = borrow {
                        if data.attributes.type_ == RelationshipType::CustomList && data.id == custom_list_id {
                            yield data.attributes.data
                        }
                    }
                } else if !should_end.read().map(|read| *read).unwrap_or(true) {
                    if let Ok(has_changed) = is_following_sub.has_changed() {
                        if has_changed {
                            let borrow = {
                                is_following_sub.borrow().as_ref().copied()
                            };
                            if let Some(data) = borrow {
                                if data.attributes.type_ == RelationshipType::CustomList && data.id == custom_list_id {
                                    yield data.attributes.data
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
