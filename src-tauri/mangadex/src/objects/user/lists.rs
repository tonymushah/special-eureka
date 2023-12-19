use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::{Results, UserObject};

use crate::objects::ResultsInfo;

use super::User;

#[derive(Clone, SimpleObject)]
pub struct UserResults {
    data: Vec<User>,
    #[graphql(flatten)]
    info: ResultsInfo,
}

impl From<Results<UserObject>> for UserResults {
    fn from(value: Results<UserObject>) -> Self {
        Self {
            data: value
                .data
                .iter()
                .map(|e| <User as From<UserObject>>::from(e.clone()))
                .collect(),
            info: value.into(),
        }
    }
}
