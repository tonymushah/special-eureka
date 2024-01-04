use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::ApiClientAttributes as Attributes;
use mangadex_api_types_rust::{ApiClientProfile, ApiClientState, MangaDexDateTime};

#[derive(Clone, Debug)]
pub struct ApiClientAttributes(Attributes);

impl Deref for ApiClientAttributes {
    type Target = Attributes;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<Attributes> for ApiClientAttributes {
    fn from(value: Attributes) -> Self {
        Self(value)
    }
}

#[Object]
impl ApiClientAttributes {
    pub async fn name(&self) -> &String {
        &self.name
    }
    pub async fn description(&self) -> Option<&String> {
        self.description.as_ref()
    }
    pub async fn profile(&self) -> ApiClientProfile {
        self.profile
    }
    pub async fn external_client_id(&self) -> Option<&String> {
        self.external_client_id.as_ref()
    }
    pub async fn is_active(&self) -> bool {
        self.is_active
    }
    pub async fn state(&self) -> ApiClientState {
        self.state
    }
    pub async fn created_at(&self) -> MangaDexDateTime {
        self.created_at
    }
    pub async fn updated_at(&self) -> MangaDexDateTime {
        self.updated_at
    }
    pub async fn version(&self) -> u32 {
        self.version
    }
}
