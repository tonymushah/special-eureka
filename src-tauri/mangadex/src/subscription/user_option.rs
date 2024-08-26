use crate::{store::types::enums::image_fit::ImageFit, Result};
use async_graphql::{Context, Subscription};
use mangadex_api_types_rust::Language;
use tokio_stream::Stream;
use uuid::Uuid;

use crate::store::types::enums::{direction::Direction, reading_mode::ReadingMode};

use super::utils::WatchSubscriptionStream;

#[derive(Debug, Clone, Copy)]
pub struct UserOptionSubscriptions;

#[Subscription]
impl UserOptionSubscriptions {
    pub async fn listen_to_page_direction<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = Direction> + 'ctx> {
        WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(ctx, sub_id, |w| {
            w.page_direction.subscribe()
        })
    }
    pub async fn listen_to_sidebar_direction<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = Direction> + 'ctx> {
        WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(ctx, sub_id, |w| {
            w.sidebar_direction.subscribe()
        })
    }
    pub async fn listen_to_reading_mode<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = ReadingMode> + 'ctx> {
        WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(ctx, sub_id, |w| {
            w.reading_mode.subscribe()
        })
    }
    pub async fn listen_to_chapter_languages<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = Vec<Language>> + 'ctx> {
        WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(ctx, sub_id, |w| {
            w.chapter_languages.subscribe()
        })
    }
    pub async fn listen_to_image_fit<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = ImageFit> + 'ctx> {
        WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(ctx, sub_id, |w| {
            w.image_fit.subscribe()
        })
    }
    pub async fn listen_to_longstrip_image_width<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = f64> + 'ctx> {
        WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(ctx, sub_id, |w| {
            w.longstrip_image_width.subscribe()
        })
    }
}
