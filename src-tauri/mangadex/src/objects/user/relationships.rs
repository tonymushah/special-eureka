use mangadex_api_schema_rust::{
    ApiObject,
    v5::{Relationship, ScanlationGroupAttributes},
};
use mangadex_api_types_rust::{ReferenceExpansionResource, RelationshipType};
use uuid::Uuid;

use std::ops::Deref;

use async_graphql::{Context, Object, Result as GraphQLResult};

use crate::{
    objects::scanlation_group::ScanlationGroup, utils::get_mangadex_client_from_graphql_context,
};

#[derive(Debug, Clone)]
pub struct UserRelationships(pub Vec<Relationship>);

impl Deref for UserRelationships {
    type Target = Vec<Relationship>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<Vec<Relationship>> for UserRelationships {
    fn from(value: Vec<Relationship>) -> Self {
        Self(value)
    }
}

#[Object]
impl UserRelationships {
    pub async fn groups(&self, ctx: &Context<'_>) -> GraphQLResult<Vec<ScanlationGroup>> {
        let group_ids: Vec<Uuid> = self
            .iter()
            .filter(|rel| rel.type_ == RelationshipType::ScanlationGroup)
            .map(|rel| rel.id)
            .collect();
        if group_ids.is_empty() {
            return Ok(Default::default());
        }
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut req = client.scanlation_group().get();
        req.group_ids(group_ids);
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        if let Some(rel_field) = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "relationships")
        {
            rel_field.selection_set().for_each(|f| match f.name() {
                "leader" => {
                    includes.push(ReferenceExpansionResource::Leader);
                }
                "members" => {
                    includes.push(ReferenceExpansionResource::Member);
                }
                _ => {}
            })
        }
        Ok(req
            .includes(includes)
            .send()
            .await?
            .data
            .iter()
            .map(|rel| {
                <ScanlationGroup as From<ApiObject<ScanlationGroupAttributes>>>::from(rel.clone())
            })
            .collect())
    }
}
