use std::sync::Arc;
use std::sync::RwLock;

use crate::Result;
use async_graphql::{Context, Subscription};
use tauri::{EventHandler, Window, WindowEvent};
use tokio::time::{sleep, Duration};
use tokio_stream::Stream;
use uuid::Uuid;

pub mod api_client;
pub mod author;
pub mod chapter;
pub mod cover;
pub mod custom_list;
pub mod download_state;
pub mod is_appstate_mounted;
pub mod is_following;
pub mod is_logged;
pub mod manga;
pub mod manga_reading_state;
pub mod rating;
pub mod read_marker;
pub mod reading_state;
pub mod scanlation_group;
pub mod statistics;
pub mod tag;
pub mod upload;
pub mod user;
pub mod user_option;

use mangadex_api_types_rust::Language;
use mangadex_api_types_rust::ReadingStatus;

use self::{
    api_client::ApiClientSubscriptions,
    author::AuthorSubscriptions,
    chapter::ChapterSubscriptions,
    cover::CoverSubscriptions,
    custom_list::CustomListSubscriptions,
    download_state::DownloadStateSubscriptions,
    is_appstate_mounted::IsAppStateMountedSubscriptions,
    is_following::IsFollowingSubscriptions,
    is_logged::IsLoggedSubscriptions,
    manga::MangaSubscriptions,
    manga_reading_state::MangaReadingStatusSubscriptions,
    rating::RatingSubscriptions,
    read_marker::ChapterReadMarkerSubscriptions,
    reading_state::ReadingStateSubscriptions,
    statistics::{manga::MangaStatisticsSubscriptions, StatisticsSubscriptions},
    tag::TagSubscriptions,
    upload::{session::UploadSessionSubscriptions, session_file::UploadSessionFileSubscriptions},
    user::{me::UserMeSubscriptions, UserSubscriptions},
    user_option::UserOptionSubscriptions,
};
use crate::utils::download_state::DownloadState;
use crate::utils::watch::reading_state::data::ReadingState;
use crate::{
    objects::{
        api_client::attributes::ApiClientAttributes,
        author::attributes::AuthorAttributes,
        chapter::attributes::ChapterAttributes,
        cover::attributes::CoverAttributes,
        custom_list::attributes::CustomListAttributes,
        manga::attributes::GraphQLMangaAttributes as MangaAttributes,
        rating::RatingItemAttributes,
        statistics::{manga::MangaStatisticsAttributes, StatisticsComments},
        tag::attributes::TagAttributes,
        upload::{
            session::attributes::UploadSessionAttributes,
            session_file::attributes::UploadSessionFileAttributes,
        },
        user::attributes::UserAttributes,
    },
    store::types::enums::{direction::Direction, image_fit::ImageFit, reading_mode::ReadingMode},
    utils::{get_watches_from_graphql_context, get_window_from_async_graphql, watch::Watches},
};

#[derive(Debug, Clone, Copy)]
pub struct Subscriptions;

