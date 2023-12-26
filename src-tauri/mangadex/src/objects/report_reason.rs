pub mod attributes;
pub mod list;

use std::ops::{Deref, DerefMut};

use async_graphql::Object;
use mangadex_api_schema_rust::v5::ReportReasonObject;
use uuid::Uuid;

use self::attributes::ReportReasonAttributes;

#[derive(Debug, Clone)]
pub struct ReportReason(pub ReportReasonObject);

impl From<ReportReasonObject> for ReportReason {
    fn from(value: ReportReasonObject) -> Self {
        Self(value)
    }
}

impl Deref for ReportReason {
    type Target = ReportReasonObject;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ReportReason {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

#[Object]
impl ReportReason {
    pub async fn id(&self) -> Uuid {
        self.id
    }
    pub async fn attributes(&self) -> ReportReasonAttributes {
        self.attributes.clone().into()
    }
}
