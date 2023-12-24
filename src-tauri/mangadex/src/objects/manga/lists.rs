use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::{MangaObject, Results};
use mangadex_api_types_rust::ReferenceExpansionResource;

use crate::objects::{
    ExtractReferenceExpansion, ExtractReferenceExpansionFromContext, ResultsInfo,
};

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

impl ExtractReferenceExpansion<'_> for MangaResults {
    fn exctract(
        field: async_graphql::SelectionField<'_>,
    ) -> Vec<mangadex_api_types_rust::ReferenceExpansionResource> {
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        if let Some(rel) = field
            .selection_set()
            .find(|f| f.name() == "data")
            .and_then(|pf| pf.selection_set().find(|f| f.name() == "relationships"))
        {
            let mut out = <Manga as ExtractReferenceExpansion>::exctract(rel);
            includes.append(&mut out);
        }
        includes.dedup();
        includes
    }
}

impl ExtractReferenceExpansionFromContext<'_> for MangaResults {}
