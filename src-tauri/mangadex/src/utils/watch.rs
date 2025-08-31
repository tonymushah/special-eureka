use std::{convert::AsRef, fmt::Debug};

use chapter_feed_style::ChapterFeedStyleWatch;
use client_info::ClientInfoWatch;
use image_fit::ImageFitWatch;
use pagination_style::PaginationStyleWatch;
use uuid::Uuid;

use crate::objects::{GetAttributes, GetId};

pub mod api_client;
pub mod author;
pub mod chapter;
pub mod chapter_feed_style;
pub mod chapter_languages;
pub mod chapter_layout;
pub mod chapter_quality;
pub mod client_info;
pub mod content;
pub mod cover;
pub mod custom_list;
pub mod download_state;
pub mod image_fit;
pub mod is_appstate_mounted;
pub mod is_following;
pub mod is_logged;
pub mod longstrip_image_width;
pub mod manga;
pub mod manga_list_style;
pub mod manga_reading_state;
pub mod page_direction;
pub mod page_limit;
pub mod pagination_style;
pub mod rating;
pub mod read_marker;
pub mod reading_mode;
pub mod reading_state;
pub mod scanlation_group;
pub mod sidebar_direction;
pub mod statistics;
pub mod tag;
pub mod theme;
pub mod upload;
pub mod user;
pub mod user_me;

use self::{
    api_client::ApiClientWatch,
    author::AuthorWatch,
    chapter::ChapterWatch,
    chapter_languages::ChapterLanguagesWatch,
    chapter_layout::ChapterLayoutWatch,
    chapter_quality::ChapterQualityWatch,
    content::{ContentProfilesWatch, key::ContentProfileDefaultKeyWatch},
    cover::CoverWatch,
    custom_list::CustomListWatch,
    download_state::DownloadStateWatch,
    is_appstate_mounted::IsAppStateMountedWatch,
    is_following::IsFollowingWatch,
    is_logged::IsLoggedWatch,
    longstrip_image_width::LongstripImageWidthWatch,
    manga::MangaWatch,
    manga_list_style::MangaListStyleWatch,
    manga_reading_state::MangaReadingStateWatch,
    page_direction::PageDirectionWatch,
    page_limit::PageLimitWatch,
    rating::RatingWatch,
    read_marker::ReadMarkerWatch,
    reading_mode::ReadingModeWatch,
    reading_state::ReadingStateWatch,
    scanlation_group::ScanlationGroupWatch,
    sidebar_direction::SideBarDirectionWatch,
    statistics::{StatisticsWatch, manga::MangaStatisticsWatch},
    tag::TagWatch,
    theme::{ThemeProfilesWatch, key::ThemeProfileDefaultKeyWatch},
    upload::{session::UploadSessionWatch, session_file::UploadSessionFileWatch},
    user::UserWatch,
    user_me::UserMeWatch,
};

pub struct WatcherInnerData<T: ?Sized> {
    pub id: Uuid,
    pub attributes: T,
}

impl<T> Clone for WatcherInnerData<T>
where
    T: Clone,
{
    fn clone(&self) -> Self {
        Self {
            id: self.id,
            attributes: self.attributes.clone(),
        }
    }
}

impl<T> Copy for WatcherInnerData<T> where T: Copy {}

impl<T> From<(Uuid, T)> for WatcherInnerData<T> {
    fn from((id, attributes): (Uuid, T)) -> Self {
        Self { id, attributes }
    }
}

/*
impl<T> GetId for WatcherInnerData<T> {
    fn get_id(&self) -> Uuid {
        self.id
    }
}

impl<T> GetAttributes for WatcherInnerData<T>
where
    T: Clone,
{
    type Attributes = T;
    fn get_attributes(&self) -> Self::Attributes {
        self.attributes.clone()
    }
}

*/

impl<I, T> From<I> for WatcherInnerData<T>
where
    I: GetId + GetAttributes<Attributes = T>,
{
    fn from(value: I) -> Self {
        Self {
            id: value.get_id(),
            attributes: value.get_attributes(),
        }
    }
}

impl<T> Debug for WatcherInnerData<T>
where
    T: Debug,
{
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        self.id.fmt(f)?;
        self.attributes.fmt(f)
    }
}

