pub mod authors;
pub mod scanlation_groups;
pub mod users;

use async_graphql::Object;

#[derive(Debug)]
pub struct BlacklistQueries;

#[Object]
impl BlacklistQueries {
    pub async fn authors_artists(&self) -> authors::BlacklistAuthorsArtistsQueries {
        authors::BlacklistAuthorsArtistsQueries
    }
    pub async fn scanlation_groups(&self) -> scanlation_groups::BlacklistScanlationGroupsQueries {
        scanlation_groups::BlacklistScanlationGroupsQueries
    }
    pub async fn users(&self) -> users::BlacklistUsersQueries {
        users::BlacklistUsersQueries
    }
}
