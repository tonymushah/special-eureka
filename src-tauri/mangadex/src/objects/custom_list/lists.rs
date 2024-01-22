use std::ops::Deref;
use std::vec::IntoIter;

use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::{CustomListObject, Results};

use crate::objects::ResultsInfo;

use super::CustomList;

#[derive(Clone, SimpleObject)]
pub struct CustomListResults {
    data: Vec<CustomList>,
    #[graphql(flatten)]
    pub info: ResultsInfo,
}

impl IntoIterator for CustomListResults {
    type Item = CustomList;

    type IntoIter = IntoIter<Self::Item>;

    fn into_iter(self) -> Self::IntoIter {
        self.data.into_iter()
    }
}

impl Deref for CustomListResults {
    type Target = Vec<CustomList>;

    fn deref(&self) -> &Self::Target {
        &self.data
    }
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
