use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::CoverAttributes as Attributes;
use mangadex_api_types_rust::{Language, MangaDexDateTime};

#[derive(Clone, Debug)]
pub struct CoverAttributes(Attributes);

impl From<Attributes> for CoverAttributes {
    fn from(value: Attributes) -> Self {
        Self(value)
    }
}

impl From<CoverAttributes> for Attributes {
    fn from(value: CoverAttributes) -> Self {
        value.0
    }
}

impl Deref for CoverAttributes {
    type Target = Attributes;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[Object]
impl CoverAttributes {
    pub async fn description(&self) -> &String {
        &self.description
    }
    pub async fn locale(&self) -> Option<Language> {
        self.locale
    }
    pub async fn volume(&self) -> Option<&String> {
        self.volume.as_ref()
    }
    pub async fn file_name(&self) -> &String {
        &self.file_name
    }
    pub async fn created_at(&self) -> MangaDexDateTime {
        self.created_at
    }
    pub async fn updated_at(&self) -> Option<MangaDexDateTime> {
        self.updated_at
    }
    pub async fn version(&self) -> u32 {
        self.version
    }
}
