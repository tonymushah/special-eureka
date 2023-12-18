use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::Results;

pub mod api_client;
pub mod auth;
pub mod author;
pub mod chapter;
pub mod cover;
pub mod custom_list;
pub mod manga;
pub mod manga_chapter_group;
pub mod scanlation_group;
pub mod tag;
pub mod user;

#[derive(Debug, Clone, Copy, SimpleObject)]
pub struct ResultsInfo {
    pub limit: u32,
    pub offset: u32,
    pub total: u32,
}

impl<T> From<Results<T>> for ResultsInfo {
    fn from(value: Results<T>) -> Self {
        Self {
            limit: value.limit,
            offset: value.offset,
            total: value.total,
        }
    }
}

impl<T> From<&Results<T>> for ResultsInfo {
    fn from(value: &Results<T>) -> Self {
        Self {
            limit: value.limit,
            offset: value.offset,
            total: value.total,
        }
    }
}
