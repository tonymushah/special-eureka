use crate::{Result, error::Error};
use async_graphql::{Context, Object};
use eureka_mmanager::prelude::CoverDataPullAsyncTrait;
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::{
    objects::{ExtractReferenceExpansion, cover::Cover},
    utils::{
        get_mangadex_client_from_graphql_context, get_offline_app_state,
        get_watches_from_graphql_context, source::SendMultiSourceData,
    },
};

#[derive(Clone, Copy, Debug)]
pub struct CoverGetUniqueQuery {
    pub id: Uuid,
}

#[Object]
impl CoverGetUniqueQuery {
    #[graphql(skip)]
    pub async fn get_online(&self, ctx: &Context<'_>) -> Result<Cover> {
        let id = self.id;
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        if let Some(rel) = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "relationships")
        {
            let mut out = <Cover as ExtractReferenceExpansion>::exctract(rel);
            includes.append(&mut out);
        }
        includes.dedup();
        let data: Cover = client
            .cover()
            .cover_id(id)
            .get()
            .includes(includes)
            .send()
            .await?
            .data
            .into();
        let _ = watches.cover.send_online(data.clone());
        Ok(data)
    }

    #[graphql(skip)]
    pub async fn get_offline(&self, ctx: &Context<'_>) -> Result<Cover> {
        let id = self.id;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let oas = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state = oas.read().await;
        let app_state = offline_app_state
            .as_ref()
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        let data: Cover = app_state.get_cover(id).await?.into();
        let _ = watches.cover.send_offline(data.clone());
        Ok(data)
    }

    pub async fn get(&self, ctx: &Context<'_>) -> Result<Cover> {
        if let Ok(online) = self.get_online(ctx).await {
            Ok(online)
        } else {
            self.get_offline(ctx).await
        }
    }
}