#[derive(thiserror::Error, Debug)]
pub enum SendDataError {}

pub type SendDataResult = Result<(), SendDataError>;

pub trait SendData<T>: Send + Sync + Clone {
    fn send_data(&self, data: T) -> SendDataResult;
}

/*
#[derive(Debug, Clone, Default)]
pub struct Watches {
    pub api_client: ApiClientWatch,
    pub author: AuthorWatch,
    pub chapter: ChapterWatch,
    pub cover: CoverWatch,
    pub custom_list: CustomListWatch,
    pub manga: MangaWatch,
    pub rating: RatingWatch,
    pub scanlation_group: ScanlationGroupWatch,
    pub statistics: StatisticsWatch,
    pub manga_statistics: MangaStatisticsWatch,
    pub tag: TagWatch,
    pub upload_session: UploadSessionWatch,
    pub upload_session_file: UploadSessionFileWatch,
    pub user: UserWatch,
    pub user_me: UserMeWatch,
    pub is_logged: IsLoggedWatch,
    pub page_direction: PageDirectionWatch,
    pub reading_mode: ReadingModeWatch,
    pub sidebar_direction: SideBarDirectionWatch,
    pub chapter_languages: ChapterLanguagesWatch,
    pub is_appstate_mounted: IsAppStateMountedWatch,
    pub download_state: DownloadStateWatch,
    pub reading_state: ReadingStateWatch,
    pub is_following: IsFollowingWatch,
    pub manga_reading_state: MangaReadingStateWatch,
    pub read_marker: ReadMarkerWatch,
    pub image_fit: ImageFitWatch,
    pub longstrip_image_width: LongstripImageWidthWatch,
    pub manga_list_style: MangaListStyleWatch,
    pub themes: ThemeProfilesWatch,
    pub theme_default_key: ThemeProfileDefaultKeyWatch,
    pub client_info: ClientInfoWatch,
    pub chapter_feed_style: ChapterFeedStyleWatch,
    pub pagination_style: PaginationStyleWatch,
}
*/

macro_rules! watches_implementation {
    ($($name:ident => $t:ty,)*) => {
        #[derive(Debug, Clone, Default)]
        pub struct Watches {
            $(
                pub $name: $t,
            )*
        }
        $(
            impl AsRef<$t> for Watches {
                fn as_ref(&self) -> &$t {
                    &self.$name
                }
            }
        )*
    };
}

watches_implementation! {
    api_client => ApiClientWatch,
    author => AuthorWatch,
    chapter => ChapterWatch,
    cover => CoverWatch,
    custom_list => CustomListWatch,
    manga => MangaWatch,
    rating => RatingWatch,
    scanlation_group => ScanlationGroupWatch,
    statistics => StatisticsWatch,
    manga_statistics => MangaStatisticsWatch,
    tag => TagWatch,
    upload_session => UploadSessionWatch,
    upload_session_file => UploadSessionFileWatch,
    user => UserWatch,
    user_me => UserMeWatch,
    is_logged => IsLoggedWatch,
    page_direction => PageDirectionWatch,
    reading_mode => ReadingModeWatch,
    sidebar_direction => SideBarDirectionWatch,
    chapter_languages => ChapterLanguagesWatch,
    is_appstate_mounted => IsAppStateMountedWatch,
    download_state => DownloadStateWatch,
    reading_state => ReadingStateWatch,
    is_following => IsFollowingWatch,
    manga_reading_state => MangaReadingStateWatch,
    read_marker => ReadMarkerWatch,
    image_fit => ImageFitWatch,
    longstrip_image_width => LongstripImageWidthWatch,
    manga_list_style => MangaListStyleWatch,
    themes => ThemeProfilesWatch,
    theme_default_key => ThemeProfileDefaultKeyWatch,
    client_info => ClientInfoWatch,
    chapter_feed_style => ChapterFeedStyleWatch,
    pagination_style => PaginationStyleWatch,
    content_profiles => ContentProfilesWatch,
    content_profiles_default_key => ContentProfileDefaultKeyWatch,
    chapter_quality => ChapterQualityWatch,
    page_limit => PageLimitWatch,
    chapter_layout => ChapterLayoutWatch,
}
