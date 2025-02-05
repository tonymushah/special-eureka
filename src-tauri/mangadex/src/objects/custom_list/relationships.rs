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
    query::user_option::UserOptionQueries,
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
    pub async fn titles_ids(&self) -> Vec<Uuid> {
        self.iter()
            .filter(|e| e.type_ == RelationshipType::Manga)
            .map(|rel| rel.id)
            .collect::<Vec<Uuid>>()
    }
    pub async fn titles(
        &self,
        ctx: &Context<'_>,
        offset: Option<u32>,
        limit: Option<u32>,
    ) -> GraphQLResult<Vec<MangaObject>> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut req = client.manga().get();
        let manga_ids = self.titles_ids(ctx).await?;
        let manga_len: u32 = manga_ids.len().try_into()?;
        req.manga_ids(manga_ids);
        if let Some(o) = offset {
            req.offset(o);
        }
        if let Some(l) = limit {
            req.limit(l);
        } else {
            req.limit(manga_len);
        }
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
        let content_profile = UserOptionQueries.get_default_content_profile(ctx).await?;
        Ok(req
            .includes(includes)
            .send()
            .await?
            .data
            .iter()
            .filter(|data| {
                if !content_profile.is_empty() {
                    let attributes = &data.attributes;

                    (!content_profile.content_rating.is_empty()
                        && content_profile.content_rating.contains(
                            &attributes
                                .content_rating
                                .unwrap_or(mangadex_api_types_rust::ContentRating::Safe),
                        ))
                        || (!content_profile.excluded_original_language.is_empty()
                            && !content_profile
                                .excluded_original_language
                                .contains(&attributes.original_language))
                        || (!content_profile.excluded_tags.is_empty()
                            && !content_profile
                                .excluded_tags
                                .iter()
                                .any(|i| attributes.tags.iter().any(|t| t.id == *i)))
                        || (!content_profile.publication_demographic.is_empty()
                            && attributes
                                .publication_demographic
                                .iter()
                                .any(|d| content_profile.publication_demographic.contains(d)))
                        || (!content_profile.status.is_empty()
                            && content_profile.status.contains(&attributes.status))
                        || (!content_profile.translated_languages.is_empty()
                            && attributes
                                .available_translated_languages
                                .iter()
                                .any(|lang| content_profile.translated_languages.contains(lang)))
                } else {
                    true
                }
            })
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
