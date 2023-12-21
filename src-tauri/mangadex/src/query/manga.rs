use async_graphql::{Context, Object, Result};
use mangadex_api_input_types::manga::{list::MangaListParams, random::MangaRandomParams};
use mangadex_api_types_rust::ReferenceExpansionResource;
use uuid::Uuid;

use crate::{
    objects::{
        manga::{lists::MangaResults, MangaObject as Manga},
        ExtractReferenceExpansion, ExtractReferenceExpansionFromContext,
    },
    utils::get_mangadex_client_from_graphql_context,
};

pub struct MangaQueries;

#[Object]
impl MangaQueries {
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<Manga> {
        // TODO Add offline supports
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut req = client.manga().id(id).get();
        let mut includes: Vec<ReferenceExpansionResource> = Vec::new();
        if let Some(rel) = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "relationships")
        {
            let mut out = <Manga as ExtractReferenceExpansion>::exctract(rel);
            includes.append(&mut out);
        }
        includes.dedup();
        Ok(req.includes(includes).send().await?.data.into())
    }
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] mut params: MangaListParams,
    ) -> Result<MangaResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        params.includes = <Manga as ExtractReferenceExpansionFromContext>::exctract(ctx);
        Ok(params.send(client.inner()).await?.into())
    }
    pub async fn random(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] mut params: MangaRandomParams,
    ) -> Result<Manga> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let includes = &mut params.includes;
        if let Some(rel) = ctx
            .field()
            .selection_set()
            .find(|f| f.name() == "relationships")
        {
            let out = <Manga as ExtractReferenceExpansion>::exctract(rel);
            *includes = out;
        }
        Ok(params.send(&client).await?.body.data.into())
    }
}
