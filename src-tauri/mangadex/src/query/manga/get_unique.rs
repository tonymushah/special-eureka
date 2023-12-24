use async_graphql::{Context, Error, Result};
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::{
    objects::{
        manga::MangaObject as Manga, ExtractReferenceExpansion,
        ExtractReferenceExpansionFromContext,
    },
    utils::{get_mangadex_client_from_graphql_context, get_offline_app_state},
};

#[derive(Debug, Clone, Copy)]
pub struct MangaGetUniqueQueries(pub Uuid);

impl From<Uuid> for MangaGetUniqueQueries {
    fn from(value: Uuid) -> Self {
        Self(value)
    }
}

impl From<MangaGetUniqueQueries> for Uuid {
    fn from(value: MangaGetUniqueQueries) -> Self {
        value.0
    }
}

impl From<&MangaGetUniqueQueries> for Uuid {
    fn from(value: &MangaGetUniqueQueries) -> Self {
        value.0
    }
}

impl ExtractReferenceExpansion<'_> for MangaGetUniqueQueries {
    fn exctract(field: async_graphql::SelectionField<'_>) -> Vec<ReferenceExpansionResource> {
        field
            .selection_set()
            .find(|f| f.name() == "relationships")
            .map(<Manga as ExtractReferenceExpansion>::exctract)
            .unwrap_or_default()
    }
}

impl ExtractReferenceExpansionFromContext<'_> for MangaGetUniqueQueries {}

impl MangaGetUniqueQueries {
    pub async fn get_online(&self, ctx: &Context<'_>) -> Result<Manga> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut req = client.manga().id(self.into()).get();
        let mut includes = <Self as ExtractReferenceExpansionFromContext>::exctract(ctx);
        includes.dedup();
        Ok(req.includes(includes).send().await?.data.into())
    }
    pub async fn get_offline(&self, ctx: &Context<'_>) -> Result<Manga> {
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .ok_or(Error::new("Offline AppState Not loaded"))?;
        Ok(olasw.manga_utils().with_id(self.into()).get_data()?.into())
    }
    pub async fn get(&self, ctx: &Context<'_>) -> Result<Manga> {
        if let Ok(online) = self.get_online(ctx).await {
            Ok(online)
        } else {
            self.get_online(ctx).await
        }
    }
}
