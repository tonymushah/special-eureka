use crate::{error::Error, Result};
use async_graphql::{Context, Object};
use mangadex_api_types_rust::ReferenceExpansionResource;
use mangadex_desktop_api2::utils::ExtractData;
use uuid::Uuid;

use crate::{
    objects::chapter::Chapter,
    utils::{
        get_mangadex_client_from_graphql_context, get_offline_app_state,
        get_watches_from_graphql_context, source::SendMultiSourceData,
    },
};

#[derive(Debug, Clone)]
pub struct GetUniqueChapterQuery(pub Vec<ReferenceExpansionResource>);

#[Object]
impl GetUniqueChapterQuery {
    #[graphql(skip)]
    pub async fn get_online(&self, ctx: &Context<'_>, id: Uuid) -> Result<Chapter> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let data: Chapter = client
            .chapter()
            .id(id)
            .get()
            .includes(self.0.clone())
            .send()
            .await?
            .data
            .into();
        let _ = watches.chapter.send_online(data.clone());
        Ok(data)
    }
    #[graphql(skip)]
    pub async fn get_offline(&self, ctx: &Context<'_>, id: Uuid) -> Result<Chapter> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let off_state = get_offline_app_state::<tauri::Wry>(ctx)?;
        let read_off_state = off_state.read().await;
        let inner_off_state = read_off_state
            .as_ref()
            .ok_or(Error::OfflineAppStateNotLoaded)?;
        let chapter: Chapter = inner_off_state
            .chapter_utils()
            .with_id(id)
            .get_data()?
            .into();
        let _ = watches.chapter.send_offline(chapter.clone());
        Ok(chapter)
    }
    pub async fn get(&self, ctx: &Context<'_>, id: Uuid) -> Result<Chapter> {
        if let Ok(online) = self.get_online(ctx, id).await {
            Ok(online)
        } else {
            self.get_offline(ctx, id).await
        }
    }
}
