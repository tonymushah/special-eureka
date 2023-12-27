pub mod attributes;

use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::UploadSessionFileObject;
use uuid::Uuid;

use self::attributes::UploadSessionFileAttributes;

#[derive(Debug, Clone)]
pub struct UploadSessionFile(UploadSessionFileObject);

impl Deref for UploadSessionFile {
    type Target = UploadSessionFileObject;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<UploadSessionFileObject> for UploadSessionFile {
    fn from(value: UploadSessionFileObject) -> Self {
        Self(value)
    }
}

impl From<UploadSessionFile> for UploadSessionFileObject {
    fn from(value: UploadSessionFile) -> Self {
        value.0
    }
}

#[Object]
impl UploadSessionFile {
    pub async fn id(&self) -> Uuid {
        self.id
    }
    pub async fn attributes(&self) -> UploadSessionFileAttributes {
        self.attributes.clone().into()
    }
}
