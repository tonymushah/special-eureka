pub mod api_client;
pub mod author;
pub mod captcha;
pub mod chapter;
pub mod cover;
pub mod custom_list;
pub mod forums;
pub mod library;
pub mod manga;
pub mod oauth;
pub mod offline_app_state;
pub mod rating;
pub mod read_marker;
pub mod reading_state;
pub mod report;
pub mod scanlation_group;
pub mod upload;
pub mod user;
pub mod user_option;

use async_graphql::Object;
use cover::CoverMutations;
use user_option::UserOptionMutations;

use crate::mutation::library::LibraryMutations;

use self::{
    api_client::ApiClientMutation, author::AuthorMutations, captcha::CaptchaMutations,
    chapter::ChapterMutations, custom_list::CustomListMutations, forums::ForumsMutations,
    manga::MangaMutations, oauth::OauthMutations, offline_app_state::OfflineAppStateMutations,
    rating::RatingMutations, read_marker::ReadMarkerMutations, report::ReportMutations,
    scanlation_group::ScanlationGroupMutation, upload::UploadMutations, user::UserMutations,
};

#[derive(Debug, Clone, Copy)]
pub struct Mutation;

#[Object]
impl Mutation {
    pub async fn api_client(&self) -> ApiClientMutation {
        ApiClientMutation
    }
    pub async fn author(&self) -> AuthorMutations {
        AuthorMutations
    }
    pub async fn captcha(&self) -> CaptchaMutations {
        CaptchaMutations
    }
    pub async fn chapter(&self) -> ChapterMutations {
        ChapterMutations
    }
    pub async fn custom_list(&self) -> CustomListMutations {
        CustomListMutations
    }
    pub async fn forums(&self) -> ForumsMutations {
        ForumsMutations
    }
    pub async fn manga(&self) -> MangaMutations {
        MangaMutations
    }
    pub async fn rating(&self) -> RatingMutations {
        RatingMutations
    }
    pub async fn read_marker(&self) -> ReadMarkerMutations {
        ReadMarkerMutations
    }
    pub async fn oauth(&self) -> OauthMutations {
        OauthMutations
    }
    pub async fn report(&self) -> ReportMutations {
        ReportMutations
    }
    pub async fn scanlation_group(&self) -> ScanlationGroupMutation {
        ScanlationGroupMutation
    }
    pub async fn upload(&self) -> UploadMutations {
        UploadMutations
    }
    pub async fn offline_app_state(&self) -> OfflineAppStateMutations {
        OfflineAppStateMutations
    }
    pub async fn user(&self) -> UserMutations {
        UserMutations
    }
    pub async fn user_option(&self) -> UserOptionMutations {
        UserOptionMutations
    }
    pub async fn cover(&self) -> CoverMutations {
        CoverMutations
    }
    pub async fn library(&self) -> LibraryMutations {
        LibraryMutations
    }
}
