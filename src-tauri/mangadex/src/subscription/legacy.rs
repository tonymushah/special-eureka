use std::num::NonZero;

use super::download_state::chapter::ChapterDownloadState;
use super::download_state::chapter::ChapterDownloadSubs;
use super::download_state::cover::{CoverDownloadState, CoverDownloadSubs};
use super::download_state::manga::{MangaDownloadState, MangaDownloadSubs};
use super::oauth::OauthSubscriptions;
use crate::error::wrapped::Result;
use crate::objects::oauth::ClientInfo;
use crate::store::types::enums::chapter_feed_style::ChapterFeedStyle;
use crate::store::types::enums::chapter_quality::DownloadMode;
use crate::store::types::enums::pagination_style::PaginationStyle;
use crate::store::types::structs::content::ContentProfile;
use crate::store::types::structs::content::profiles::ContentProfileEntry;
use crate::store::types::structs::theme::MangaDexTheme;
use crate::store::types::structs::theme::profiles::ThemeProfileEntry;
use async_graphql::{Context, Subscription};
use tokio_stream::Stream;
use uuid::Uuid;

use mangadex_api_types_rust::ReadingStatus;

use super::{
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
    reading_state::ReadingStateSubscriptions,
    statistics::{StatisticsSubscriptions, manga::MangaStatisticsSubscriptions},
    tag::TagSubscriptions,
    upload::{session::UploadSessionSubscriptions, session_file::UploadSessionFileSubscriptions},
    user::{UserSubscriptions, me::UserMeSubscriptions},
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
        statistics::{StatisticsComments, manga::MangaStatisticsAttributes},
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

#[derive(Debug, Clone, Copy, Default)]
pub struct LegacySubscriptions;

#[Subscription]
#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl LegacySubscriptions {
    pub async fn watch_api_client<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        api_client_id: Uuid,
    ) -> Result<impl Stream<Item = ApiClientAttributes> + 'ctx> {
        Ok(ApiClientSubscriptions
            .listen_by_id(ctx, api_client_id)
            .await?)
    }
    pub async fn watch_author<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        author_id: Uuid,
    ) -> Result<impl Stream<Item = AuthorAttributes> + 'ctx> {
        Ok(AuthorSubscriptions.listen_by_id(ctx, author_id).await?)
    }
    pub async fn watch_chapter<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        chapter_id: Uuid,
    ) -> Result<impl Stream<Item = ChapterAttributes> + 'ctx> {
        Ok(ChapterSubscriptions.listen_by_id(ctx, chapter_id).await?)
    }
    pub async fn watch_cover<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        cover_id: Uuid,
    ) -> Result<impl Stream<Item = CoverAttributes> + 'ctx> {
        Ok(CoverSubscriptions.listen_by_id(ctx, cover_id).await?)
    }
    pub async fn watch_custom_list<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        custom_list_id: Uuid,
    ) -> Result<impl Stream<Item = CustomListAttributes> + 'ctx> {
        Ok(CustomListSubscriptions
            .listen_by_id(ctx, custom_list_id)
            .await?)
    }
    pub async fn watch_manga<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
    ) -> Result<impl Stream<Item = MangaAttributes> + 'ctx> {
        Ok(MangaSubscriptions.listen_by_id(ctx, manga_id).await?)
    }
    pub async fn watch_rating<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
    ) -> Result<impl Stream<Item = RatingItemAttributes> + 'ctx> {
        Ok(RatingSubscriptions.listen_by_id(ctx, manga_id).await?)
    }
    pub async fn watch_statistics<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        id: Uuid,
    ) -> Result<impl Stream<Item = StatisticsComments> + 'ctx> {
        Ok(StatisticsSubscriptions.listen_by_id(ctx, id).await?)
    }
    pub async fn watch_manga_statistics<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
    ) -> Result<impl Stream<Item = MangaStatisticsAttributes> + 'ctx> {
        Ok(MangaStatisticsSubscriptions
            .listen_by_id(ctx, manga_id)
            .await?)
    }
    pub async fn watch_tag<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        tag_id: Uuid,
    ) -> Result<impl Stream<Item = TagAttributes> + 'ctx> {
        Ok(TagSubscriptions.listen_by_id(ctx, tag_id).await?)
    }
    pub async fn watch_upload_session<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        upload_session_id: Uuid,
    ) -> Result<impl Stream<Item = UploadSessionAttributes> + 'ctx> {
        Ok(UploadSessionSubscriptions
            .listen_by_id(ctx, upload_session_id)
            .await?)
    }
    pub async fn watch_upload_session_file<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        upload_session_file_id: Uuid,
    ) -> Result<impl Stream<Item = UploadSessionFileAttributes> + 'ctx> {
        Ok(UploadSessionFileSubscriptions
            .listen_by_id(ctx, upload_session_file_id)
            .await?)
    }
    pub async fn watch_user<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        user_id: Uuid,
    ) -> Result<impl Stream<Item = UserAttributes> + 'ctx> {
        Ok(UserSubscriptions.listen_by_id(ctx, user_id).await?)
    }
    pub async fn watch_user_me<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = UserAttributes> + 'ctx> {
        Ok(UserMeSubscriptions.listen(ctx).await?)
    }
    pub async fn watch_sidebar_direction<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Direction> + 'ctx> {
        Ok(UserOptionSubscriptions
            .listen_to_sidebar_direction(ctx)
            .await?)
    }
    pub async fn watch_page_direction<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Direction> + 'ctx> {
        Ok(UserOptionSubscriptions
            .listen_to_page_direction(ctx)
            .await?)
    }
    pub async fn watch_reading_mode<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = ReadingMode> + 'ctx> {
        Ok(UserOptionSubscriptions.listen_to_reading_mode(ctx).await?)
    }
    pub async fn watch_is_app_mounted<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        Ok(IsAppStateMountedSubscriptions.listen(ctx).await?)
    }
    pub async fn watch_is_logged<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        Ok(IsLoggedSubscriptions.listen(ctx).await?)
    }
    pub async fn watch_download_state<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        object_id: Uuid,
    ) -> Result<impl Stream<Item = DownloadState> + 'ctx> {
        Ok(DownloadStateSubscriptions
            .listen_by_id(ctx, object_id)
            .await?)
    }
    pub async fn watch_reading_state<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        chapter_id: Uuid,
    ) -> Result<impl Stream<Item = ReadingState> + 'ctx> {
        Ok(ReadingStateSubscriptions
            .listen_by_id(ctx, chapter_id)
            .await?)
    }
    pub async fn watch_is_following_manga<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        Ok(IsFollowingSubscriptions
            .listen_by_manga_id(ctx, manga_id)
            .await?)
    }
    pub async fn watch_is_following_group<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        group_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        Ok(IsFollowingSubscriptions
            .listen_by_group_id(ctx, group_id)
            .await?)
    }
    pub async fn watch_is_following_user<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        user_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        Ok(IsFollowingSubscriptions
            .listen_by_user_id(ctx, user_id)
            .await?)
    }
    pub async fn watch_is_following_custom_list<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        custom_list_id: Uuid,
    ) -> Result<impl Stream<Item = bool> + 'ctx> {
        Ok(IsFollowingSubscriptions
            .listen_by_custom_list_id(ctx, custom_list_id)
            .await?)
    }
    pub async fn watch_manga_reading_state<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        manga_id: Uuid,
    ) -> Result<impl Stream<Item = Option<ReadingStatus>> + 'ctx> {
        Ok(MangaReadingStatusSubscriptions
            .listen_by_id(ctx, manga_id)
            .await?)
    }
    pub async fn watch_image_fit<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = ImageFit> + 'ctx> {
        Ok(UserOptionSubscriptions.listen_to_image_fit(ctx).await?)
    }
    pub async fn watch_longstrip_image_width<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = f64> + 'ctx> {
        Ok(UserOptionSubscriptions
            .listen_to_longstrip_image_width(ctx)
            .await?)
    }
    pub async fn watch_manga_list_style<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = MangaListStyle> + 'ctx> {
        Ok(UserOptionSubscriptions
            .listen_to_manga_list_style(ctx)
            .await?)
    }
    pub async fn watch_themes_profile<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Vec<ThemeProfileEntry>> + 'ctx> {
        Ok(UserOptionSubscriptions
            .listen_to_theme_profiles(ctx)
            .await?)
    }
    pub async fn watch_theme_profile_default<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = MangaDexTheme> + 'ctx> {
        Ok(UserOptionSubscriptions
            .listen_to_theme_profile_default(ctx)
            .await?)
    }
    pub async fn watch_theme_profile_default_name<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Option<String>> + 'ctx> {
        Ok(UserOptionSubscriptions
            .listen_to_theme_profile_default_name(ctx)
            .await?)
    }
    pub async fn watch_client_info<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Option<ClientInfo>> + 'ctx> {
        Ok(OauthSubscriptions.listen(ctx).await?)
    }
    pub async fn watch_chapter_feed_style<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = ChapterFeedStyle> + 'ctx> {
        Ok(UserOptionSubscriptions
            .listen_to_chapter_feed_style(ctx)
            .await?)
    }
    pub async fn watch_pagination_style<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = PaginationStyle> + 'ctx> {
        Ok(UserOptionSubscriptions
            .listen_to_pagination_style(ctx)
            .await?)
    }
    pub async fn watch_chapter_download_state<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        deferred: Option<bool>,
        chapter_id: Uuid,
    ) -> Result<impl Stream<Item = ChapterDownloadState> + 'ctx> {
        Ok(ChapterDownloadSubs
            .listen_to_download_state(ctx, chapter_id, deferred.unwrap_or_default())
            .await?)
    }
    pub async fn watch_chapters_tasks_list<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Vec<Uuid>> + 'ctx> {
        Ok(ChapterDownloadSubs.listen_to_chapter_tasks(ctx).await?)
    }
    pub async fn watch_cover_download_state<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        deferred: Option<bool>,
        cover_id: Uuid,
    ) -> Result<impl Stream<Item = CoverDownloadState> + 'ctx> {
        Ok(CoverDownloadSubs
            .listen_to_download_state(ctx, cover_id, deferred)
            .await?)
    }
    pub async fn watch_cover_tasks_list<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Vec<Uuid>> + 'ctx> {
        Ok(CoverDownloadSubs.listen_to_cover_tasks(ctx).await?)
    }
    pub async fn watch_manga_download_state<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
        deferred: Option<bool>,
        manga_id: Uuid,
    ) -> Result<impl Stream<Item = MangaDownloadState> + 'ctx> {
        Ok(MangaDownloadSubs
            .listen_to_download_state(ctx, manga_id, deferred.unwrap_or_default())
            .await?)
    }
    pub async fn watch_manga_tasks_list<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Vec<Uuid>> + 'ctx> {
        Ok(MangaDownloadSubs.listen_to_manga_tasks(ctx).await?)
    }
    pub async fn watch_content_profiles<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Vec<ContentProfileEntry>> + 'ctx> {
        Ok(UserOptionSubscriptions
            .listen_to_content_profiles(ctx)
            .await?)
    }
    pub async fn watch_content_profile_default_name<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = Option<String>> + 'ctx> {
        Ok(UserOptionSubscriptions
            .listen_to_content_profile_default_name(ctx)
            .await?)
    }
    pub async fn watch_content_profile_default<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = ContentProfile> + 'ctx> {
        Ok(UserOptionSubscriptions
            .listen_to_content_profile_default(ctx)
            .await?)
    }
    pub async fn watch_chapter_quality<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = DownloadMode> + 'ctx> {
        Ok(UserOptionSubscriptions
            .listen_to_chapter_quality(ctx)
            .await?)
    }
    pub async fn watch_page_limit<'ctx>(
        &'ctx self,
        ctx: &'ctx Context<'ctx>,
    ) -> Result<impl Stream<Item = NonZero<u64>> + 'ctx> {
        Ok(UserOptionSubscriptions.listen_to_page_limit(ctx).await?)
    }
}
