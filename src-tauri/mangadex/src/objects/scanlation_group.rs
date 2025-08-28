use async_graphql::{Context, Object, Result as GraphQLResult};
use mangadex_api_schema_rust::{
    ApiObjectNoRelationships,
    v5::{GroupObject, ScanlationGroupAttributes as Attributes},
};
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::utils::get_mangadex_client_from_graphql_context;

use self::{attributes::ScanlationGroupAttributes, relationships::ScanlationGroupRelationships};

use super::{
    ExtractReferenceExpansion, ExtractReferenceExpansionFromContext, GetAttributes, GetId,
};

pub mod attributes;
pub mod lists;
pub mod relationships;

#[derive(Clone, Debug)]
pub enum ScanlationGroup {
    WithRelationship(Box<GroupObject>),
    WithoutRelationship(Box<ApiObjectNoRelationships<Attributes>>),
}

impl From<GroupObject> for ScanlationGroup {
    fn from(value: GroupObject) -> Self {
        ScanlationGroup::WithRelationship(Box::new(value))
    }
}

impl From<ApiObjectNoRelationships<Attributes>> for ScanlationGroup {
    fn from(value: ApiObjectNoRelationships<Attributes>) -> Self {
        Self::WithoutRelationship(Box::new(value))
    }
}

impl GetId for ScanlationGroup {
    fn get_id(&self) -> Uuid {
        match self {
            ScanlationGroup::WithRelationship(i) => i.id,
            ScanlationGroup::WithoutRelationship(i) => i.id,
        }
    }
}

impl From<ScanlationGroup> for Attributes {
    fn from(value: ScanlationGroup) -> Self {
        match value {
            ScanlationGroup::WithRelationship(i) => i.attributes,
            ScanlationGroup::WithoutRelationship(i) => i.attributes,
        }
    }
}

impl From<&ScanlationGroup> for Attributes {
    fn from(value: &ScanlationGroup) -> Self {
        match value {
            ScanlationGroup::WithRelationship(i) => i.attributes.clone(),
            ScanlationGroup::WithoutRelationship(i) => i.attributes.clone(),
        }
    }
}

impl GetAttributes for ScanlationGroup {
    type Attributes = ScanlationGroupAttributes;
    fn get_attributes(&self) -> Self::Attributes {
        Into::<Attributes>::into(self).into()
    }
}

#[Object]
impl ScanlationGroup {
    pub async fn id(&self) -> Uuid {
        self.get_id()
    }
    pub async fn attributes(&self) -> ScanlationGroupAttributes {
        self.get_attributes()
    }
    pub async fn relationships(
        &self,
        ctx: &Context<'_>,
    ) -> GraphQLResult<ScanlationGroupRelationships> {
        match self {
            ScanlationGroup::WithRelationship(o) => Ok(o.relationships.clone().into()),
            ScanlationGroup::WithoutRelationship(o) => {
                let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
                let mut req = client.scanlation_group().id(o.id).get();
                let includes = <Self as ExtractReferenceExpansionFromContext>::exctract(ctx);
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
}

impl ExtractReferenceExpansion<'_> for ScanlationGroup {
    fn exctract(field: async_graphql::SelectionField<'_>) -> Vec<ReferenceExpansionResource> {
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        field.selection_set().for_each(|f| match f.name() {
            "leader" => {
                includes.push(ReferenceExpansionResource::Leader);
            }
            "members" => {
                includes.push(ReferenceExpansionResource::Member);
            }
            _ => {}
        });
        includes
    }
}

impl ExtractReferenceExpansionFromContext<'_> for ScanlationGroup {}
