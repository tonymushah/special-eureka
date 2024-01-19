use std::ops::Deref;
use std::vec::IntoIter;

use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::{ChapterObject, Results};
use mangadex_api_types_rust::ReferenceExpansionResource;

use crate::objects::{
    ExtractReferenceExpansion, ExtractReferenceExpansionFromContext, ResultsInfo,
};

use super::Chapter;

#[derive(Clone, SimpleObject)]
pub struct ChapterResults {
    data: Vec<Chapter>,
    #[graphql(flatten)]
    info: ResultsInfo,
}

impl IntoIterator for ChapterResults {
    type Item = Chapter;

    type IntoIter = IntoIter<Self::Item>;

    fn into_iter(self) -> Self::IntoIter {
        self.data.into_iter()
    }
}

impl Deref for ChapterResults {
    type Target = Vec<Chapter>;

    fn deref(&self) -> &Self::Target {
        &self.data
    }
}

impl From<Results<ChapterObject>> for ChapterResults {
    fn from(value: Results<ChapterObject>) -> Self {
        Self {
            data: value
                .data
                .iter()
                .map(|e| <Chapter as From<ChapterObject>>::from(e.clone()))
                .collect(),
            info: value.into(),
        }
    }
}

impl ExtractReferenceExpansion<'_> for ChapterResults {
    fn exctract(
        field: async_graphql::SelectionField<'_>,
    ) -> Vec<mangadex_api_types_rust::ReferenceExpansionResource> {
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        if let Some(rel) = field
            .selection_set()
            .find(|f| f.name() == "data")
            .and_then(|pf| pf.selection_set().find(|f| f.name() == "relationships"))
        {
            let mut out = <Chapter as ExtractReferenceExpansion>::exctract(rel);
            includes.append(&mut out);
        }
        includes.dedup();
        includes
    }
}

impl ExtractReferenceExpansionFromContext<'_> for ChapterResults {}
