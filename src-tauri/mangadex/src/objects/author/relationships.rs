use std::ops::Deref;

use async_graphql::{Context, Object};
use mangadex_api_schema_rust::{
    ApiObjectNoRelationships,
    v5::{MangaAttributes, Relationship},
};
use mangadex_api_types_rust::RelationshipType;

use crate::{
    objects::{GetId, manga::MangaObject},
    utils::{read_marker::has_title_read, traits_utils::MangadexAsyncGraphQLContextExt},
};

#[derive(Debug, Clone)]
pub struct AuthorRelationships(pub Vec<Relationship>);

impl From<Vec<Relationship>> for AuthorRelationships {
    fn from(value: Vec<Relationship>) -> Self {
        Self(value)
    }
}

impl Deref for AuthorRelationships {
    type Target = Vec<Relationship>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[Object]
#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl AuthorRelationships {
    pub async fn works_number(&self) -> crate::error::wrapped::Result<u32> {
        Ok(self
            .iter()
            .filter(|e| e.type_ == RelationshipType::Manga)
            .count()
            .try_into()?)
    }
    pub async fn works(
        &self,
        ctx: &Context<'_>,
        only_unread: Option<bool>,
    ) -> crate::error::wrapped::Result<Vec<MangaObject>> {
        let mut mangas = self
            .iter()
            .filter(|e| e.type_ == RelationshipType::Manga)
            .flat_map(
                |rel| -> Result<
                    ApiObjectNoRelationships<MangaAttributes>,
                    <ApiObjectNoRelationships<MangaAttributes> as TryFrom<Relationship>>::Error,
                > {
                    <ApiObjectNoRelationships<MangaAttributes> as TryFrom<Relationship>>::try_from(
                        rel.clone(),
                    )
                },
            )
            .map(<MangaObject as From<ApiObjectNoRelationships<MangaAttributes>>>::from)
            .collect::<Vec<MangaObject>>();
        if only_unread.unwrap_or_default() {
            let app_handle = ctx.get_app_handle::<tauri::Wry>()?;
            let read_markers =
                has_title_read(app_handle, mangas.iter().map(|m| m.get_id()).collect())
                    .await
                    .unwrap_or_default();
            mangas.retain(|m| !read_markers.contains(&m.get_id()));
            mangas.shrink_to_fit();
        }
        Ok(mangas)
    }
}
