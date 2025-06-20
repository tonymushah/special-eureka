pub mod api_client;
pub mod auth;
pub mod author;
pub mod chapter;
pub mod cover;
pub mod custom_list;
pub mod download_state;
pub mod feed;
pub mod follows;
pub mod home;
pub mod infrastructure;
pub mod legacy;
pub mod manga;
pub mod oauth;
pub mod offline_app_state;
pub mod rating;
pub mod read_marker;
pub mod report;
pub mod scanlation_group;
pub mod statistics;
pub mod tag;
pub mod upload;
pub mod user;
pub mod user_option;
pub mod utils;

use async_graphql::Object;
use user_option::UserOptionQueries;

use self::{
    api_client::ApiClientQueries, author::AuthorQueries, chapter::ChapterQueries,
    cover::CoverQueries, custom_list::CustomListQueries, download_state::DownloadStateQueries,
    feed::FeedQueries, follows::FollowsQueries, home::HomeQueries,
    infrastructure::InfrastructureQueries, legacy::LegacyQueries, manga::MangaQueries,
    oauth::OauthQueries, offline_app_state::OfflineAppStateQueries, rating::RatingQueries,
    read_marker::ReadMarkerQueries, report::ReportQueries,
    scanlation_group::ScanlationGroupQueries, statistics::StatisticsQueries, tag::TagQueries,
    upload::UploadQueries, user::UserQueries, utils::UtilsQuery,
	auth::AuthQuery
};

pub struct Query;

#[Object]
impl Query {
    pub async fn manga(&self) -> MangaQueries {
        MangaQueries
    }
    pub async fn api_client(&self) -> ApiClientQueries {
        ApiClientQueries
    }
    pub async fn author(&self) -> AuthorQueries {
        AuthorQueries
    }
    pub async fn chapter(&self) -> ChapterQueries {
        ChapterQueries
    }
    pub async fn cover(&self) -> CoverQueries {
        CoverQueries
    }
    pub async fn custom_list(&self) -> CustomListQueries {
        CustomListQueries
    }
    pub async fn feed(&self) -> FeedQueries {
        FeedQueries
    }
    pub async fn follows(&self) -> FollowsQueries {
        FollowsQueries
    }
    pub async fn infrastructure(&self) -> InfrastructureQueries {
        InfrastructureQueries
    }
    pub async fn legacy(&self) -> LegacyQueries {
        LegacyQueries
    }
    pub async fn tag(&self) -> TagQueries {
        TagQueries
    }
    pub async fn rating(&self) -> RatingQueries {
        RatingQueries
    }
    pub async fn read_marker(&self) -> ReadMarkerQueries {
        ReadMarkerQueries
    }
    pub async fn oauth(&self) -> OauthQueries {
        OauthQueries
    }
    pub async fn report(&self) -> ReportQueries {
        ReportQueries
    }
    pub async fn statistics(&self) -> StatisticsQueries {
        StatisticsQueries
    }
    pub async fn upload(&self) -> UploadQueries {
        UploadQueries
    }
    pub async fn user(&self) -> UserQueries {
        UserQueries
    }
    pub async fn offline_app_state(&self) -> OfflineAppStateQueries {
        OfflineAppStateQueries
    }
    pub async fn home(&self) -> HomeQueries {
        HomeQueries
    }
    pub async fn download_state(&self) -> DownloadStateQueries {
        DownloadStateQueries
    }
    pub async fn utils(&self) -> UtilsQuery {
        UtilsQuery
    }
    pub async fn scanlation_group(&self) -> ScanlationGroupQueries {
        ScanlationGroupQueries
    }
    pub async fn user_option(&self) -> UserOptionQueries {
        UserOptionQueries
    }
	pub async fn auth(&self) -> AuthQuery {
		AuthQuery
	}
}
