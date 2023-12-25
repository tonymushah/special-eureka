use async_graphql::SimpleObject;
use uuid::Uuid;

#[derive(Debug, Clone, SimpleObject)]
pub struct MangaReadMarkerGroupedItems {
    pub manga_id: Uuid,
    pub chapters: Vec<Uuid>,
}

impl From<(Uuid, Vec<Uuid>)> for MangaReadMarkerGroupedItems {
    fn from((manga_id, chapters): (Uuid, Vec<Uuid>)) -> Self {
        Self { manga_id, chapters }
    }
}
