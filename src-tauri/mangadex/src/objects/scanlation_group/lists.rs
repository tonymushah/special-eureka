use std::ops::Deref;
use std::vec::IntoIter;

use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::{GroupObject, Results};
use mangadex_api_types_rust::ReferenceExpansionResource;

use crate::objects::{
    ExtractReferenceExpansion, ExtractReferenceExpansionFromContext, ResultsInfo,
};

use super::ScanlationGroup as Group;

#[derive(Clone, SimpleObject)]
pub struct ScanlationGroupResults {
    data: Vec<Group>,
    #[graphql(flatten)]
    pub info: ResultsInfo,
}

impl Deref for ScanlationGroupResults {
    type Target = Vec<Group>;

    fn deref(&self) -> &Self::Target {
        &self.data
    }
}

impl IntoIterator for ScanlationGroupResults {
    type Item = Group;

    type IntoIter = IntoIter<Self::Item>;

    fn into_iter(self) -> Self::IntoIter {
        self.data.into_iter()
    }
}

impl From<Results<GroupObject>> for ScanlationGroupResults {
    fn from(value: Results<GroupObject>) -> Self {
        Self {
            data: value
                .data
                .iter()
                .map(|e| <Group as From<GroupObject>>::from(e.clone()))
                .collect(),
            info: value.into(),
        }
    }
}

impl ExtractReferenceExpansion<'_> for ScanlationGroupResults {
    fn exctract(field: async_graphql::SelectionField<'_>) -> Vec<ReferenceExpansionResource> {
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        if let Some(rel_field) = field
            .selection_set()
            .find(|f| f.name() == "data")
            .and_then(|_f| _f.selection_set().find(|f| f.name() == "relationship"))
        {
            let mut out = <Group as ExtractReferenceExpansion>::exctract(rel_field);
            includes.append(&mut out);
        }
        includes
    }
}

impl ExtractReferenceExpansionFromContext<'_> for ScanlationGroupResults {}
