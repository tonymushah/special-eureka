use std::ops::{Deref, DerefMut};

use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::{ApiClientObject, Results};
use mangadex_api_types_rust::ReferenceExpansionResource;

use crate::objects::{
    ExtractReferenceExpansion, ExtractReferenceExpansionFromContext, ResultsInfo,
};

use super::ApiClient;

#[derive(Clone, SimpleObject)]
pub struct ApiClientResults {
    data: Vec<ApiClient>,
    #[graphql(flatten)]
    pub info: ResultsInfo,
}

impl Deref for ApiClientResults {
    type Target = Vec<ApiClient>;
    fn deref(&self) -> &Self::Target {
        &self.data
    }
}

impl DerefMut for ApiClientResults {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.data
    }
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

impl ExtractReferenceExpansion<'_> for ApiClientResults {
    fn exctract(
        field: async_graphql::SelectionField<'_>,
    ) -> Vec<mangadex_api_types_rust::ReferenceExpansionResource> {
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        if let Some(rel) = field
            .selection_set()
            .find(|f| f.name() == "data")
            .and_then(|pf| pf.selection_set().find(|f| f.name() == "relationships"))
        {
            let mut out = <ApiClient as ExtractReferenceExpansion>::exctract(rel);
            includes.append(&mut out);
        }
        includes
    }
}

impl ExtractReferenceExpansionFromContext<'_> for ApiClientResults {}
