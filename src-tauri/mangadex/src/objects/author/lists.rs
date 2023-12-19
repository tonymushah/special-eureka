use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::{AuthorObject, Results};

use crate::objects::ResultsInfo;

use super::Author;

#[derive(Clone, SimpleObject)]
pub struct AuthorResults {
    data: Vec<Author>,
    #[graphql(flatten)]
    info: ResultsInfo,
}

impl From<Results<AuthorObject>> for AuthorResults {
    fn from(value: Results<AuthorObject>) -> Self {
        Self {
            data: value
                .data
                .iter()
                .map(|e| <Author as From<AuthorObject>>::from(e.clone()))
                .collect(),
            info: value.into(),
        }
    }
}
