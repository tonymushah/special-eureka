pub mod rating;

use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::statistics::manga::MangaStatistics as Statistics;
use uuid::Uuid;

use self::rating::MangaRating;

use super::StatisticsComments;

#[derive(Debug, Clone, Copy, SimpleObject)]
pub struct MangaStatistics {
    pub id: Uuid,
    pub comments: Option<StatisticsComments>,
    pub rating: MangaRating,
}

impl From<(Uuid, Statistics)> for MangaStatistics {
    fn from((id, value): (Uuid, Statistics)) -> Self {
        Self {
            id,
            comments: value.comments.map(Into::into),
            rating: value.rating.into(),
        }
    }
}
