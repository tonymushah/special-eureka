use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::IdMappindCollection;

use crate::objects::ResultsInfo;

use super::LegacyIdMapping;

#[derive(Debug, Clone, SimpleObject)]
pub struct LegacyIdMappingResults {
    pub data: Vec<LegacyIdMapping>,
    #[graphql(flatten)]
    pub info: ResultsInfo,
}

impl From<IdMappindCollection> for LegacyIdMappingResults {
    fn from(value: IdMappindCollection) -> Self {
        let info: ResultsInfo = (&value).into();
        Self {
            data: value
                .data
                .into_iter()
                .map(|i| -> LegacyIdMapping { i.into() })
                .collect(),
            info,
        }
    }
}
