pub mod manga;

use async_graphql::{Object, Result};

use self::manga::MangaQueries;

pub struct Query;

#[Object]
impl Query {
    async fn manga(&self) -> MangaQueries {
        MangaQueries
    }
}
