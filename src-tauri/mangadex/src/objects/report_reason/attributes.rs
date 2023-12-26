use std::ops::{Deref, DerefMut};

use async_graphql::Object;
use mangadex_api_schema_rust::v5::{LocalizedString, ReportReasonAttributes as Attributes};
use mangadex_api_types_rust::ReportCategory;

#[derive(Debug, Clone)]
pub struct ReportReasonAttributes(Attributes);

impl Deref for ReportReasonAttributes {
    type Target = Attributes;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ReportReasonAttributes {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<Attributes> for ReportReasonAttributes {
    fn from(value: Attributes) -> Self {
        Self(value)
    }
}

impl From<ReportReasonAttributes> for Attributes {
    fn from(value: ReportReasonAttributes) -> Self {
        value.0
    }
}

#[Object]
impl ReportReasonAttributes {
    pub async fn reason(&self) -> &LocalizedString {
        &self.reason
    }
    pub async fn details_required(&self) -> bool {
        self.details_required
    }
    pub async fn category(&self) -> ReportCategory {
        self.category
    }
    pub async fn version(&self) -> u32 {
        self.version
    }
}
