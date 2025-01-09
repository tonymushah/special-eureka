use crate::objects::oauth::ClientInfo;
use crate::store::types::enums::chapter_feed_style::ChapterFeedStyle;
use crate::store::types::enums::pagination_style::PaginationStyle;
use crate::store::types::structs::theme::profiles::ThemeProfileEntry;
use crate::store::types::structs::theme::MangaDexTheme;
use crate::Result;
use async_graphql::{Context, Subscription};
use download_state::chapter::ChapterDownloadState;
use download_state::chapter::ChapterDownloadSubs;
use download_state::cover::{CoverDownloadState, CoverDownloadSubs};
use download_state::manga::{MangaDownloadState, MangaDownloadSubs};
use oauth::OauthSubscriptions;
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
pub mod oauth;
pub mod rating;
pub mod read_marker;
pub mod reading_state;
pub mod scanlation_group;
pub mod statistics;
pub mod tag;
pub mod upload;
pub mod user;
pub mod user_option;
pub mod utils;

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
    store::types::enums::{
        direction::Direction, image_fit::ImageFit, manga_list_style::MangaListStyle,
        reading_mode::ReadingMode,
    },
};

#[derive(Debug, Clone, Copy)]
pub struct Subscriptions;

#[Subscription]
impl Subscriptions {
    pub async fn watch_api_client<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        api_client_id: Uuid,
    ) -> Result<impl Stream<Item = ApiClientAttributes> + 'ctx> {
        ApiClientSubscriptions
            .listen_by_id(ctx, api_client_id)
            .await
    }
    pub async fn watch_author<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        author_id: Uuid,
    ) -> Result<impl Stream<Item = AuthorAttributes> + 'ctx> {
        AuthorSubscriptions.listen_by_id(ctx, author_id).await
    }
    pub async fn watch_chapter<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        chapter_id: Uuid,
    ) -> Result<impl Stream<Item = ChapterAttributes> + 'ctx> {
        ChapterSubscriptions.listen_by_id(ctx, chapter_id).await
    }
    pub async fn watch_cover<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        cover_id: Uuid,
    ) -> Result<impl Stream<Item = CoverAttributes> + 'ctx> {
        CoverSubscriptions.listen_by_id(ctx, cover_id).await
    }
    pub async fn watch_custom_list<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        custom_list_id: Uuid,
    ) -> Result<impl Stream<Item = CustomListAttributes> + 'ctx> {
        CustomListSubscriptions
            .listen_by_id(ctx, custom_list_id)
            .await
    }
    pub async fn watch_manga<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
    ) -> Result<impl Stream<Item = MangaAttributes> + 'ctx> {
        MangaSubscriptions.listen_by_id(ctx, manga_id).await
    }
    pub async fn watch_rating<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
    ) -> Result<impl Stream<Item = RatingItemAttributes> + 'ctx> {
        RatingSubscriptions.listen_by_id(ctx, manga_id).await
    }
    pub async fn watch_statistics<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        id: Uuid,
    ) -> Result<impl Stream<Item = StatisticsComments> + 'ctx> {
        StatisticsSubscriptions.listen_by_id(ctx, id).await
    }
    pub async fn watch_manga_statistics<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
    ) -> Result<impl Stream<Item = MangaStatisticsAttributes> + 'ctx> {
        MangaStatisticsSubscriptions
            .listen_by_id(ctx, manga_id)
            .await
    }
    pub async fn watch_tag<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        tag_id: Uuid,
    ) -> Result<impl Stream<Item = TagAttributes> + 'ctx> {
        TagSubscriptions.listen_by_id(ctx, tag_id).await
    }
    pub async fn watch_upload_session<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        upload_session_id: Uuid,
    ) -> Result<impl Stream<Item = UploadSessionAttributes> + 'ctx> {
        UploadSessionSubscriptions
            .listen_by_id(ctx, upload_session_id)
            .await
    }
    pub async fn watch_upload_session_file<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        upload_session_file_id: Uuid,
    ) -> Result<impl Stream<Item = UploadSessionFileAttributes> + 'ctx> {
        UploadSessionFileSubscriptions
            .listen_by_id(ctx, upload_session_file_id)
            .await
    }
    pub async fn watch_user<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        user_id: Uuid,
    ) -> Result<impl Stream<Item = UserAttributes> + 'ctx> {
        UserSubscriptions.listen_by_id(ctx, user_id).await
    }
    pub async fn watch_user_me<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = UserAttributes> + 'ctx> {
        UserMeSubscriptions.listen(ctx).await
    }
    pub async fn watch_sidebar_direction<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Direction> + 'ctx> {
        UserOptionSubscriptions
            .listen_to_sidebar_direction(ctx)
            .await
    }
    pub async fn watch_page_direction<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Direction> + 'ctx> {
        UserOptionSubscriptions.listen_to_page_direction(ctx).await
    }
    pub async fn watch_reading_mode<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = ReadingMode> + 'ctx> {
        UserOptionSubscriptions.listen_to_reading_mode(ctx).await
    }
    pub async fn watch_chapter_languages<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Vec<Language>> + 'ctx> {
        UserOptionSubscriptions
            .listen_to_chapter_languages(ctx)
            .await
    }
    pub async fn watch_is_app_mounted<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        IsAppStateMountedSubscriptions.listen(ctx).await
    }
    pub async fn watch_is_logged<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        IsLoggedSubscriptions.listen(ctx).await
    }
    pub async fn watch_download_state<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        object_id: Uuid,
    ) -> Result<impl Stream<Item = DownloadState> + 'ctx> {
        DownloadStateSubscriptions
            .listen_by_id(ctx, object_id)
            .await
    }
    pub async fn watch_reading_state<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        chapter_id: Uuid,
    ) -> Result<impl Stream<Item = ReadingState> + 'ctx> {
        ReadingStateSubscriptions
            .listen_by_id(ctx, chapter_id)
            .await
    }
    pub async fn watch_is_following_manga<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        IsFollowingSubscriptions
            .listen_by_manga_id(ctx, manga_id)
            .await
    }
    pub async fn watch_is_following_group<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        group_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        IsFollowingSubscriptions
            .listen_by_group_id(ctx, group_id)
            .await
    }
    pub async fn watch_is_following_user<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        user_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        IsFollowingSubscriptions
            .listen_by_user_id(ctx, user_id)
            .await
    }
    pub async fn watch_is_following_custom_list<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        custom_list_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        IsFollowingSubscriptions
            .listen_by_custom_list_id(ctx, custom_list_id)
            .await
    }
    pub async fn watch_manga_reading_state<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
    ) -> Result<impl Stream<Item = Option<ReadingStatus>> + 'ctx> {
        MangaReadingStatusSubscriptions
            .listen_by_id(ctx, manga_id)
            .await
    }
    pub async fn watch_read_marker<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        chapter_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        ChapterReadMarkerSubscriptions
            .listen_by_id(ctx, chapter_id)
            .await
    }
    pub async fn watch_image_fit<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = ImageFit> + 'ctx> {
        UserOptionSubscriptions.listen_to_image_fit(ctx).await
    }
    pub async fn watch_longstrip_image_width<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = f64> + 'ctx> {
        UserOptionSubscriptions
            .listen_to_longstrip_image_width(ctx)
            .await
    }
    pub async fn watch_manga_list_style<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = MangaListStyle> + 'ctx> {
        UserOptionSubscriptions
            .listen_to_manga_list_style(ctx)
            .await
    }
    pub async fn watch_themes_profile<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Vec<ThemeProfileEntry>> + 'ctx> {
        UserOptionSubscriptions.listen_to_theme_profiles(ctx).await
    }
    pub async fn watch_theme_profile_default<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = MangaDexTheme> + 'ctx> {
        UserOptionSubscriptions
            .listen_to_theme_profile_default(ctx)
            .await
    }
    pub async fn watch_theme_profile_default_name<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Option<String>> + 'ctx> {
        UserOptionSubscriptions
            .listen_to_theme_profile_default_name(ctx)
            .await
    }
    pub async fn watch_client_info<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Option<ClientInfo>> + 'ctx> {
        OauthSubscriptions.listen(ctx).await
    }
    pub async fn watch_chapter_feed_style<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = ChapterFeedStyle> + 'ctx> {
        UserOptionSubscriptions
            .listen_to_chapter_feed_style(ctx)
            .await
    }
    pub async fn watch_pagination_style<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = PaginationStyle> + 'ctx> {
        UserOptionSubscriptions
            .listen_to_pagination_style(ctx)
            .await
    }
    pub async fn watch_chapter_download_state<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,

        chapter_id: Uuid,
    ) -> Result<impl Stream<Item = ChapterDownloadState> + 'ctx> {
        ChapterDownloadSubs
            .listen_to_download_state(ctx, chapter_id)
            .await
    }
    pub async fn watch_chapters_tasks_list<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Vec<Uuid>> + 'ctx> {
        ChapterDownloadSubs.listen_to_chapter_tasks(ctx).await
    }
    pub async fn watch_cover_download_state<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,

        cover_id: Uuid,
    ) -> Result<impl Stream<Item = CoverDownloadState> + 'ctx> {
        CoverDownloadSubs
            .listen_to_download_state(ctx, cover_id)
            .await
    }
    pub async fn watch_cover_tasks_list<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Vec<Uuid>> + 'ctx> {
        CoverDownloadSubs.listen_to_cover_tasks(ctx).await
    }
    pub async fn watch_manga_download_state<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,

        manga_id: Uuid,
    ) -> Result<impl Stream<Item = MangaDownloadState> + 'ctx> {
        MangaDownloadSubs
            .listen_to_download_state(ctx, manga_id)
            .await
    }
    pub async fn watch_manga_tasks_list<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Vec<Uuid>> + 'ctx> {
        MangaDownloadSubs.listen_to_manga_tasks(ctx).await
    }
}
