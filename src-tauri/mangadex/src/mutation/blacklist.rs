pub mod author_artists;
pub mod labels;
pub mod scanlation_groups;
pub mod users;

use async_graphql::Object;

pub struct BlacklistMutations;

#[Object]
impl BlacklistMutations {
    pub async fn author_artists(&self) -> author_artists::BlacklistAuthorArtistsMutations {
        author_artists::BlacklistAuthorArtistsMutations
    }
    pub async fn scanlation_groups(&self) -> scanlation_groups::BlacklistScanlationGroupsMutations {
        scanlation_groups::BlacklistScanlationGroupsMutations
    }
    pub async fn users(&self) -> users::BlacklistedUsersMutations {
        users::BlacklistedUsersMutations
    }
    pub async fn labels(&self) -> labels::BlacklistLabelsMutations {
        labels::BlacklistLabelsMutations
    }
}
