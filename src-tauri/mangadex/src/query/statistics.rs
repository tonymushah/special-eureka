pub mod chapter;
pub mod group;
pub mod manga;

use self::{
    chapter::ChapterStatisticsQueries, group::GroupStatisticsQueries, manga::MangaStatisticsQueries,
};

use async_graphql::Object;

#[derive(Debug, Clone, Copy)]
pub struct StatisticsQueries;

#[Object]
impl StatisticsQueries {
    pub async fn chapter(&self) -> ChapterStatisticsQueries {
        ChapterStatisticsQueries
    }
    pub async fn group(&self) -> GroupStatisticsQueries {
        GroupStatisticsQueries
    }
    pub async fn manga(&self) -> MangaStatisticsQueries {
        MangaStatisticsQueries
    }
}
