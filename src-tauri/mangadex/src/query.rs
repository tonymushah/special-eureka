pub mod api_client;
pub mod auth;
pub mod author;
pub mod chapter;
pub mod cover;
pub mod custom_list;
pub mod feed;
pub mod manga;

use async_graphql::Object;

use self::{
    api_client::ApiClientQueries, author::AuthorQueries, chapter::ChapterQueries,
    cover::CoverQueries, custom_list::CustomListQueries, feed::FeedQueries, manga::MangaQueries,
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
}
