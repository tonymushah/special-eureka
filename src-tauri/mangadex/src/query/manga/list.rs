use std::{
    ops::{Deref, DerefMut},
    pin::Pin,
};

use crate::{
    store::types::structs::content::ContentFeeder, utils::math::divide::divide, Error, Result,
};

use async_graphql::Context;
use eureka_mmanager::prelude::{
    AsyncIntoSorted, IntoParamedFilteredStream, MangaDataPullAsyncTrait,
};
use mangadex_api_input_types::manga::list::MangaListParams;
use mangadex_api_schema_rust::v5::{MangaCollection, MangaObject};
use tokio_stream::Stream;

use crate::{
    objects::manga::lists::MangaResults,
    utils::{
        get_mangadex_client_from_graphql_context, get_offline_app_state,
        get_watches_from_graphql_context, source::SendMultiSourceData, Collection,
    },
};

#[derive(Debug, Clone)]
pub struct MangaListQueries(MangaListParams);

impl Deref for MangaListQueries {
    type Target = MangaListParams;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for MangaListQueries {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<MangaListParams> for MangaListQueries {
    fn from(value: MangaListParams) -> Self {
        Self(value)
    }
}

impl From<MangaListQueries> for MangaListParams {
    fn from(value: MangaListQueries) -> Self {
        value.0
    }
}

impl From<&MangaListQueries> for MangaListParams {
    fn from(value: &MangaListQueries) -> Self {
        value.0.clone()
    }
}

impl MangaListQueries {
    pub fn new_with_exclude_feed<CF: ContentFeeder<MangaListParams>>(
        param: MangaListParams,
        exclude_content_profile: bool,
        feeder: &CF,
    ) -> Self {
        if !exclude_content_profile {
            Self(feeder.feed(param))
        } else {
            Self(param)
        }
    }
    pub fn new<CF: ContentFeeder<MangaListParams>>(param: MangaListParams, feeder: &CF) -> Self {
        Self(feeder.feed(param))
    }
    pub async fn list_offline(&self, ctx: &Context<'_>) -> Result<MangaResults> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .ok_or(Error::OfflineAppStateNotLoaded)?;

        let params = self.deref().clone();
        Ok({
            let res: MangaResults = {
                let res: MangaCollection = Collection::from_async_stream(
                    {
                        let mut stream: Pin<Box<dyn Stream<Item = MangaObject> + Send>> =
                            if params.manga_ids.is_empty() {
                                Box::pin(olasw.get_manga_list().await?)
                            } else {
                                Box::pin(
                                    olasw
                                        .get_manga_list_by_ids(params.manga_ids.clone().into_iter())
                                        .await?,
                                )
                            };
                        stream = if let Some(order) = params.order.clone() {
                            Box::pin(tokio_stream::iter(stream.to_sorted(order).await))
                        } else {
                            stream
                        };
                        stream.to_filtered_into(params.clone())
                    },
                    params.limit.unwrap_or(10) as usize,
                    params.offset.unwrap_or_default() as usize,
                )
                .await
                .try_into()?;
                res.into()
            };
            let _res = res.clone();
            tauri::async_runtime::spawn(async move {
                for data in _res {
                    let _ = watches.manga.send_offline(data);
                }
            });
            res
        })
    }
    pub async fn list_online(&self, ctx: &Context<'_>) -> Result<MangaResults> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let params = if self.manga_ids.is_empty() {
            self.manga_ids
                .chunks(100)
                .flat_map(|chunck| {
                    let mut param = self.deref().clone();
                    param.manga_ids = chunck.to_vec();

                    if param.limit.is_none() && !param.manga_ids.is_empty() {
                        param.limit.replace(param.manga_ids.len().try_into().ok()?);
                    }
                    Some(param)
                })
                .collect::<Vec<_>>()
        } else {
            let div_res = divide(self.limit.unwrap_or(10), 100);
            let mut all = (0..div_res.quot)
                .map(|d| {
                    let mut param = self.deref().clone();
                    param.offset = Some(param.offset.unwrap_or_default() + d * 100);
                    param.limit = Some(100);
                    param
                })
                .collect::<Vec<_>>();
            all.push({
                let mut param = self.deref().clone();
                param.offset = Some(param.offset.unwrap_or_default() + div_res.quot * 100);
                param.limit = Some(div_res.remainder);
                param
            });
            all
        };
        let mut results = Vec::<MangaCollection>::new();
        for val in params {
            results.push(val.send(&client).await?);
        }
        let res: MangaResults = results
            .into_iter()
            .fold(
                MangaCollection {
                    response: mangadex_api_types_rust::ResponseType::Collection,
                    offset: self.offset.unwrap_or_default(),
                    total: 0,
                    limit: 0,
                    data: Vec::new(),
                    result: mangadex_api_types_rust::ResultType::Ok,
                },
                |mut agg, mut res| {
                    agg.total = res.total;
                    agg.limit += res.limit;
                    agg.data.append(&mut res.data);
                    agg
                },
            )
            .into();
        Ok({
            let _res = res.clone();
            tauri::async_runtime::spawn(async move {
                for data in _res {
                    let _ = watches.manga.send_online(data);
                }
            });
            res
        })
    }
    pub async fn list(&self, ctx: &Context<'_>) -> Result<MangaResults> {
        if let Ok(res) = self.list_online(ctx).await {
            Ok(res)
        } else {
            self.list_offline(ctx).await
        }
    }
}
