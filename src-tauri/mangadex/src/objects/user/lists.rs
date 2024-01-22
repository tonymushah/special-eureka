use std::ops::Deref;
use std::vec::IntoIter;

use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::{Results, UserObject};

use crate::objects::ResultsInfo;

use super::User;

#[derive(Clone, SimpleObject)]
pub struct UserResults {
    data: Vec<User>,
    #[graphql(flatten)]
    pub info: ResultsInfo,
}

impl IntoIterator for UserResults {
    type Item = User;

    type IntoIter = IntoIter<Self::Item>;

    fn into_iter(self) -> Self::IntoIter {
        self.data.into_iter()
    }
}

impl Deref for UserResults {
    type Target = Vec<User>;

    fn deref(&self) -> &Self::Target {
        &self.data
    }
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
