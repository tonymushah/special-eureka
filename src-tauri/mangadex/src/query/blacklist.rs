pub mod authors;

use async_graphql::Object;

#[derive(Debug)]
pub struct BlacklistQueries;

#[Object]
impl BlacklistQueries {
    pub async fn authors_artists(&self) -> authors::BlacklistAuthorsArtistsQueries {
        authors::BlacklistAuthorsArtistsQueries
    }
    pub async fn scanlation_groups(&self) -> Option<bool> {
        None
    }
    pub async fn users(&self) -> Option<bool> {
        None
    }
}
