use async_graphql::{Context, Object, Result as GraphQLResult};
use mangadex_api::MangaDexClient;
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
    pub async fn secret(&self, ctx: &Context<'_>) -> GraphQLResult<String> {
        let client = ctx.data::<MangaDexClient>()?;
        Ok(client
            .client()
            .id(self.id(ctx).await?)
            .secret()
            .get()
            .send()
            .await?
            .data)
    }
}
