use std::{ops::Deref, pin::Pin};

use async_graphql::{Context, Object};
use eureka_mmanager::prelude::{
    AsyncIntoSorted, CoverDataPullAsyncTrait, IntoParamedFilteredStream,
};
use mangadex_api_input_types::cover::list::CoverListParam;
use mangadex_api_schema_rust::v5::{CoverCollection, CoverObject};
use tokio_stream::Stream;

use crate::{
    error::Error,
    objects::cover::lists::CoverResults,
    utils::{
        get_mangadex_client_from_graphql_context, get_offline_app_state,
        get_watches_from_graphql_context, source::SendMultiSourceData, Collection,
    },
    Result,
};

#[derive(Clone, Debug)]
pub struct CoverListQuery {
    pub params: CoverListParam,
}

#[Object]
impl CoverListQuery {
    #[graphql(skip)]
    pub async fn list_offline(&self, ctx: &Context<'_>) -> Result<CoverResults> {
        let params = self.params.clone();
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        let oas = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state = oas.read().await;
        let app_state = offline_app_state
            .as_ref()
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        let res: CoverResults = {
            let res: CoverCollection = Collection::from_async_stream(
                {
                    let mut stream: Pin<Box<dyn Stream<Item = CoverObject> + Send>> =
                        if self.params.cover_ids.is_empty() {
                            Box::pin(app_state.get_covers().await?)
                        } else {
                            Box::pin(
                                app_state
                                    .get_covers_by_ids(self.params.cover_ids.clone().into_iter())
                                    .await?,
                            )
                        };
                    stream = if let Some(order) = self.params.order.clone() {
                        Box::pin(tokio_stream::iter(stream.to_sorted(order).await))
                    } else {
                        stream
                    };
                    stream.to_filtered_into(params.clone())
                },
                self.params.limit.unwrap_or(10) as usize,
                self.params.offset.unwrap_or_default() as usize,
            )
            .await
            .try_into()?;
            res.into()
        };
        {
            let _res = res.clone();
            tauri::async_runtime::spawn(async move {
                for data in _res {
                    let _ = watches.cover.send_offline(data);
                }
            });
        }
        Ok(res)
    }
    #[graphql(skip)]
    pub async fn list_online(&self, ctx: &Context<'_>) -> Result<CoverResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        let res: CoverResults = self.params.clone().send(&client).await?.into();
        {
            let _res = res.clone();
            tauri::async_runtime::spawn(async move {
                for data in _res {
                    let _ = watches.cover.send_online(data);
                }
            });
        }
        Ok(res)
    }
    pub async fn list(&self, ctx: &Context<'_>) -> Result<CoverResults> {
        if let Ok(online) = self.list_online(ctx).await {
            Ok(online)
        } else {
            self.list_offline(ctx).await
        }
    }
}
