use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::ratings::Rating;
use mangadex_api_types_rust::MangaDexDateTime;
use uuid::Uuid;

use super::{GetAttributes, GetId};

#[derive(Debug, Clone, Copy, SimpleObject)]
pub struct RatingItem {
    pub id: Uuid,
    pub rating: u8,
    pub created_at: MangaDexDateTime,
}

impl From<(Uuid, Rating)> for RatingItem {
    fn from((id, rating): (Uuid, Rating)) -> Self {
        Self {
            id,
            rating: rating.rating,
            created_at: rating.created_at,
        }
    }
}

#[derive(Debug, Clone, Copy, SimpleObject)]
pub struct RatingItemAttributes {
    pub rating: u8,
    pub created_at: MangaDexDateTime,
}

impl From<RatingItem> for RatingItemAttributes {
    fn from(value: RatingItem) -> Self {
        Self {
            rating: value.rating,
            created_at: value.created_at,
        }
    }
}

impl From<&RatingItem> for RatingItemAttributes {
    fn from(value: &RatingItem) -> Self {
        Self {
            rating: value.rating,
            created_at: value.created_at,
        }
    }
}

impl GetId for RatingItem {
    fn get_id(&self) -> Uuid {
        self.id
    }
}

impl GetAttributes for RatingItem {
    type Attributes = RatingItemAttributes;
    fn get_attributes(&self) -> Self::Attributes {
        self.into()
    }
}
