use async_graphql::Object;
use mangadex_api_schema_rust::{
    v5::{ApiClientAttributes as Attributes, ApiClientObject as ApiClientData},
    ApiObjectNoRelationships,
};
use uuid::Uuid;

use self::attributes::ApiClientAttributes;

pub mod attributes;

#[derive(Clone)]
pub enum ApiClient {
    WithRelationship(ApiClientData),
    WithoutRelationship(ApiObjectNoRelationships<Attributes>),
}

impl From<ApiClientData> for ApiClient {
    fn from(value: ApiClientData) -> Self {
        Self::WithRelationship(value)
    }
}

impl From<ApiObjectNoRelationships<Attributes>> for ApiClient {
    fn from(value: ApiObjectNoRelationships<Attributes>) -> Self {
        Self::WithoutRelationship(value)
    }
}

#[Object]
impl ApiClient {
    pub async fn id(&self) -> Uuid {
        match self {
            ApiClient::WithRelationship(i) => i.id,
            ApiClient::WithoutRelationship(i) => i.id,
        }
    }
    pub async fn attributes(&self) -> ApiClientAttributes {
        match self {
            ApiClient::WithRelationship(i) => i.attributes.clone().into(),
            ApiClient::WithoutRelationship(i) => i.attributes.clone().into(),
        }
    }
}
