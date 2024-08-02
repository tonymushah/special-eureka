use crate::{Error, Result};
use async_graphql::Context;
use mangadex_api_types_rust::ReferenceExpansionResource;
use mangadex_desktop_api2::utils::ExtractData;
use uuid::Uuid;

use crate::{
    objects::{
        manga::MangaObject as Manga, ExtractReferenceExpansion,
        ExtractReferenceExpansionFromContext,
    },
    utils::{
        get_mangadex_client_from_graphql_context, get_offline_app_state,
        get_watches_from_graphql_context, source::SendMultiSourceData,
    },
};

#[derive(Debug, Clone)]
pub struct MangaGetUniqueQueries {
    pub id: Uuid,
    pub includes: Vec<ReferenceExpansionResource>,
}

impl From<Uuid> for MangaGetUniqueQueries {
    fn from(value: Uuid) -> Self {
        Self {
            id: value,
            includes: Default::default(),
        }
    }
}

impl From<MangaGetUniqueQueries> for Uuid {
    fn from(value: MangaGetUniqueQueries) -> Self {
        value.id
    }
}

impl From<&MangaGetUniqueQueries> for Uuid {
    fn from(value: &MangaGetUniqueQueries) -> Self {
        value.id
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
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut req = client.manga().id(self.into()).get();
        Ok({
            let data: Manga = req
                .includes(self.includes.clone())
                .send()
                .await?
                .data
                .into();
            let _ = watches.manga.send_online(data.clone());
            data
        })
    }
    pub async fn get_offline(&self, ctx: &Context<'_>) -> Result<Manga> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        Ok({
            let data: Manga = olasw.manga_utils().with_id(self.into()).get_data()?.into();
            let _ = watches.manga.send_offline(data.clone());
            data
        })
    }
    pub async fn get(&self, ctx: &Context<'_>) -> Result<Manga> {
        if let Ok(online) = self.get_online(ctx).await {
            Ok(online)
        } else {
            self.get_offline(ctx).await
        }
    }
}
