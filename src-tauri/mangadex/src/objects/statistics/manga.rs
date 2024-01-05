pub mod rating;

use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::statistics::manga::MangaStatistics as Statistics;
use uuid::Uuid;

use crate::objects::{GetAttributes, GetId};

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

#[derive(Debug, Clone, Copy, SimpleObject)]
pub struct MangaStatisticsAttributes {
    pub comments: Option<StatisticsComments>,
    pub rating: MangaRating,
}

impl From<MangaStatistics> for MangaStatisticsAttributes {
    fn from(value: MangaStatistics) -> Self {
        Self {
            comments: value.comments,
            rating: value.rating,
        }
    }
}

impl From<&MangaStatistics> for MangaStatisticsAttributes {
    fn from(value: &MangaStatistics) -> Self {
        Self {
            comments: value.comments,
            rating: value.rating,
        }
    }
}

impl GetId for MangaStatistics {
    fn get_id(&self) -> Uuid {
        self.id
    }
}

impl GetAttributes for MangaStatistics {
    type Attributes = MangaStatisticsAttributes;
    fn get_attributes(&self) -> Self::Attributes {
        self.into()
    }
}
