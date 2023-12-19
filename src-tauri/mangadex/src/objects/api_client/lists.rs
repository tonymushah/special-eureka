use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::{ApiClientObject, Results};

use crate::objects::ResultsInfo;

use super::ApiClient;

#[derive(Clone, SimpleObject)]
pub struct ApiClientResults {
    data: Vec<ApiClient>,
    #[graphql(flatten)]
    info: ResultsInfo,
}

impl From<Results<ApiClientObject>> for ApiClientResults {
    fn from(value: Results<ApiClientObject>) -> Self {
        Self {
            data: value
                .data
                .iter()
                .map(|e| <ApiClient as From<ApiClientObject>>::from(e.clone()))
                .collect(),
            info: value.into(),
        }
    }
}
