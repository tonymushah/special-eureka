use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::{GroupObject, Results};

use crate::objects::ResultsInfo;

use super::ScanlationGroup as Group;

#[derive(Clone, SimpleObject)]
pub struct ScanlationGroupResults {
    data: Vec<Group>,
    #[graphql(flatten)]
    info: ResultsInfo,
}

impl From<Results<GroupObject>> for ScanlationGroupResults {
    fn from(value: Results<GroupObject>) -> Self {
        Self {
            data: value
                .data
                .iter()
                .map(|e| <Group as From<GroupObject>>::from(e.clone()))
                .collect(),
            info: value.into(),
        }
    }
}
