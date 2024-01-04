pub mod attributes;

use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::{
    UploadSessionFileAttributes as Attributes, UploadSessionFileObject,
};
use uuid::Uuid;

use crate::objects::{GetAttributes, GetId};

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

impl GetId for UploadSessionFile {
    fn get_id(&self) -> Uuid {
        self.id
    }
}

impl From<UploadSessionFile> for Attributes {
    fn from(value: UploadSessionFile) -> Self {
        value.attributes.clone()
    }
}

impl From<&UploadSessionFile> for Attributes {
    fn from(value: &UploadSessionFile) -> Self {
        value.attributes.clone()
    }
}

impl GetAttributes for UploadSessionFile {
    type Attributes = UploadSessionFileAttributes;
    fn get_attributes(&self) -> Self::Attributes {
        Into::<Attributes>::into(self).into()
    }
}

#[Object]
impl UploadSessionFile {
    pub async fn id(&self) -> Uuid {
        self.get_id()
    }
    pub async fn attributes(&self) -> UploadSessionFileAttributes {
        self.get_attributes()
    }
}
