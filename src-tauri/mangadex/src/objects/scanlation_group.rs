use async_graphql::{Context, Object};
use mangadex_api_schema_rust::{
    ApiObjectNoRelationships,
    v5::{GroupObject, ScanlationGroupAttributes as Attributes},
};
use mangadex_api_types_rust::ReferenceExpansionResource;
use tokio::task::spawn_blocking;
use uuid::Uuid;

use crate::utils::{
    get_mangadex_client_from_graphql_context,
    traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
};

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
#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl ScanlationGroup {
    pub async fn id(&self) -> Uuid {
        self.get_id()
    }
    pub async fn attributes(&self) -> ScanlationGroupAttributes {
        self.get_attributes()
    }

    pub async fn is_blocked(&self, ctx: &Context<'_>) -> crate::error::wrapped::Result<bool> {
        let id = self.get_id();
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        Ok(spawn_blocking(move || -> crate::Result<_> {
            use diesel::prelude::*;
            use mangadex_blacklist_raw::schema::scanlation_groups::dsl::*;

            let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;

            Ok(diesel::select(diesel::dsl::exists(
                scanlation_groups.filter(group_id.eq(id.as_bytes())),
            ))
            .get_result(&mut connection)?)
        })
        .await??)
    }
    pub async fn relationships(
        &self,
        ctx: &Context<'_>,
    ) -> Result<ScanlationGroupRelationships, crate::ErrorWrapper> {
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
