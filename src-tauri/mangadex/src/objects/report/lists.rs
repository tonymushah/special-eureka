use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::UserReportsCollection;
use mangadex_api_types_rust::ReferenceExpansionResource;

use crate::objects::{
    ExtractReferenceExpansion, ExtractReferenceExpansionFromContext, ResultsInfo,
};

use super::{UserReport, relationship::ReportRelationship};

#[derive(Debug, Clone, SimpleObject)]
pub struct UserReportResults {
    pub data: Vec<UserReport>,
    #[graphql(flatten)]
    pub info: ResultsInfo,
}

impl From<UserReportsCollection> for UserReportResults {
    fn from(value: UserReportsCollection) -> Self {
        let info: ResultsInfo = (&value).into();
        Self {
            data: value
                .data
                .into_iter()
                .map(|o| -> UserReport { o.into() })
                .collect(),
            info,
        }
    }
}

impl ExtractReferenceExpansion<'_> for UserReportResults {
    fn exctract(field: async_graphql::SelectionField<'_>) -> Vec<ReferenceExpansionResource> {
        if let Some(rel) = field
            .selection_set()
            .find(|f| f.name() == "data")
            .and_then(|f| f.selection_set().find(|f_| f_.name() == "relationship"))
        {
            <ReportRelationship as ExtractReferenceExpansion>::exctract(rel)
        } else {
            Vec::new()
        }
    }
}

impl ExtractReferenceExpansionFromContext<'_> for UserReportResults {}
