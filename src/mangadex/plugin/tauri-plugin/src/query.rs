pub mod api_client;
pub mod auth;
pub mod author;
pub mod manga;

use async_graphql::Object;

use self::{api_client::ApiClientQueries, author::AuthorQueries, manga::MangaQueries};

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
}
