use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::{MangaObject, Results};

use crate::objects::ResultsInfo;

use super::MangaObject as Manga;

#[derive(Clone, SimpleObject)]
pub struct MangaResults {
    data: Vec<Manga>,
    #[graphql(flatten)]
    info: ResultsInfo,
}

impl From<Results<MangaObject>> for MangaResults {
    fn from(value: Results<MangaObject>) -> Self {
        Self {
            data: value
                .data
                .iter()
                .map(|e| <Manga as From<MangaObject>>::from(e.clone()))
                .collect(),
            info: value.into(),
        }
    }
}
