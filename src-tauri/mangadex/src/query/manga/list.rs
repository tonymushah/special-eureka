use std::ops::{Deref, DerefMut};

use crate::{Error, Result};
use async_graphql::Context;
use mangadex_api_input_types::manga::list::MangaListParams;

use crate::{
    objects::manga::lists::MangaResults,
    utils::{
        get_mangadex_client_from_graphql_context, get_offline_app_state,
        get_watches_from_graphql_context, source::SendMultiSourceData,
    },
};

#[derive(Debug, Clone)]
pub struct MangaListQueries(pub MangaListParams);

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
    pub async fn list_offline(&self, ctx: &Context<'_>) -> Result<MangaResults> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?
            .deref()
            .clone();
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        let manga_utils = olasw.manga_utils();
        let params = self.deref().clone();
        Ok({
            let res: MangaResults = manga_utils.get_downloaded_manga(params).await?.into();
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
        let params = self.deref().clone();
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
    pub async fn list(&self, ctx: &Context<'_>) -> Result<MangaResults> {
        if let Ok(res) = self.list_online(ctx).await {
            Ok(res)
        } else {
            self.list_offline(ctx).await
        }
    }
}
