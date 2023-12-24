use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::{CustomListObject, Results};

use crate::objects::ResultsInfo;

use super::CustomList;

#[derive(Clone, SimpleObject)]
pub struct CustomListResults {
    data: Vec<CustomList>,
    #[graphql(flatten)]
    info: ResultsInfo,
}

impl From<Results<CustomListObject>> for CustomListResults {
    fn from(value: Results<CustomListObject>) -> Self {
        Self {
            data: value
                .data
                .iter()
                .map(|e| <CustomList as From<CustomListObject>>::from(e.clone()))
                .collect(),
            info: value.into(),
        }
    }
}
