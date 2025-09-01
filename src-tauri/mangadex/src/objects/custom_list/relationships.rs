use std::ops::Deref;

use async_graphql::{Context, Error as GraphQLError, Object, Result as GraphQLResult};
use mangadex_api_schema_rust::{
    ApiObject,
    v5::{MangaAttributes, Relationship},
};
use mangadex_api_types_rust::{ReferenceExpansionResource, RelationshipType, TagSearchMode};
use uuid::Uuid;

use crate::{
    objects::{ExtractReferenceExpansion, manga::MangaObject, user::User},
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

                    let content_rating = if !content_profile.content_rating.is_empty() {
                        content_profile.content_rating.contains(
                            &attributes
                                .content_rating
                                .unwrap_or(mangadex_api_types_rust::ContentRating::Safe),
                        )
                    } else {
                        false
                    };

                    let excluded_original_languages =
                        if !content_profile.excluded_original_language.is_empty() {
                            !content_profile
                                .excluded_original_language
                                .contains(&attributes.original_language)
                        } else {
                            true
                        };

                    let excluded_tags = if !content_profile.excluded_tags.is_empty() {
                        match content_profile
                            .excluded_tags_mode
                            .unwrap_or(TagSearchMode::Or)
                        {
                            TagSearchMode::Or => !content_profile
                                .excluded_tags
                                .iter()
                                .any(|i| attributes.tags.iter().any(|t| t.id == *i)),
                            TagSearchMode::And => !attributes
                                .tags
                                .iter()
                                .filter(|t| content_profile.excluded_tags.contains(&t.id))
                                .all(|t| content_profile.excluded_tags.contains(&t.id)),
                        }
                    } else {
                        true
                    };

                    let publication_demographic =
                        if !content_profile.publication_demographic.is_empty() {
                            attributes
                                .publication_demographic
                                .iter()
                                .any(|d| content_profile.publication_demographic.contains(d))
                        } else {
                            true
                        };

                    let status = if !content_profile.status.is_empty() {
                        content_profile.status.contains(&attributes.status)
                    } else {
                        true
                    };

                    let translated_languages = {
                        if !content_profile.translated_languages.is_empty() {
                            attributes
                                .available_translated_languages
                                .iter()
                                .filter(|lang| content_profile.translated_languages.contains(*lang))
                                .all(|lang| content_profile.translated_languages.contains(lang))
                        } else {
                            true
                        }
                    };

                    let original_languages = {
                        if !content_profile.original_languages.is_empty() {
                            content_profile
                                .original_languages
                                .contains(&attributes.original_language)
                        } else {
                            true
                        }
                    };

                    let included_tags = if !content_profile.included_tags.is_empty() {
                        match content_profile
                            .included_tags_mode
                            .unwrap_or(TagSearchMode::And)
                        {
                            TagSearchMode::Or => content_profile
                                .included_tags
                                .iter()
                                .any(|i| attributes.tags.iter().any(|t| t.id == *i)),
                            TagSearchMode::And => attributes
                                .tags
                                .iter()
                                .filter(|t| content_profile.included_tags.contains(&t.id))
                                .all(|t| content_profile.included_tags.contains(&t.id)),
                        }
                    } else {
                        true
                    };

                    content_rating
                        && excluded_original_languages
                        && excluded_tags
                        && publication_demographic
                        && status
                        && translated_languages
                        && included_tags
                        && original_languages
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
