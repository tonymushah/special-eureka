use std::ops::Deref;

use async_graphql::{Context, Error as GraphQLError, Object, Result as GraphQLResult};
use mangadex_api_schema_rust::{
    v5::{MangaAttributes, Relationship},
    ApiObject,
};
use mangadex_api_types_rust::{ReferenceExpansionResource, RelationshipType};
use uuid::Uuid;

use crate::{
    objects::{manga::MangaObject, user::User, ExtractReferenceExpansion},
    utils::get_mangadex_client_from_graphql_context,
};

#[derive(Debug, Clone)]
pub struct CustomListRelationships(pub Vec<Relationship>);

impl From<Vec<Relationship>> for CustomListRelationships {
    fn from(value: Vec<Relationship>) -> Self {
        Self(value)
    }
}

impl Deref for CustomListRelationships {
    type Target = Vec<Relationship>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[Object]
impl CustomListRelationships {
    pub async fn titles(&self, ctx: &Context<'_>) -> GraphQLResult<Vec<MangaObject>> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut req = client.manga().get();
        req.manga_ids(
            self.iter()
                .filter(|e| e.type_ == RelationshipType::Manga)
                .map(|rel| rel.id)
                .collect::<Vec<Uuid>>(),
        );
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        ctx.field()
            .selection_set()
            .find(|f| f.name() == "relationships")
            .and_then(|f| {
                let mut out = <MangaObject as ExtractReferenceExpansion>::exctract(f);
                includes.append(&mut out);
                None::<()>
            });
        includes.dedup();
        Ok(req
            .includes(includes)
            .send()
            .await?
            .data
            .iter()
            .map(|d| <MangaObject as From<ApiObject<MangaAttributes>>>::from(d.clone()))
            .collect::<Vec<MangaObject>>())
    }
    pub async fn user(&self, ctx: &Context<'_>) -> GraphQLResult<User> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let id = self
            .iter()
            .find(|e| e.type_ == RelationshipType::Creator || e.type_ == RelationshipType::User)
            .map(|rel| rel.id)
            .ok_or(GraphQLError::new("Related Uploader or User not found"))?;
        let req = client.user().id(id).get();
        Ok(req.send().await?.data.into())
    }
}