#[Subscription]
impl Subscriptions {
    pub async fn watch_api_client<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        api_client_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = ApiClientAttributes> + 'ctx> {
        ApiClientSubscriptions
            .listen_by_id(ctx, api_client_id, sub_id)
            .await
    }
    pub async fn watch_author<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        author_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = AuthorAttributes> + 'ctx> {
        AuthorSubscriptions
            .listen_by_id(ctx, author_id, sub_id)
            .await
    }
    pub async fn watch_chapter<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        chapter_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = ChapterAttributes> + 'ctx> {
        ChapterSubscriptions
            .listen_by_id(ctx, chapter_id, sub_id)
            .await
    }
    pub async fn watch_cover<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        cover_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = CoverAttributes> + 'ctx> {
        CoverSubscriptions.listen_by_id(ctx, cover_id, sub_id).await
    }
    pub async fn watch_custom_list<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        custom_list_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = CustomListAttributes> + 'ctx> {
        CustomListSubscriptions
            .listen_by_id(ctx, custom_list_id, sub_id)
            .await
    }
    pub async fn watch_manga<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = MangaAttributes> + 'ctx> {
        MangaSubscriptions.listen_by_id(ctx, manga_id, sub_id).await
    }
    pub async fn watch_rating<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = RatingItemAttributes> + 'ctx> {
        RatingSubscriptions
            .listen_by_id(ctx, manga_id, sub_id)
            .await
    }
    pub async fn watch_statistics<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = StatisticsComments> + 'ctx> {
        StatisticsSubscriptions.listen_by_id(ctx, id, sub_id).await
    }
    pub async fn watch_manga_statistics<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = MangaStatisticsAttributes> + 'ctx> {
        MangaStatisticsSubscriptions
            .listen_by_id(ctx, manga_id, sub_id)
            .await
    }
    pub async fn watch_tag<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        tag_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = TagAttributes> + 'ctx> {
        TagSubscriptions.listen_by_id(ctx, tag_id, sub_id).await
    }
    pub async fn watch_upload_session<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        upload_session_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = UploadSessionAttributes> + 'ctx> {
        UploadSessionSubscriptions
            .listen_by_id(ctx, upload_session_id, sub_id)
            .await
    }
    pub async fn watch_upload_session_file<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        upload_session_file_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = UploadSessionFileAttributes> + 'ctx> {
        UploadSessionFileSubscriptions
            .listen_by_id(ctx, upload_session_file_id, sub_id)
            .await
    }
    pub async fn watch_user<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        user_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = UserAttributes> + 'ctx> {
        UserSubscriptions.listen_by_id(ctx, user_id, sub_id).await
    }
    pub async fn watch_user_me<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = UserAttributes> + 'ctx> {
        UserMeSubscriptions.listen(ctx, sub_id).await
    }
    pub async fn watch_sidebar_direction<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = Direction> + 'ctx> {
        UserOptionSubscriptions
            .listen_to_sidebar_direction(ctx, sub_id)
            .await
    }
    pub async fn watch_page_direction<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = Direction> + 'ctx> {
        UserOptionSubscriptions
            .listen_to_page_direction(ctx, sub_id)
            .await
    }
    pub async fn watch_reading_mode<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = ReadingMode> + 'ctx> {
        UserOptionSubscriptions
            .listen_to_reading_mode(ctx, sub_id)
            .await
    }
    pub async fn watch_chapter_languages<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = Vec<Language>> + 'ctx> {
        UserOptionSubscriptions
            .listen_to_chapter_languages(ctx, sub_id)
            .await
    }
    pub async fn watch_is_app_mounted<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        IsAppStateMountedSubscriptions.listen(ctx, sub_id).await
    }
    pub async fn watch_is_logged<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        IsLoggedSubscriptions.listen(ctx, sub_id).await
    }
    pub async fn watch_download_state<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        object_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = DownloadState> + 'ctx> {
        DownloadStateSubscriptions
            .listen_by_id(ctx, object_id, sub_id)
            .await
    }
    pub async fn watch_reading_state<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        chapter_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = ReadingState> + 'ctx> {
        ReadingStateSubscriptions
            .listen_by_id(ctx, chapter_id, sub_id)
            .await
    }
    pub async fn watch_is_following_manga<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        IsFollowingSubscriptions
            .listen_by_manga_id(ctx, manga_id, sub_id)
            .await
    }
    pub async fn watch_is_following_group<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        group_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        IsFollowingSubscriptions
            .listen_by_group_id(ctx, group_id, sub_id)
            .await
    }
    pub async fn watch_is_following_user<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        user_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        IsFollowingSubscriptions
            .listen_by_user_id(ctx, user_id, sub_id)
            .await
    }
    pub async fn watch_is_following_custom_list<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        custom_list_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        IsFollowingSubscriptions
            .listen_by_custom_list_id(ctx, custom_list_id, sub_id)
            .await
    }
    pub async fn watch_manga_reading_state<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = Option<ReadingStatus>> + 'ctx> {
        MangaReadingStatusSubscriptions
            .listen_by_id(ctx, manga_id, sub_id)
            .await
    }
    pub async fn watch_read_marker<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        chapter_id: Uuid,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        ChapterReadMarkerSubscriptions
            .listen_by_id(ctx, chapter_id, sub_id)
            .await
    }
    pub async fn watch_image_fit<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = ImageFit> + 'ctx> {
        UserOptionSubscriptions
            .listen_to_image_fit(ctx, sub_id)
            .await
    }
    pub async fn watch_longstrip_image_width<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        sub_id: Uuid,
    ) -> Result<impl Stream<Item = f64> + 'ctx> {
        UserOptionSubscriptions
            .listen_to_longstrip_image_width(ctx, sub_id)
            .await
    }
}

type InitWatchSubRes<'ctx, R> = Result<(
    tauri::State<'ctx, Watches>,
    Arc<RwLock<bool>>,
    EventHandler,
    &'ctx Window<R>,
    Arc<RwLock<bool>>,
)>;

pub fn init_watch_subscription<'ctx, R: tauri::Runtime>(
    ctx: &'ctx Context<'ctx>,
    sub_id: Uuid,
) -> InitWatchSubRes<'ctx, R> {
    let should_end = Arc::new(RwLock::new(false));
    let should_end_un = should_end.clone();
    let should_end_un_n = should_end.clone();
    let watches = get_watches_from_graphql_context::<R>(ctx)?;
    let window = get_window_from_async_graphql::<R>(ctx)?;
    window.on_window_event(move |e| {
        let should_end_un_n = should_end_un_n.clone();
        if let WindowEvent::Destroyed = e {
            if let Ok(mut write) = should_end_un_n.write() {
                *write = true;
            };
        }
    });
    let unlisten = window.listen("sub_end", move |e| {
        /*#[cfg(debug_assertions)]
        println!("{:#?}", e);*/
        let should_end_un = should_end_un.clone();
        if let Some(id) = e
            .payload()
            .map(|p| p.trim().replace('\"', ""))
            .and_then(|payload| {
                Uuid::parse_str(&payload)
                    /*
                        .map_err(|er| {
                            #[cfg(debug_assertions)]
                            eprintln!("{:#?}", er);
                            er
                        })
                    */
                    .ok()
            })
        {
            if let Ok(mut write) = should_end_un.write() {
                *write = id == sub_id;
            };
        }
    });
    Ok((
        watches,
        should_end,
        unlisten,
        window,
        Arc::new(RwLock::new(true)),
    ))
}

pub async fn sub_sleep() {
    sleep(Duration::from_millis(100)).await
}
