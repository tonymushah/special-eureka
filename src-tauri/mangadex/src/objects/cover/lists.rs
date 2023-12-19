use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::{CoverObject, Results};

use crate::objects::ResultsInfo;

use super::Cover;

#[derive(Clone, SimpleObject)]
pub struct CoverResults {
    data: Vec<Cover>,
    #[graphql(flatten)]
    info: ResultsInfo,
}

impl From<Results<CoverObject>> for CoverResults {
    fn from(value: Results<CoverObject>) -> Self {
        Self {
            data: value
                .data
                .iter()
                .map(|e| <Cover as From<CoverObject>>::from(e.clone()))
                .collect(),
            info: value.into(),
        }
    }
}
