pub mod attributes;

use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::{
    upload_session::UploadSessionAttributes as Attributes, UploadSessionObject,
};
use uuid::Uuid;

use crate::objects::{GetAttributes, GetId};

use self::attributes::UploadSessionAttributes;

#[derive(Debug, Clone)]
pub struct UploadSession(UploadSessionObject);

impl Deref for UploadSession {
    type Target = UploadSessionObject;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<UploadSessionObject> for UploadSession {
    fn from(value: UploadSessionObject) -> Self {
        Self(value)
    }
}

impl From<UploadSession> for UploadSessionObject {
    fn from(value: UploadSession) -> Self {
        value.0
    }
}

impl GetId for UploadSession {
    fn get_id(&self) -> Uuid {
        self.id
    }
}

impl From<UploadSession> for Attributes {
    fn from(value: UploadSession) -> Self {
        value.0.attributes
    }
}

impl From<&UploadSession> for Attributes {
    fn from(value: &UploadSession) -> Self {
        value.attributes
    }
}

impl GetAttributes for UploadSession {
    type Attributes = UploadSessionAttributes;
    fn get_attributes(&self) -> Self::Attributes {
        Into::<Attributes>::into(self).into()
    }
}

#[Object]
impl UploadSession {
    pub async fn id(&self) -> Uuid {
        self.get_id()
    }
    pub async fn attributes(&self) -> UploadSessionAttributes {
        self.get_attributes()
    }
}
