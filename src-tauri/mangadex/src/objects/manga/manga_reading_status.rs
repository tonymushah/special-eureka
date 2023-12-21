use async_graphql::SimpleObject;
use mangadex_api_types_rust::ReadingStatus;
use uuid::Uuid;

#[derive(Debug, Clone, Copy, SimpleObject)]
pub struct MangaReadingStatusItem {
    pub id: Uuid,
    pub status: ReadingStatus,
}
