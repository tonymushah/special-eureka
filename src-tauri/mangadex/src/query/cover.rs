use async_graphql::{Context, Error, Object, Result};
use mangadex_api_input_types::cover::list::CoverListParam;
use mangadex_api_types_rust::ReferenceExpansionResource;
use mangadex_desktop_api2::utils::ExtractData;
use uuid::Uuid;

use crate::{
    objects::{
        cover::{lists::CoverResults, Cover},
        ExtractReferenceExpansion, ExtractReferenceExpansionFromContext,
    },
    utils::{get_mangadex_client_from_graphql_context, get_offline_app_state},
};

#[derive(Debug, Clone, Copy)]
pub struct CoverQueries;

#[Object]
impl CoverQueries {
    #[graphql(skip)]
    pub async fn list_offline(
        &self,
        ctx: &Context<'_>,
        params: CoverListParam,
    ) -> Result<CoverResults> {
        let oas = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state = oas.read().await;
        let app_state = offline_app_state
            .as_ref()
            .ok_or(Error::new("Offline AppState is not loaded"))?;
        Ok(app_state.cover_utils().list(params).await?.into())
    }
    #[graphql(skip)]
    pub async fn list_online(
        &self,
        ctx: &Context<'_>,
        mut params: CoverListParam,
    ) -> Result<CoverResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        params.includes = <CoverResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        Ok(params.send(&client).await?.into())
    }
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] params: CoverListParam,
    ) -> Result<CoverResults> {
        if let Ok(online) = self.list_online(ctx, params.clone()).await {
            Ok(online)
        } else {
            self.list_offline(ctx, params).await
        }
    }
    #[graphql(skip)]
    pub async fn get_online(&self, ctx: &Context<'_>, id: Uuid) -> Result<Cover> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
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
        Ok(client
            .cover()
            .cover_id(id)
            .get()
            .includes(includes)
            .send()
            .await?
            .data
            .into())
    }
    #[graphql(skip)]
    pub async fn get_offline(&self, ctx: &Context<'_>, id: Uuid) -> Result<Cover> {
        let oas = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state = oas.read().await;
        let app_state = offline_app_state
            .as_ref()
            .ok_or(Error::new("Offline AppState is not loaded"))?;
        Ok(app_state.cover_utils().with_id(id).get_data()?.into())
    }

    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<Cover> {
        if let Ok(online) = self.get_online(ctx, id).await {
            Ok(online)
        } else {
            self.get_offline(ctx, id).await
        }
    }
}
