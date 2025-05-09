use std::num::NonZero;

use crate::{
    store::types::{
        enums::{
            chapter_feed_style::ChapterFeedStyle, chapter_quality::DownloadMode,
            image_fit::ImageFit, pagination_style::PaginationStyle,
        },
        structs::{
            content::{profiles::ContentProfileEntry, ContentProfile},
            page_limit::PAGE_LIMIT_DEFAULT,
            theme::{profiles::ThemeProfileEntry, MangaDexTheme},
        },
    },
    utils::{
        get_watches_from_graphql_context,
        watch::{chapter_quality::ChapterQualityWatch, page_limit::PageLimitWatch},
    },
    Result,
};
use async_graphql::{Context, Subscription};
use async_stream::stream;
use mangadex_api_types_rust::Language;
use tokio::select;
use tokio_stream::{Stream, StreamExt};

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
    ) -> Result<impl Stream<Item = Direction> + 'ctx> {
        WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
            w.page_direction.subscribe()
        })
    }
    pub async fn listen_to_sidebar_direction<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Direction> + 'ctx> {
        WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
            w.sidebar_direction.subscribe()
        })
    }
    pub async fn listen_to_reading_mode<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = ReadingMode> + 'ctx> {
        WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
            w.reading_mode.subscribe()
        })
    }
    pub async fn listen_to_chapter_languages<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Vec<Language>> + 'ctx> {
        WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
            w.chapter_languages.subscribe()
        })
    }
    pub async fn listen_to_image_fit<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = ImageFit> + 'ctx> {
        WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
            w.image_fit.subscribe()
        })
    }
    pub async fn listen_to_longstrip_image_width<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = f64> + 'ctx> {
        WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
            w.longstrip_image_width.subscribe()
        })
    }
    pub async fn listen_to_theme_profiles<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Vec<ThemeProfileEntry>> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
                w.themes.subscribe()
            })?
            .map(|w| w.get_entries()),
        )
    }
    pub async fn listen_to_theme_profile_default_name<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Option<String>> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
                w.theme_default_key.subscribe()
            })?
            .map(|e| e.into_inner()),
        )
    }
    pub async fn listen_to_theme_profile_default<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = MangaDexTheme> + 'ctx> {
        let (themes_recv, default_name_recv) = {
            let watch = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
            (
                watch.themes.subscribe(),
                watch.theme_default_key.subscribe(),
            )
        };
        let mut themes_stream = WatchSubscriptionStream::<_>::from_async_graphql_context::<
            _,
            tauri::Wry,
        >(ctx, |w| w.themes.subscribe())?;
        let mut default_name_stream =
            Box::pin(self.listen_to_theme_profile_default_name(ctx).await?);
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
    ) -> Result<impl Stream<Item = MangaListStyle> + 'ctx> {
        WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
            w.manga_list_style.subscribe()
        })
    }
    pub async fn listen_to_chapter_feed_style<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = ChapterFeedStyle> + 'ctx> {
        WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
            w.chapter_feed_style.subscribe()
        })
    }
    pub async fn listen_to_pagination_style<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = PaginationStyle> + 'ctx> {
        WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
            w.pagination_style.subscribe()
        })
    }
    pub async fn listen_to_content_profiles<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Vec<ContentProfileEntry>> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
                w.content_profiles.subscribe()
            })?
            .map(|w| w.get_entries()),
        )
    }
    pub async fn listen_to_content_profile_default_name<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Option<String>> + 'ctx> {
        Ok(
            WatchSubscriptionStream::<_>::from_async_graphql_context::<_, tauri::Wry>(ctx, |w| {
                w.content_profiles_default_key.subscribe()
            })?
            .map(|e| e.into_inner()),
        )
    }
    pub async fn listen_to_content_profile_default<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = ContentProfile> + 'ctx> {
        let (content_profike_recv, default_name_recv) = {
            let watch = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
            (
                watch.content_profiles.subscribe(),
                watch.content_profiles_default_key.subscribe(),
            )
        };
        let mut themes_stream = WatchSubscriptionStream::<_>::from_async_graphql_context::<
            _,
            tauri::Wry,
        >(ctx, |w| w.content_profiles.subscribe())?;
        let mut default_name_stream =
            Box::pin(self.listen_to_content_profile_default_name(ctx).await?);
        Ok(stream! {
            loop {
                select! {
                    Some(m_key) = default_name_stream.next() => {
                        if let Some(key) = m_key {
                            let theme = {
                                content_profike_recv.borrow().get(&key).cloned()
                            };
                            yield theme.unwrap_or_default();
                        } else {
                            yield ContentProfile::default();
                        }
                    }
                    Some(themes) = themes_stream.next() => {
                        let m_key = {
                            (*default_name_recv.borrow()).clone()
                        };
                        if let Some(key) = m_key.into_inner() {
                            yield themes.get(&key).cloned().unwrap_or_default();
                        } else {
                            yield ContentProfile::default();
                        }
                    }
                    else => {
                        break;
                    }
                }
            }
        })
    }
    pub async fn listen_to_chapter_quality<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = DownloadMode> + 'ctx> {
        WatchSubscriptionStream::from_async_graphql_context_watch_as_ref::<
            ChapterQualityWatch,
            tauri::Wry,
        >(ctx)
    }
    pub async fn listen_to_page_limit<'ctx>(
        &self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = NonZero<u64>>> {
        let default_limit = NonZero::new(PAGE_LIMIT_DEFAULT).unwrap();
        let stream = WatchSubscriptionStream::<Option<NonZero<u64>>>::from_async_graphql_context_watch_as_ref::<PageLimitWatch, tauri::Wry>(ctx)?;
        Ok(stream.map(move |item| {
            if let Some(inner) = item {
                inner
            } else {
                default_limit
            }
        }))
    }
}
