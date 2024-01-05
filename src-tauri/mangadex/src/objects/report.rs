use std::ops::{Deref, DerefMut};

use async_graphql::Object;
use mangadex_api_schema_rust::v5::{UserReportAttributes, UserReportsObject};
use uuid::Uuid;

use self::{attributes::ReportAttributes, relationship::ReportRelationship};

use super::{GetAttributes, GetId};

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

impl GetId for UserReport {
    fn get_id(&self) -> Uuid {
        self.id
    }
}

impl From<UserReport> for UserReportAttributes {
    fn from(value: UserReport) -> Self {
        value.0.attributes
    }
}

impl From<&UserReport> for UserReportAttributes {
    fn from(value: &UserReport) -> Self {
        value.0.attributes.clone()
    }
}

impl GetAttributes for UserReport {
    type Attributes = ReportAttributes;
    fn get_attributes(&self) -> Self::Attributes {
        Into::<UserReportAttributes>::into(self).into()
    }
}

#[Object]
impl UserReport {
    pub async fn id(&self) -> Uuid {
        self.get_id()
    }
    pub async fn attributes(&self) -> ReportAttributes {
        self.get_attributes()
    }
    pub async fn relationship(&self) -> ReportRelationship {
        self.relationships.clone().into()
    }
}
