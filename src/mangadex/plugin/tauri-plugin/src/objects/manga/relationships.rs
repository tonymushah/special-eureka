use async_graphql::{Error as GraphQLError, Object, Result as GraphQLResult};
use mangadex_api_schema_rust::{
    v5::{CoverAttributes, MangaAttributes as Attributes, Relationship},
    ApiObjectNoRelationships,
};
use mangadex_api_types_rust::{error::RelationshipConversionError, RelationshipType};
use uuid::Uuid;

use crate::objects::{cover::Cover, manga::MangaObject};

use super::related::MangaRelated;

pub struct MangaRelationships {
    pub id: Uuid,
    pub relationships: Vec<Relationship>,
}

#[Object]
impl MangaRelationships {
    pub async fn manga(&self) -> GraphQLResult<Vec<MangaRelated>> {
        Ok(self
            .relationships
            .iter()
            .map(
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
            .flatten()
            .collect::<Vec<MangaRelated>>())
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
    //pub async fn authors(&self) -> GraphQLResult<Vec<Author>>
}
