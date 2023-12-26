use std::ops::{Deref, DerefMut};

use async_graphql::Object;
use mangadex_api_schema_rust::v5::UserReportAttributes as Attributes;
use mangadex_api_types_rust::{MangaDexDateTime, ReportStatus};

#[derive(Debug, Clone)]
pub struct ReportAttributes(Attributes);

impl Deref for ReportAttributes {
    type Target = Attributes;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ReportAttributes {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<Attributes> for ReportAttributes {
    fn from(value: Attributes) -> Self {
        Self(value)
    }
}

impl From<ReportAttributes> for Attributes {
    fn from(value: ReportAttributes) -> Self {
        value.0
    }
}

#[Object]
impl ReportAttributes {
    pub async fn details(&self) -> &String {
        &self.details
    }
    pub async fn object_id(&self) -> &String {
        &self.object_id
    }
    pub async fn status(&self) -> ReportStatus {
        self.status
    }
    pub async fn created_at(&self) -> MangaDexDateTime {
        self.created_at
    }
}
