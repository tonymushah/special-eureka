use async_graphql::{Context, Object, Result as GraphQLResult};
use mangadex_api_schema_rust::{
    v5::{ApiClientAttributes as Attributes, ApiClientObject as ApiClientData},
    ApiObjectNoRelationships,
};
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::utils::get_mangadex_client_from_graphql_context_with_auth_refresh;

use self::{attributes::ApiClientAttributes, relationships::ApiClientRelationships};

use super::{
    ExtractReferenceExpansion, ExtractReferenceExpansionFromContext, GetAttributes, GetId,
};

pub mod attributes;
pub mod lists;
pub mod relationships;

#[derive(Clone, Debug)]
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

impl GetAttributes for ApiClient {
    type Attributes = ApiClientAttributes;
    fn get_attributes(&self) -> Self::Attributes {
        match self {
            ApiClient::WithRelationship(i) => i.attributes.clone().into(),
            ApiClient::WithoutRelationship(i) => i.attributes.clone().into(),
        }
    }
}

impl GetId for ApiClient {
    fn get_id(&self) -> Uuid {
        match self {
            ApiClient::WithRelationship(i) => i.id,
            ApiClient::WithoutRelationship(i) => i.id,
        }
    }
}

#[Object]
impl ApiClient {
    pub async fn id(&self) -> Uuid {
        self.get_id()
    }
    pub async fn attributes(&self) -> ApiClientAttributes {
        self.get_attributes()
    }
    pub async fn relationships(&self, ctx: &Context<'_>) -> GraphQLResult<ApiClientRelationships> {
        match self {
            ApiClient::WithRelationship(o) => Ok(o.relationships.clone().into()),
            ApiClient::WithoutRelationship(o) => {
                let client =
                    get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx)
                        .await?;
                let mut req = client.client().id(o.id).get();
                let mut includes: Vec<ReferenceExpansionResource> =
                    <Self as ExtractReferenceExpansionFromContext>::exctract(ctx);
                includes.dedup();
                Ok(req
                    .includes(includes)
                    .send()
                    .await?
                    .data
                    .relationships
                    .into())
            }
        }
    }
    pub async fn secret(&self, ctx: &Context<'_>) -> GraphQLResult<String> {
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
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

impl ExtractReferenceExpansion<'_> for ApiClient {
    fn exctract(field: async_graphql::SelectionField<'_>) -> Vec<ReferenceExpansionResource> {
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        field.selection_set().for_each(|f| {
            if f.name() == "creator" {
                includes.push(ReferenceExpansionResource::Creator);
            }
        });
        includes
    }
}

impl ExtractReferenceExpansionFromContext<'_> for ApiClient {}
