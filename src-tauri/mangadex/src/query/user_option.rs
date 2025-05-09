use std::ops::Deref;

use crate::{
    objects::offline_config::OfflineConfigObject,
    store::types::structs::{content::ContentProfile, refresh_token::RefreshTokenStore},
    subscription::user_option::UserOptionSubscriptions,
    Result,
};
use async_graphql::{Context, Object};
use mangadex_api_types_rust::{Language, MangaDexDateTime};
use tokio_stream::StreamExt;

use crate::{
    store::types::{
        enums::{
            direction::{
                reading::ReadingDirectionStore, sidebar::SidebarDirectionStore, Direction,
            },
            reading_mode::{ReadingMode, ReadingModeStore},
        },
        structs::chapter_language::ChapterLanguagesStore,
        ExtractFromStore,
    },
    utils::{get_store, get_watches_from_graphql_context, watch::SendData},
};

#[derive(Debug, Clone, Copy)]
pub struct UserOptionQueries;

#[Object]
impl UserOptionQueries {
    pub async fn get_reading_mode(&self, ctx: &Context<'_>) -> Result<ReadingMode> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_read = store.read().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let rms = ReadingModeStore::extract_from_store(store_read.deref())?;
        let _ = watches.reading_mode.send_data(rms.clone());
        Ok(rms.into())
    }
    pub async fn get_page_direction(&self, ctx: &Context<'_>) -> Result<Direction> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_read = store.read().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let pds = ReadingDirectionStore::extract_from_store(store_read.deref())?;
        let _ = watches.page_direction.send_data(pds.clone());
        Ok(pds.into())
    }
    pub async fn get_sidebar_direction(&self, ctx: &Context<'_>) -> Result<Direction> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_read = store.read().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let sds = SidebarDirectionStore::extract_from_store(store_read.deref())?;
        let _ = watches.sidebar_direction.send_data(sds.clone());
        Ok(sds.into())
    }
    pub async fn get_chapter_languages(&self, ctx: &Context<'_>) -> Result<Vec<Language>> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_read = store.read().await;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let cls = ChapterLanguagesStore::extract_from_store(store_read.deref())?;
        let _ = watches.chapter_languages.send_data(cls.clone());
        Ok(cls.into())
    }
    pub async fn get_default_content_profile(&self, ctx: &Context<'_>) -> Result<ContentProfile> {
        let stream = UserOptionSubscriptions
            .listen_to_content_profile_default(ctx)
            .await?;
        let mut stream = Box::pin(stream);
        stream.next().await.ok_or(crate::Error::EndStream)
    }
    pub async fn get_offline_config(&self, _ctx: &Context<'_>) -> OfflineConfigObject {
        OfflineConfigObject
    }
    pub async fn get_auth_date_time_limit(
        &self,
        ctx: &Context<'_>,
    ) -> Result<Option<MangaDexDateTime>> {
        let store = get_store::<tauri::Wry>(ctx)?;
        let store_read = store.read().await;
        Ok(RefreshTokenStore::extract_from_store(&*store_read)?
            .as_ref()
            .map(|d| d.expires_in))
    }
}
