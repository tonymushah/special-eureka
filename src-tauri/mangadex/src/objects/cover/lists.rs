use std::ops::Deref;
use std::vec::IntoIter;

use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::{CoverObject, Results};

use crate::objects::{
    ExtractReferenceExpansion, ExtractReferenceExpansionFromContext, ResultsInfo,
};

use mangadex_api_types_rust::ReferenceExpansionResource;

use super::Cover;

#[derive(Clone, SimpleObject)]
pub struct CoverResults {
    data: Vec<Cover>,
    #[graphql(flatten)]
    pub info: ResultsInfo,
}

impl IntoIterator for CoverResults {
    type Item = Cover;
    type IntoIter = IntoIter<Self::Item>;
    fn into_iter(self) -> Self::IntoIter {
        self.data.into_iter()
    }
}

impl Deref for CoverResults {
    type Target = Vec<Cover>;
    fn deref(&self) -> &Self::Target {
        &self.data
    }
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

impl ExtractReferenceExpansion<'_> for CoverResults {
    fn exctract(field: async_graphql::SelectionField<'_>) -> Vec<ReferenceExpansionResource> {
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        if let Some(rel) = field
            .selection_set()
            .find(|f| f.name() == "data")
            .and_then(|pf| pf.selection_set().find(|f| f.name() == "relationships"))
        {
            let mut out = <Cover as ExtractReferenceExpansion>::exctract(rel);
            includes.append(&mut out);
        }
        includes
    }
}

impl ExtractReferenceExpansionFromContext<'_> for CoverResults {}
