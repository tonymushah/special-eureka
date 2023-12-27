pub mod attributes;

use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::UploadSessionObject;
use uuid::Uuid;

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

#[Object]
impl UploadSession {
    pub async fn id(&self) -> Uuid {
        self.id
    }
    pub async fn attributes(&self) -> UploadSessionAttributes {
        self.attributes.into()
    }
}
