use std::{
    ops::{Deref, DerefMut},
    pin::Pin,
};

use crate::{
    Result,
    error::Error,
    store::types::structs::content::ContentFeeder,
    subscription::utils::{OptionFlattenStream, ResultFlattenStream},
    utils::{
        Collection, splittable_param::SendSplitted, traits_utils::MangadexAsyncGraphQLContextExt,
    },
};
use async_graphql::{Context, InputObject};
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

#[derive(Debug, Clone, Default)]
pub struct ChapterListQueries {
    param: Param,
    exclude_blacklisted_scanlation_groups: bool,
    exclude_blacklisted_users: bool,
}

impl Deref for ChapterListQueries {
    type Target = Param;
    fn deref(&self) -> &Self::Target {
        &self.param
    }
}

impl DerefMut for ChapterListQueries {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.param
    }
}

impl From<Param> for ChapterListQueries {
    fn from(value: Param) -> Self {
        Self {
            param: value,
            ..Default::default()
        }
    }
}

impl From<ChapterListQueries> for Param {
    fn from(value: ChapterListQueries) -> Self {
        value.param
    }
}

impl From<&ChapterListQueries> for Param {
    fn from(value: &ChapterListQueries) -> Self {
        value.param.clone()
    }
}

impl ChapterListQueries {
    pub fn exclude_blacklisted_scanlation_groups(
        mut self,
        exclude_blacklisted_scanlation_groups: bool,
    ) -> Self {
        self.exclude_blacklisted_scanlation_groups = exclude_blacklisted_scanlation_groups;
        self
    }
    pub fn exclude_blacklisted_users(mut self, exclude_blacklisted_users: bool) -> Self {
        self.exclude_blacklisted_users = exclude_blacklisted_users;
        self
    }
    pub fn new<CF: ContentFeeder<ChapterListParams>>(
        params: ChapterListParams,
        feeder: &CF,
    ) -> Self {
        Self {
            param: feeder.feed(params),
            ..Default::default()
        }
    }
    pub fn no_feed(param: ChapterListParams) -> Self {
        Self {
            param,
            ..Default::default()
        }
    }
}

#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
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
            IntoParamedFilteredStream::to_filtered_into(stream, self.param.clone()),
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
        let res = self.param.clone().send_splitted_default(&client).await?;
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

#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl ChapterListQueries {
    pub async fn default(
        mut self,
        ctx: &Context<'_>,
        offline_params: Option<GetAllChapterParams>,
    ) -> crate::error::wrapped::Result<ChapterResults> {
        let mut list: ChapterResults = self
            ._default(ctx, offline_params)
            .await
            .map(|res| res.into())?;
        if self.exclude_blacklisted_scanlation_groups || self.exclude_blacklisted_users {
            loop {
                if self.exclude_blacklisted_scanlation_groups {
                    *list = crate::blacklist::filters::filter_scanlation_groups_chapters::<
                        tauri::Wry,
                    >(
                        ctx.get_app_handle()?.clone(), std::mem::take(&mut *list)
                    )
                    .await?;
                }
                if self.exclude_blacklisted_users {
                    *list = crate::blacklist::filters::filter_users_chapters::<tauri::Wry>(
                        ctx.get_app_handle()?.clone(),
                        std::mem::take(&mut *list),
                    )
                    .await?;
                }
                if list.is_empty() {
                    let next_offset = list.info.offset + list.info.limit;
                    if next_offset > list.info.total {
                        break;
                    } else {
                        self.offset = Some(next_offset);
                        list = self
                            ._default(ctx, offline_params)
                            .await
                            .map(|res| res.into())?;
                    }
                } else {
                    break;
                }
            }
        }
        Ok(list)
    }
}
