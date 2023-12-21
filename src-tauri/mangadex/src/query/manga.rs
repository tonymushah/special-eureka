pub mod aggregate;

use std::collections::HashMap;

use async_graphql::{Context, Object, Result};
use mangadex_api_input_types::manga::{
    aggregate::MangaAggregateParam, feed::MangaFeedParams, get_draft::GetMangaDraftParams,
    get_drafts::MangaDraftsParams, get_relation_list::MangaRelationParam, list::MangaListParams,
    random::MangaRandomParams,
};
use mangadex_api_types_rust::{MangaRelation, ReadingStatus, ReferenceExpansionResource};
use uuid::Uuid;

use crate::{
    objects::{
        chapter::lists::ChapterResults,
        manga::{
            lists::MangaResults, manga_reading_status::MangaReadingStatusItem,
            related::MangaRelated, MangaObject as Manga,
        },
        ExtractReferenceExpansion, ExtractReferenceExpansionFromContext,
    },
    utils::get_mangadex_client_from_graphql_context,
};

use self::aggregate::MangaAggregateQueries;

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
    pub async fn feed(
        &self,
        ctx: &Context<'_>,
        mut params: MangaFeedParams,
    ) -> Result<ChapterResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        params.includes = <ChapterResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        Ok(params.send(&client).await?.into())
    }
    pub async fn get_manga_status(
        &self,
        ctx: &Context<'_>,
        status: Option<ReadingStatus>,
    ) -> Result<Vec<MangaReadingStatusItem>> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut req = client.manga().status().get();
        if let Some(status) = status {
            req.status(status);
        }
        Ok(req
            .send()
            .await?
            .statuses
            .into_iter()
            .map(|(id, status)| MangaReadingStatusItem { id, status })
            .collect())
    }
    pub async fn get_draft(
        &self,
        ctx: &Context<'_>,
        mut params: GetMangaDraftParams,
    ) -> Result<Manga> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        params.includes = <Manga as ExtractReferenceExpansionFromContext>::exctract(ctx);
        Ok(params.send(&client).await?.data.into())
    }
    pub async fn get_drafts(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] mut params: MangaDraftsParams,
    ) -> Result<MangaResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        params.includes = <MangaResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        Ok(params.send(&client).await?.into())
    }
    pub async fn relation_list(
        &self,
        ctx: &Context<'_>,
        params: MangaRelationParam,
        #[graphql(default)] mut list_params: MangaListParams,
    ) -> Result<Vec<MangaRelated>> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let rels: HashMap<Uuid, MangaRelation> = params
            .send(&client)
            .await?
            .data
            .into_iter()
            .map(|i| (i.id, i.attributes.relation))
            .collect();
        list_params.includes = <Manga as ExtractReferenceExpansionFromContext>::exctract(ctx);
        list_params.manga_ids = rels.keys().copied().collect();
        Ok(list_params
            .send(&client)
            .await?
            .data
            .into_iter()
            .flat_map(|i| -> Option<MangaRelated> {
                Some(MangaRelated {
                    id: i.id,
                    related: *rels.get(&i.id)?,
                    obj: i.into(),
                })
            })
            .collect())
    }
    pub async fn aggregate(&self, params: MangaAggregateParam) -> MangaAggregateQueries {
        params.into()
    }
}
