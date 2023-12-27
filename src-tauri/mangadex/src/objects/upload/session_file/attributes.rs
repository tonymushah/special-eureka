use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::UploadSessionFileAttributes as Attributes;
use mangadex_api_types_rust::UploadSource;

#[derive(Debug, Clone)]
pub struct UploadSessionFileAttributes(Attributes);

impl Deref for UploadSessionFileAttributes {
    type Target = Attributes;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<Attributes> for UploadSessionFileAttributes {
    fn from(value: Attributes) -> Self {
        Self(value)
    }
}

impl From<UploadSessionFileAttributes> for Attributes {
    fn from(value: UploadSessionFileAttributes) -> Self {
        value.0
    }
}

#[Object]
impl UploadSessionFileAttributes {
    pub async fn original_file_name(&self) -> &String {
        &self.original_file_name
    }
    pub async fn file_hash(&self) -> &String {
        &self.file_hash
    }
    pub async fn file_size(&self) -> u32 {
        self.file_size
    }
    pub async fn mime_type(&self) -> &String {
        &self.mime_type
    }
    pub async fn source(&self) -> UploadSource {
        self.source
    }
    pub async fn version(&self) -> u32 {
        self.version
    }
}
