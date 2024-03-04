use async_graphql::{Context, Object, Result as GraphQLResult};
use mangadex_api_schema_rust::{
    v5::{CustomListAttributes as Attributes, CustomListObject},
    ApiObjectNoRelationships,
};
use uuid::Uuid;

use crate::utils::get_mangadex_client_from_graphql_context;

use self::{attributes::CustomListAttributes, relationships::CustomListRelationships};

use super::{GetAttributes, GetId};

pub mod attributes;
pub mod lists;
pub mod relationships;
pub mod seasonal;
pub mod staff_picks;

#[derive(Clone, Debug)]
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

impl GetId for CustomList {
    fn get_id(&self) -> Uuid {
        match self {
            CustomList::WithRelationship(i) => i.id,
            CustomList::WithoutRelationship(i) => i.id,
        }
    }
}

impl From<CustomList> for Attributes {
    fn from(value: CustomList) -> Self {
        match value {
            CustomList::WithRelationship(i) => i.attributes,
            CustomList::WithoutRelationship(i) => i.attributes,
        }
    }
}

impl From<&CustomList> for Attributes {
    fn from(value: &CustomList) -> Self {
        match value {
            CustomList::WithRelationship(i) => i.attributes.clone(),
            CustomList::WithoutRelationship(i) => i.attributes.clone(),
        }
    }
}

impl GetAttributes for CustomList {
    type Attributes = CustomListAttributes;
    fn get_attributes(&self) -> Self::Attributes {
        Into::<Attributes>::into(self).into()
    }
}

#[Object]
impl CustomList {
    pub async fn id(&self) -> Uuid {
        self.get_id()
    }
    pub async fn attributes(&self) -> CustomListAttributes {
        self.get_attributes()
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
