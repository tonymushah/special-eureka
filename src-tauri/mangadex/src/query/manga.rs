pub mod aggregate;
pub mod get_unique;
pub mod list;

use std::{collections::HashMap, ops::Deref};

use crate::{
    store::types::structs::content::feed_from_gql_ctx,
    utils::traits_utils::MangadexAsyncGraphQLContextExt, Result,
};
use async_graphql::{Context, Object};
use mangadex_api_input_types::manga::{
    aggregate::MangaAggregateParam, feed::MangaFeedParams, get_draft::GetMangaDraftParams,
    get_drafts::MangaDraftsParams, get_relation_list::MangaRelationParam, list::MangaListParams,
    random::MangaRandomParams,
};
use mangadex_api_types_rust::{MangaRelation, ReadingStatus};
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
    utils::{
        download_state::DownloadState, get_mangadex_client_from_graphql_context,
        get_mangadex_client_from_graphql_context_with_auth_refresh,
        get_watches_from_graphql_context, source::SendMultiSourceData, watch::SendData,
    },
};

use self::{
    aggregate::MangaAggregateQueries, get_unique::MangaGetUniqueQueries, list::MangaListQueries,
};

use super::download_state::DownloadStateQueries;

#[derive(Debug, Clone, Copy)]
pub struct MangaQueries;

#[Object]
impl MangaQueries {
    pub async fn is_downloaded(&self, ctx: &Context<'_>, id: Uuid) -> Result<DownloadState> {
        DownloadStateQueries.manga(ctx, id).await
    }
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<Manga> {
        MangaGetUniqueQueries {
            id,
            includes: <MangaGetUniqueQueries as ExtractReferenceExpansionFromContext>::exctract(
                ctx,
            ),
        }
        .get(ctx)
        .await
    }
    pub async fn list(
        &self,
        ctx: &Context<'_>,
        params: Option<MangaListParams>,
        exclude_content_profile: Option<bool>,
    ) -> Result<MangaResults> {
        let mut params = params.unwrap_or_default();
        params.includes = <MangaResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        if params.limit.is_none() && !params.manga_ids.is_empty() {
            params.limit.replace(params.manga_ids.len().try_into()?);
        }
        MangaListQueries::new_with_exclude_feed(
            params,
            exclude_content_profile.unwrap_or_default(),
            ctx.get_app_handle::<tauri::Wry>()?,
        )
        .list(ctx)
        .await
    }
    pub async fn list_offline(
        &self,
        ctx: &Context<'_>,
        params: Option<MangaListParams>,
        exclude_content_profile: Option<bool>,
    ) -> Result<MangaResults> {
        let mut params = params.unwrap_or_default();
        params.includes = <MangaResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        if params.limit.is_none() && !params.manga_ids.is_empty() {
            params.limit.replace(params.manga_ids.len().try_into()?);
        }
        MangaListQueries::new_with_exclude_feed(
            params,
            exclude_content_profile.unwrap_or_default(),
            ctx.get_app_handle::<tauri::Wry>()?,
        )
        .list_offline(ctx)
        .await
    }
    pub async fn random(
        &self,
        ctx: &Context<'_>,
        params: Option<MangaRandomParams>,
    ) -> Result<Manga> {
        let mut params = feed_from_gql_ctx::<tauri::Wry, _>(ctx, params.unwrap_or_default());
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
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
        Ok({
            let data: Manga = params.send(&client).await?.body.data.into();
            let _ = watches.manga.send_online(data.clone());
            data
        })
    }
    pub async fn feed(&self, ctx: &Context<'_>, params: MangaFeedParams) -> Result<ChapterResults> {
        let mut params = params;
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        params.includes = <ChapterResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        Ok({
            let res: ChapterResults = params.send(&client).await?.into();
            let _res = res.clone();
            tauri::async_runtime::spawn(async move {
                for data in _res {
                    let _ = watches.chapter.send_online(data);
                }
            });
            res
        })
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
    pub async fn get_draft(&self, ctx: &Context<'_>, params: GetMangaDraftParams) -> Result<Manga> {
        let mut params = params;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        params.includes = <Manga as ExtractReferenceExpansionFromContext>::exctract(ctx);
        Ok({
            let data: Manga = params.send(&client).await?.data.into();
            let _ = watches.manga.send_online(data.clone());
            data
        })
    }
    pub async fn get_drafts(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] params: MangaDraftsParams,
    ) -> Result<MangaResults> {
        let mut params = params;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        params.includes = <MangaResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        Ok({
            let res: MangaResults = params.send(&client).await?.into();
            let _res = res.clone();
            tauri::async_runtime::spawn(async move {
                for data in _res {
                    let _ = watches.manga.send_online(data);
                }
            });
            res
        })
    }
    pub async fn relation_list(
        &self,
        ctx: &Context<'_>,
        params: MangaRelationParam,
        list_params: Option<MangaListParams>,
    ) -> Result<Vec<MangaRelated>> {
        let mut list_params =
            feed_from_gql_ctx::<tauri::Wry, _>(ctx, list_params.unwrap_or_default());
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
        list_params.limit.replace(rels.keys().len().try_into()?);
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
    pub async fn reading_status(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> Result<Option<ReadingStatus>> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        let status = client.manga().id(id).status().get().send().await?.status;
        let _ = watches.manga_reading_state.send_data((id, status));
        Ok(status)
    }
}
