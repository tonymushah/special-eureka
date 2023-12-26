use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::ReportReasonCollection;

use crate::objects::ResultsInfo;

use super::ReportReason;

#[derive(Clone, Debug, SimpleObject)]
pub struct ReportReasonResults {
    pub data: Vec<ReportReason>,
    #[graphql(flatten)]
    pub info: ResultsInfo,
}

impl From<ReportReasonCollection> for ReportReasonResults {
    fn from(value: ReportReasonCollection) -> Self {
        let info: ResultsInfo = (&value).into();
        Self {
            data: value
                .data
                .into_iter()
                .map(|o| -> ReportReason { o.into() })
                .collect(),
            info,
        }
    }
}
