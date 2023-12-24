pub mod chapter;
pub mod volume;

use async_graphql::{ComplexObject, SimpleObject};
use mangadex_api_schema_rust::v5::manga_aggregate::{MangaAggregate as MA, VolumeAggregate as VA};
use uuid::Uuid;

use self::volume::VolumeAggregate;

#[derive(Debug, Clone, SimpleObject)]
#[graphql(complex)]
pub struct MangaAggregate {
    pub volumes: Vec<VolumeAggregate>,
}

impl From<Vec<VA>> for MangaAggregate {
    fn from(value: Vec<VA>) -> Self {
        Self {
            volumes: value
                .into_iter()
                .map(|v| -> VolumeAggregate { v.into() })
                .collect(),
        }
    }
}

impl From<MA> for MangaAggregate {
    fn from(value: MA) -> Self {
        value.volumes.into()
    }
}

impl From<Vec<MangaAggregate>> for MangaAggregate {
    fn from(value: Vec<MangaAggregate>) -> Self {
        Self {
            volumes: value.into_iter().flat_map(|m_agg| m_agg.volumes).collect(),
        }
    }
}

impl From<Vec<VolumeAggregate>> for MangaAggregate {
    fn from(value: Vec<VolumeAggregate>) -> Self {
        Self { volumes: value }
    }
}

impl MangaAggregate {
    pub fn chapter_ids(&self) -> Vec<Uuid> {
        self.volumes.iter().flat_map(|v| v.chapter_ids()).collect()
    }
    pub fn reverse(&mut self) {
        self.volumes.iter_mut().for_each(|v| v.reverse());
        self.volumes.reverse();
    }
    pub fn to_reverse(mut self) -> Self {
        self.reverse();
        self
    }
    pub fn chunks(self, chunk_size: u32) -> Vec<MangaAggregate> {
        self.volumes
            .chunks(chunk_size as usize)
            .map(|v| -> MangaAggregate { v.to_vec().into() })
            .collect()
    }
    pub fn count(&self) -> u32 {
        let mut count = 0;
        self.volumes.iter().for_each(|v| count += v.count);
        count
    }
}

#[ComplexObject]
impl MangaAggregate {
    pub async fn ids(&self) -> Vec<Uuid> {
        self.chapter_ids()
    }
}
