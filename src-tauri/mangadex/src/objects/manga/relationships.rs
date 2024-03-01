use async_graphql::{Error as GraphQLError, Object, Result as GraphQLResult};
use mangadex_api_schema_rust::{
    v5::{
        AuthorAttributes, CoverAttributes, MangaAttributes as Attributes, RelatedAttributes,
        Relationship, UserAttributes,
    },
    ApiObjectNoRelationships,
};
use mangadex_api_types_rust::{error::RelationshipConversionError, RelationshipType};
use uuid::Uuid;

use crate::objects::{author::Author, cover::Cover, manga::MangaObject, user::User};

use super::related::MangaRelated;

#[derive(Clone, Debug)]
pub struct MangaRelationships {
    pub id: Uuid,
    pub relationships: Vec<Relationship>,
}

#[Object]
impl MangaRelationships {
    pub async fn manga(&self) -> Vec<MangaRelated> {
        self.relationships
            .iter()
            .flat_map(
                |i| -> Result<
                    MangaRelated,
                    <ApiObjectNoRelationships<Attributes> as TryFrom<Relationship>>::Error,
                > {
                    let rel =
                        <ApiObjectNoRelationships<Attributes> as TryFrom<Relationship>>::try_from(
                            i.clone(),
                        )?;
                    Ok(MangaRelated {
                        id: rel.id,
                        related: i.related.ok_or(
                            RelationshipConversionError::AttributesNotFound(
                                mangadex_api_types_rust::RelationshipType::MangaRelation,
                            ),
                        )?,
                        obj: MangaObject::WithoutRel(rel),
                    })
                },
            )
            .collect::<Vec<MangaRelated>>()
    }
    pub async fn cover_art(&self) -> GraphQLResult<Cover> {
        let rel: ApiObjectNoRelationships<CoverAttributes> = self
            .relationships
            .iter()
            .find(|r| r.type_ == RelationshipType::CoverArt)
            .ok_or(GraphQLError::new("Cover Art Not Found"))?
            .clone()
            .try_into()?;
        Ok(Cover::WithoutRelationship(rel))
    }
    pub async fn authors(&self) -> Vec<Author> {
        self.relationships
            .iter()
            .filter(|rel| rel.type_ == RelationshipType::Author)
            .flat_map(|value| {
                if let Some(RelatedAttributes::Author(attributes)) = &value.attributes {
                    Ok(ApiObjectNoRelationships {
                        id: value.id,
                        type_: RelationshipType::Author,
                        attributes: attributes.clone(),
                    })
                } else {
                    Err(RelationshipConversionError::AttributesNotFound(
                        RelationshipType::Author,
                    ))
                }
            })
            .map(<Author as From<ApiObjectNoRelationships<AuthorAttributes>>>::from)
            .collect::<Vec<Author>>()
    }
    pub async fn artists(&self) -> Vec<Author> {
        self.relationships
            .iter()
            .filter(|rel| rel.type_ == RelationshipType::Artist)
            .flat_map(
                |value| -> Result<
                    ApiObjectNoRelationships<AuthorAttributes>,
                    RelationshipConversionError,
                > {
                    if let Some(RelatedAttributes::Author(attributes)) = &value.attributes {
                        Ok(ApiObjectNoRelationships {
                            id: value.id,
                            type_: RelationshipType::Author,
                            attributes: attributes.clone(),
                        })
                    } else {
                        Err(RelationshipConversionError::AttributesNotFound(
                            RelationshipType::Author,
                        ))
                    }
                },
            )
            .map(<Author as From<ApiObjectNoRelationships<AuthorAttributes>>>::from)
            .collect::<Vec<Author>>()
    }
    pub async fn author_artists(&self) -> Vec<Author> {
        let mut getted = self
            .relationships
            .iter()
            .filter(|rel| {
                rel.type_ == RelationshipType::Artist || rel.type_ == RelationshipType::Author
            })
            .flat_map(
                |value| -> Result<
                    ApiObjectNoRelationships<AuthorAttributes>,
                    RelationshipConversionError,
                > {
                    if let Some(RelatedAttributes::Author(attributes)) = &value.attributes {
                        Ok(ApiObjectNoRelationships {
                            id: value.id,
                            type_: RelationshipType::Author,
                            attributes: attributes.clone(),
                        })
                    } else {
                        Err(RelationshipConversionError::AttributesNotFound(
                            RelationshipType::Author,
                        ))
                    }
                },
            )
            .collect::<Vec<ApiObjectNoRelationships<AuthorAttributes>>>();
        getted.dedup_by(|a, b| a.id == b.id);
        getted
            .iter()
            .map(|e| <Author as From<ApiObjectNoRelationships<AuthorAttributes>>>::from(e.clone()))
            .collect::<Vec<Author>>()
    }
    pub async fn creator(&self) -> Option<User> {
        self.relationships
            .iter()
            .find(|e| e.type_ == RelationshipType::Creator || e.type_ == RelationshipType::User)
            .map(
                |value| -> Result<
                    ApiObjectNoRelationships<UserAttributes>,
                    RelationshipConversionError,
                > {
                    if let Some(RelatedAttributes::User(ref attributes)) = value.attributes {
                        Ok(ApiObjectNoRelationships {
                            id: value.id,
                            type_: RelationshipType::User,
                            attributes: attributes.clone(),
                        })
                    } else {
                        Err(RelationshipConversionError::AttributesNotFound(
                            RelationshipType::User,
                        ))
                    }
                },
            )
            .and_then(|inner| inner.ok())
            .map(<User as From<ApiObjectNoRelationships<UserAttributes>>>::from)
    }
}
