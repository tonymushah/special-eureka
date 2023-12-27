use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::user_history::UserHistoryEntry as Entry;
use mangadex_api_types_rust::MangaDexDateTime;
use uuid::Uuid;

#[derive(Debug, Clone, Copy, SimpleObject)]
pub struct UserHistoryEntry {
    pub chapter_id: Uuid,
    pub read_date: MangaDexDateTime,
}

impl From<Entry> for UserHistoryEntry {
    fn from(value: Entry) -> Self {
        Self {
            chapter_id: value.chapter_id,
            read_date: value.read_date,
        }
    }
}
