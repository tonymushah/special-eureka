use crate::{
    store::types::{
        enums::image_fit::ImageFit,
        structs::theme::{profiles::ThemeProfileEntry, MangaDexTheme},
    },
    utils::get_watches_from_graphql_context,
    Result,
};
use async_graphql::{Context, Subscription};
use async_stream::stream;
use mangadex_api_types_rust::Language;
use tokio::select;
use tokio_stream::{Stream, StreamExt};
use uuid::Uuid;

use crate::store::types::enums::{
    direction::Direction, manga_list_style::MangaListStyle, reading_mode::ReadingMode,
};

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
    pub async fn listen_to_theme_profiles<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = Vec<ThemeProfileEntry>> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(
                ctx,
                sub_id,
                |w| w.themes.subscribe(),
            )?
            .map(|w| w.get_entries()),
        )
    }
    pub async fn listen_to_theme_profile_default_name<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = Option<String>> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(
                ctx,
                sub_id,
                |w| w.theme_default_key.subscribe(),
            )?
            .map(|e| e.into_inner()),
        )
    }
    pub async fn listen_to_theme_profile_default<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = MangaDexTheme> + 'ctx> {
        let (themes_recv, default_name_recv) = {
            let watch = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
            (
                watch.themes.subscribe(),
                watch.theme_default_key.subscribe(),
            )
        };
        let mut themes_stream =
            WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(
                ctx,
                sub_id,
                |w| w.themes.subscribe(),
            )?;
        let mut default_name_stream = Box::pin(
            self.listen_to_theme_profile_default_name(ctx, sub_id)
                .await?,
        );
        Ok(stream! {
            loop {
                select! {
                    Some(m_key) = default_name_stream.next() => {
                        if let Some(key) = m_key {
                            let theme = {
                                themes_recv.borrow().get(&key).cloned()
                            };
                            yield theme.unwrap_or_default();
                        } else {
                            yield MangaDexTheme::default();
                        }
                    }
                    Some(themes) = themes_stream.next() => {
                        let m_key = {
                            (*default_name_recv.borrow()).clone()
                        };
                        if let Some(key) = m_key.into_inner() {
                            yield themes.get(&key).cloned().unwrap_or_default();
                        } else {
                            yield MangaDexTheme::default();
                        }
                    }
                    else => {
                        break;
                    }
                }
            }
        })
    }
    pub async fn listen_to_manga_list_style<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = MangaListStyle> + 'ctx> {
        WatchSubscriptionStream::<tauri::Wry, _>::from_async_graphql_context(ctx, sub_id, |w| {
            w.manga_list_style.subscribe()
        })
    }
}
