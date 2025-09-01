use async_graphql::{ComplexObject, Result, SimpleObject};
use mangadex_api_schema_rust::v5::statistics::{
    Comments, chapter::ChapterStatistics, groups::GroupStatistics,
};
use url::Url;
use uuid::Uuid;

use super::{GetAttributes, GetId};

pub mod manga;

#[derive(Debug, Clone, Copy, SimpleObject)]
pub struct Statistics {
    pub id: Uuid,
    pub comments: Option<StatisticsComments>,
}

impl From<(Uuid, ChapterStatistics)> for Statistics {
    fn from((id, value): (Uuid, ChapterStatistics)) -> Self {
        Self {
            id,
            comments: value.comments.map(Into::into),
        }
    }
}

impl From<(Uuid, GroupStatistics)> for Statistics {
    fn from((id, value): (Uuid, GroupStatistics)) -> Self {
        Self {
            id,
            comments: value.comments.map(Into::into),
        }
    }
}

impl GetId for Statistics {
    fn get_id(&self) -> Uuid {
        self.id
    }
}

impl GetAttributes for Statistics {
    type Attributes = Option<StatisticsComments>;
    fn get_attributes(&self) -> Self::Attributes {
        self.comments
    }
}

#[derive(Debug, Clone, Copy, SimpleObject)]
#[graphql(complex)]
pub struct StatisticsComments {
    pub thread_id: u32,
    pub replies_count: u32,
}

impl From<StatisticsComments> for Comments {
    fn from(value: StatisticsComments) -> Self {
        Self {
            thread_id: value.thread_id,
            replies_count: value.replies_count,
        }
    }
}

impl From<Comments> for StatisticsComments {
    fn from(value: Comments) -> Self {
        Self {
            thread_id: value.thread_id,
            replies_count: value.replies_count,
        }
    }
}

#[ComplexObject]
impl StatisticsComments {
    pub async fn thread_url(&self) -> Result<Url> {
        let comments: Comments = (*self).into();
        Ok(comments.try_into()?)
    }
}
