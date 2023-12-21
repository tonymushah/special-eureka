use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::manga_aggregate::ChapterAggregate as CA;
use uuid::Uuid;

#[derive(Debug, Clone)]
pub struct ChapterAggregate(pub CA);

impl Deref for ChapterAggregate {
    type Target = CA;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<CA> for ChapterAggregate {
    fn from(value: CA) -> Self {
        Self(value)
    }
}

impl ChapterAggregate {
    pub fn chapter_ids(&self) -> Vec<Uuid> {
        let mut ids: Vec<Uuid> = vec![self.id];
        self.others.iter().for_each(|id| {
            ids.push(*id);
        });
        ids
    }
}

#[Object]
impl ChapterAggregate {
    pub async fn chapter(&self) -> &String {
        &self.chapter
    }
    pub async fn ids(&self) -> Vec<Uuid> {
        self.chapter_ids()
    }
    pub async fn count(&self) -> u32 {
        self.count
    }
}
