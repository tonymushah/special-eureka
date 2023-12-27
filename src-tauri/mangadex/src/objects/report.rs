use std::ops::{Deref, DerefMut};

use async_graphql::Object;
use mangadex_api_schema_rust::v5::UserReportsObject;
use uuid::Uuid;

use self::{attributes::ReportAttributes, relationship::ReportRelationship};

pub mod attributes;
pub mod lists;
pub mod relationship;

#[derive(Debug, Clone)]
pub struct UserReport(UserReportsObject);

impl Deref for UserReport {
    type Target = UserReportsObject;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for UserReport {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<UserReportsObject> for UserReport {
    fn from(value: UserReportsObject) -> Self {
        UserReport(value)
    }
}

#[Object]
impl UserReport {
    pub async fn id(&self) -> Uuid {
        self.id
    }
    pub async fn attributes(&self) -> ReportAttributes {
        self.attributes.clone().into()
    }
    pub async fn relationship(&self) -> ReportRelationship {
        self.relationships.clone().into()
    }
}
