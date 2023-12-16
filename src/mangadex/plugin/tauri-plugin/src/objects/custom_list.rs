use async_graphql::{Context, Object, Result as GraphQLResult};
use mangadex_api_schema_rust::{
    v5::{CustomListAttributes as Attributes, CustomListObject},
    ApiObjectNoRelationships,
};
use uuid::Uuid;

use crate::utils::get_mangadex_client_from_graphql_context;

use self::{attributes::CustomListAttributes, relationships::CustomListRelationships};

pub mod attributes;
pub mod relationships;

#[derive(Clone)]
pub enum CustomList {
    WithRelationship(CustomListObject),
    WithoutRelationship(ApiObjectNoRelationships<Attributes>),
}

impl From<CustomListObject> for CustomList {
    fn from(value: CustomListObject) -> Self {
        Self::WithRelationship(value)
    }
}

impl From<ApiObjectNoRelationships<Attributes>> for CustomList {
    fn from(value: ApiObjectNoRelationships<Attributes>) -> Self {
        Self::WithoutRelationship(value)
    }
}

#[Object]
impl CustomList {
    pub async fn id(&self) -> Uuid {
        match self {
            CustomList::WithRelationship(i) => i.id,
            CustomList::WithoutRelationship(i) => i.id,
        }
    }
    pub async fn attributes(&self) -> CustomListAttributes {
        match self {
            CustomList::WithRelationship(i) => i.attributes.clone().into(),
            CustomList::WithoutRelationship(i) => i.attributes.clone().into(),
        }
    }
    pub async fn relationships(&self, ctx: &Context<'_>) -> GraphQLResult<CustomListRelationships> {
        match self {
            CustomList::WithRelationship(o) => Ok(o.relationships.clone().into()),
            CustomList::WithoutRelationship(o) => {
                let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
                Ok(client
                    .custom_list()
                    .id(o.id)
                    .get()
                    .send()
                    .await?
                    .data
                    .relationships
                    .into())
            }
        }
    }
}
