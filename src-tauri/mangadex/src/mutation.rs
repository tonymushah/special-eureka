pub mod api_client;
pub mod author;
pub mod captcha;
pub mod chapter;
pub mod cover;
pub mod custom_list;
pub mod forums;
pub mod manga;
pub mod oauth;
pub mod rating;
pub mod read_marker;
pub mod report;

use async_graphql::Object;

use self::{
    api_client::ApiClientMutation, author::AuthorMutations, captcha::CaptchaMutations,
    chapter::ChapterMutations, custom_list::CustomListMutations, forums::ForumsMutations,
    manga::MangaMutations, oauth::OauthMutations, rating::RatingMutations,
    read_marker::ReadMarkerMutations, report::ReportMutations,
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
}
