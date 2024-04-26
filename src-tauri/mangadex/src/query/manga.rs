pub mod aggregate;
pub mod get_unique;
pub mod list;

use std::{collections::HashMap, ops::Deref};

use async_graphql::{Context, Error, Object, Result};
use mangadex_api_input_types::manga::{
    aggregate::MangaAggregateParam, feed::MangaFeedParams, get_draft::GetMangaDraftParams,
    get_drafts::MangaDraftsParams, get_relation_list::MangaRelationParam, list::MangaListParams,
    random::MangaRandomParams,
};
use mangadex_api_types_rust::{MangaRelation, ReadingStatus, RelationshipType};
use mangadex_desktop_api2::{settings::file_history::IsIn, utils::ExtractData};
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
        download_state::DownloadState,
        get_mangadex_client_from_graphql_context,
        get_mangadex_client_from_graphql_context_with_auth_refresh, get_offline_app_state,
        get_watches_from_graphql_context,
        source::SendMultiSourceData,
        watch::{SendData, WatcherInnerData},
    },
};

use self::{
    aggregate::MangaAggregateQueries, get_unique::MangaGetUniqueQueries, list::MangaListQueries,
};

#[derive(Debug, Clone, Copy)]
pub struct MangaQueries;

#[Object]
impl MangaQueries {
    pub async fn is_downloaded(&self, ctx: &Context<'_>, id: Uuid) -> Result<DownloadState> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .ok_or(Error::new("Offline AppState Not loaded"))?;
        let state = {
            if olasw.manga_utils().with_id(id).is_there() {
                DownloadState::Downloaded {
                    has_failed: olasw
                        .history
                        .get_history_w_file_by_rel_or_init(
                            RelationshipType::Manga,
                            &olasw.dir_options,
                        )
                        .await?
                        .is_in(id)?,
                }
            } else {
                DownloadState::NotDownloaded
            }
        };
        let _ = watches.download_state.send_data(WatcherInnerData {
            id,
            attributes: state,
        });
        Ok(state)
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
        #[graphql(default)] params: MangaListParams,
    ) -> Result<MangaResults> {
        let mut params = params;
        params.includes = <MangaResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        if params.limit.is_none() && !params.manga_ids.is_empty() {
            params.limit.replace(params.manga_ids.len().try_into()?);
        }
        MangaListQueries(params).list(ctx).await
    }
    pub async fn list_offline(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] params: MangaListParams,
    ) -> Result<MangaResults> {
        let mut params = params;
        params.includes = <MangaResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        if params.limit.is_none() && !params.manga_ids.is_empty() {
            params.limit.replace(params.manga_ids.len().try_into()?);
        }
        MangaListQueries(params).list_offline(ctx).await
    }
    pub async fn random(
        &self,
        ctx: &Context<'_>,
        #[graphql(default)] params: MangaRandomParams,
    ) -> Result<Manga> {
        let mut params = params;
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
        #[graphql(default)] list_params: MangaListParams,
    ) -> Result<Vec<MangaRelated>> {
        let mut list_params = list_params;
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
