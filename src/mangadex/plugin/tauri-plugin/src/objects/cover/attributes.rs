use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::CoverAttributes as Attributes;
use mangadex_api_types_rust::{Language, MangaDexDateTime};

pub struct CoverAttributes(Attributes);

impl From<Attributes> for CoverAttributes {
    fn from(value: Attributes) -> Self {
        Self(value)
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
    async fn description(&self) -> &String {
        &self.description
    }
    async fn locale(&self) -> Option<Language> {
        self.locale
    }
    async fn volume(&self) -> Option<&String> {
        self.volume.as_ref()
    }
    async fn file_name(&self) -> &String {
        &self.file_name
    }
    async fn created_at(&self) -> MangaDexDateTime {
        self.created_at
    }
    async fn updated_at(&self) -> Option<MangaDexDateTime> {
        self.updated_at
    }
    async fn version(&self) -> u32 {
        self.version
    }
}
