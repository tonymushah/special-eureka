use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::upload_session::UploadSessionAttributes as Attributes;
use mangadex_api_types_rust::MangaDexDateTime;

#[derive(Debug, Clone)]
pub struct UploadSessionAttributes(Attributes);

impl Deref for UploadSessionAttributes {
    type Target = Attributes;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<Attributes> for UploadSessionAttributes {
    fn from(value: Attributes) -> Self {
        Self(value)
    }
}

impl From<UploadSessionAttributes> for Attributes {
    fn from(value: UploadSessionAttributes) -> Self {
        value.0
    }
}

#[Object]
impl UploadSessionAttributes {
    pub async fn is_committed(&self) -> bool {
        self.is_committed
    }
    pub async fn is_processed(&self) -> bool {
        self.is_processed
    }
    pub async fn is_deleted(&self) -> bool {
        self.is_deleted
    }
    pub async fn version(&self) -> u32 {
        self.version
    }
    pub async fn created_at(&self) -> MangaDexDateTime {
        self.created_at
    }
    pub async fn updated_at(&self) -> MangaDexDateTime {
        self.updated_at
    }
}
