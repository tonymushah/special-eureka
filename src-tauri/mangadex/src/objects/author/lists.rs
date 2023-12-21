use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::{AuthorObject, Results};
use mangadex_api_types_rust::ReferenceExpansionResource;

use crate::objects::{
    ExtractReferenceExpansion, ExtractReferenceExpansionFromContext, ResultsInfo,
};

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

impl ExtractReferenceExpansion<'_> for AuthorResults {
    fn exctract(
        field: async_graphql::SelectionField<'_>,
    ) -> Vec<mangadex_api_types_rust::ReferenceExpansionResource> {
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        if let Some(rel) = field
            .selection_set()
            .find(|f| f.name() == "data")
            .and_then(|pf| pf.selection_set().find(|f| f.name() == "relationships"))
        {
            let mut out = <Author as ExtractReferenceExpansion>::exctract(rel);
            includes.append(&mut out);
        }
        includes.dedup();
        includes
    }
}

impl ExtractReferenceExpansionFromContext<'_> for AuthorResults {}
