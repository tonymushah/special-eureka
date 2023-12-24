use std::ops::{Deref, DerefMut};

use async_graphql::{Context, Error, Result};
use mangadex_api_input_types::manga::list::MangaListParams;

use crate::{
    objects::{manga::lists::MangaResults, ExtractReferenceExpansionFromContext},
    utils::{get_mangadex_client_from_graphql_context, get_offline_app_state},
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
        let ola = get_offline_app_state::<tauri::Wry>(ctx)?;
        let offline_app_state_write = ola.read().await;
        let olasw = offline_app_state_write
            .as_ref()
            .ok_or(Error::new("Offline AppState Not loaded"))?;
        let manga_utils = olasw.manga_utils();
        let ids = Box::pin(manga_utils.get_all_downloaded_manga()?);
        manga_utils.get_manga_data_by_ids(ids);
        todo!()
    }
    pub async fn list_online(&self, ctx: &Context<'_>) -> Result<MangaResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let mut params = self.deref().clone();
        params.includes = <MangaResults as ExtractReferenceExpansionFromContext>::exctract(ctx);
        Ok(params.send(&client).await?.into())
    }
    pub async fn list(&self, ctx: &Context<'_>) -> Result<MangaResults> {
        todo!()
    }
}
