pub mod api_client;
pub mod auth;
pub mod author;
pub mod chapter;
pub mod cover;
pub mod custom_list;
pub mod feed;
pub mod follows;
pub mod infrastructure;
pub mod legacy;
pub mod manga;
pub mod rating;
pub mod tag;

use async_graphql::Object;

use self::{
    api_client::ApiClientQueries, author::AuthorQueries, chapter::ChapterQueries,
    cover::CoverQueries, custom_list::CustomListQueries, feed::FeedQueries,
    follows::FollowsQueries, infrastructure::InfrastructureQueries, legacy::LegacyQueries,
    manga::MangaQueries, tag::TagQueries,
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
}
