use std::fmt::Debug;

use uuid::Uuid;

use crate::objects::{GetAttributes, GetId};

use self::{
    api_client::ApiClientWatch,
    author::AuthorWatch,
    chapter::ChapterWatch,
    chapter_languages::ChapterLanguagesWatch,
    cover::CoverWatch,
    custom_list::CustomListWatch,
    download_state::DownloadStateWatch,
    is_appstate_mounted::IsAppStateMountedWatch,
    is_logged::IsLoggedWatch,
    manga::MangaWatch,
    page_direction::PageDirectionWatch,
    rating::RatingWatch,
    reading_mode::ReadingModeWatch,
    scanlation_group::ScanlationGroupWatch,
    sidebar_direction::SideBarDirectionWatch,
    statistics::{manga::MangaStatisticsWatch, StatisticsWatch},
    tag::TagWatch,
    upload::{session::UploadSessionWatch, session_file::UploadSessionFileWatch},
    user::UserWatch,
    user_me::UserMeWatch,
};

pub mod api_client;
pub mod author;
pub mod chapter;
pub mod chapter_languages;
pub mod cover;
pub mod custom_list;
pub mod download_state;
pub mod is_appstate_mounted;
pub mod is_logged;
pub mod manga;
pub mod page_direction;
pub mod rating;
pub mod read_marker;
pub mod reading_mode;
pub mod reading_state;
pub mod scanlation_group;
pub mod sidebar_direction;
pub mod statistics;
pub mod tag;
pub mod upload;
pub mod user;
pub mod user_me;

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

pub type SendDataResult = Result<(), String>;

pub trait SendData<T>: Send + Sync + Clone {
    fn send_data(&self, data: T) -> SendDataResult;
}

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
}
