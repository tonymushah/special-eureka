use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::{Results, TagObject};

use crate::objects::ResultsInfo;

use super::Tag;

#[derive(Clone, SimpleObject)]
pub struct TagResults {
    data: Vec<Tag>,
    #[graphql(flatten)]
    info: ResultsInfo,
}

impl From<Results<TagObject>> for TagResults {
    fn from(value: Results<TagObject>) -> Self {
        Self {
            data: value
                .data
                .iter()
                .map(|e| <Tag as From<TagObject>>::from(e.clone()))
                .collect(),
            info: value.into(),
        }
    }
}
