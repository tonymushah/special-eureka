use std::ops::Deref;

use async_graphql::{Context, Error, Object, Result};
use mangadex_api_input_types::cover::list::CoverListParam;

use crate::{
    objects::cover::lists::CoverResults,
    utils::{
        get_mangadex_client_from_graphql_context, get_offline_app_state,
        get_watches_from_graphql_context, source::SendMultiSourceData,
    },
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
            .ok_or(Error::new("Offline AppState is not loaded"))?;
        let res: CoverResults = app_state.cover_utils().list(params).await?.into();
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
