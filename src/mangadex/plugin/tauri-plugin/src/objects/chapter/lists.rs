use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::{ChapterObject, Results};

use crate::objects::ResultsInfo;

use super::Chapter;

#[derive(Clone, SimpleObject)]
pub struct ChapterResults {
    data: Vec<Chapter>,
    #[graphql(flatten)]
    info: ResultsInfo,
}

impl From<Results<ChapterObject>> for ChapterResults {
    fn from(value: Results<ChapterObject>) -> Self {
        Self {
            data: value
                .data
                .iter()
                .map(|e| <Chapter as From<ChapterObject>>::from(e.clone()))
                .collect(),
            info: value.into(),
        }
    }
}
