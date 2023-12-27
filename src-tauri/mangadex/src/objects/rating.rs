use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::ratings::Rating;
use mangadex_api_types_rust::MangaDexDateTime;
use uuid::Uuid;

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
