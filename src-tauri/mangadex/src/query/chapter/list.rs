use std::{
    ops::{Deref, DerefMut},
    pin::Pin,
};

use crate::{
    error::Error,
    store::types::structs::content::ContentFeeder,
    subscription::utils::{OptionFlattenStream, ResultFlattenStream},
    utils::{splittable_param::SendSplitted, Collection},
    Result,
};
use async_graphql::{Context, InputObject, Object};
use eureka_mmanager::prelude::{
    AsyncIntoSorted, AsyncIsIn, ChapterDataPullAsyncTrait, GetManagerStateData,
    IntoParamedFilteredStream,
};
use mangadex_api_input_types::chapter::list::ChapterListParams;
use mangadex_api_schema_rust::v5::{ChapterCollection, ChapterObject};

use tokio_stream::{Stream, StreamExt};

use crate::{
    objects::chapter::Chapter,
    utils::{
        get_mangadex_client_from_graphql_context, get_offline_app_state,
        get_watches_from_graphql_context, source::SendMultiSourceData,
    },
};

#[derive(Debug, InputObject, Clone, Copy)]
pub struct GetAllChapterParams {
    pub include_fails: bool,
    pub only_fails: bool,
}

impl Default for GetAllChapterParams {
    fn default() -> Self {
        Self {
            include_fails: true,
            only_fails: false,
        }
    }
}

use crate::objects::chapter::lists::ChapterResults;

type Param = ChapterListParams;

#[derive(Debug, Clone)]
pub struct ChapterListQueries(Param);

impl Deref for ChapterListQueries {
    type Target = Param;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl DerefMut for ChapterListQueries {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}

impl From<Param> for ChapterListQueries {
    fn from(value: Param) -> Self {
        Self(value)
    }
}

impl From<ChapterListQueries> for Param {
    fn from(value: ChapterListQueries) -> Self {
        value.0
    }
}

impl From<&ChapterListQueries> for Param {
    fn from(value: &ChapterListQueries) -> Self {
        value.0.clone()
    }
}

impl ChapterListQueries {
    pub fn new<CF: ContentFeeder<ChapterListParams>>(
        params: ChapterListParams,
        feeder: &CF,
    ) -> Self {
        Self(feeder.feed(params))
    }
}

impl ChapterListQueries {
    pub async fn get_offline(
        &self,
        ctx: &Context<'_>,
        params: GetAllChapterParams,
    ) -> Result<ChapterCollection> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        let oas = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state = oas.read().await;
        let app_state = offline_app_state
            .as_ref()
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        let app_state_data = app_state.app_state.clone();
        let stream = StreamExt::then(
            {
                let mut stream: Pin<Box<dyn Stream<Item = ChapterObject> + Send>> =
                    if self.chapter_ids.is_empty() {
                        Box::pin(app_state.get_chapters().await?)
                    } else {
                        Box::pin(
                            app_state
                                .get_chapters_by_ids(self.chapter_ids.clone().into_iter())
                                .await?,
                        )
                    };
                stream = if let Some(order) = self.order.clone() {
                    Box::pin(tokio_stream::iter(stream.to_sorted(order).await))
                } else {
                    stream
                };
                stream
            },
            move |chapter_data| {
                let app_state_data = app_state_data.clone();
                async move {
                    let history = app_state_data.get_history().await?;
                    let is_in = history.is_in(&chapter_data).await.unwrap_or_default();
                    let res = match (is_in, params.include_fails, params.only_fails) {
                        (true, true, true) => None,
                        (true, true, false) => Some(chapter_data),
                        (true, false, true) => Some(chapter_data),
                        (true, false, false) => None,
                        (false, true, true) => Some(chapter_data),
                        (false, true, false) => Some(chapter_data),
                        (false, false, true) => None,
                        (false, false, false) => None,
                    };
                    Ok::<_, crate::Error>(res)
                }
            },
        )
        .result_flatten()
        .option_flatten();
        let res: ChapterCollection = Collection::from_async_stream(
            IntoParamedFilteredStream::to_filtered_into(stream, self.0.clone()),
            self.limit.map(|l| l as usize).unwrap_or_else(|| {
                if self.chapter_ids.is_empty() {
                    10
                } else {
                    self.chapter_ids.len()
                }
            }),
            self.offset.unwrap_or_default() as usize,
        )
        .await
        .try_into()?;
        let _res = res.clone();
        tauri::async_runtime::spawn(async move {
            for data in _res.data {
                let data: Chapter = data.into();
                let _ = watches.chapter.send_offline(data);
            }
        });
        Ok(res)
    }
    // TODO Try this in practise lol
    pub async fn get_online(&self, ctx: &Context<'_>) -> Result<ChapterCollection> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        let res = self.0.clone().send_splitted_default(&client).await?;
        let _res = res.clone();
        tauri::async_runtime::spawn(async move {
            for data in _res.data {
                let data: Chapter = data.into();
                let _ = watches.chapter.send_online(data);
            }
        });
        Ok(res)
    }
    pub async fn _default(
        &self,
        ctx: &Context<'_>,
        offline_params: Option<GetAllChapterParams>,
    ) -> Result<ChapterCollection> {
        if let Some(params) = offline_params {
            self.get_offline(ctx, params).await
        } else if let Ok(res) = self.get_online(ctx).await {
            Ok(res)
        } else {
            self.get_offline(ctx, Default::default()).await
        }
    }
}

#[Object]
impl ChapterListQueries {
    pub async fn default(
        &self,
        ctx: &Context<'_>,
        offline_params: Option<GetAllChapterParams>,
    ) -> Result<ChapterResults> {
        self._default(ctx, offline_params)
            .await
            .map(|res| res.into())
    }
}
