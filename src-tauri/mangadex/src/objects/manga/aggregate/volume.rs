use async_graphql::{ComplexObject, SimpleObject};
use mangadex_api_schema_rust::v5::manga_aggregate::VolumeAggregate as VA;
use uuid::Uuid;

use super::chapter::ChapterAggregate;

#[derive(Debug, Clone, SimpleObject)]
#[graphql(complex)]
pub struct VolumeAggregate {
    pub volume: String,
    pub count: u32,
    pub chapters: Vec<ChapterAggregate>,
}

impl From<VA> for VolumeAggregate {
    fn from(value: VA) -> Self {
        Self {
            volume: value.volume,
            count: value.count,
            chapters: value
                .chapters
                .into_iter()
                .map(|i| -> ChapterAggregate { i.into() })
                .collect(),
        }
    }
}

impl VolumeAggregate {
    pub fn chapter_ids(&self) -> Vec<Uuid> {
        self.chapters.iter().flat_map(|i| i.chapter_ids()).collect()
    }
    pub fn reverse(&mut self) {
        self.chapters.reverse();
    }
    pub fn to_reverse(mut self) -> Self {
        self.reverse();
        self
    }
}

#[ComplexObject]
impl VolumeAggregate {
    pub async fn ids(&self) -> Vec<Uuid> {
        self.chapter_ids()
    }
}
