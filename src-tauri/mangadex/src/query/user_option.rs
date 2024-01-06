use async_graphql::{Context, Object, Result};

use crate::{
    store::types::{
        enums::{
            direction::{
                reading::ReadingDirectionStore, sidebar::SidebarDirectionStore, Direction,
            },
            reading_mode::{ReadingMode, ReadingModeStore},
        },
        ExtractFromStore,
    },
    utils::{get_store, get_watches_from_graphql_context, watch::SendData},
};

#[derive(Debug, Clone, Copy)]
pub struct UserOptionQueries;

#[Object]
impl UserOptionQueries {
    pub async fn get_reading_mode(&self, ctx: &Context<'_>) -> Result<ReadingMode> {
        let store = get_store::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let rms = ReadingModeStore::extract_from_store(&store)?;
        watches.reading_mode.send_data(rms.clone())?;
        Ok(rms.into())
    }
    pub async fn get_page_direction(&self, ctx: &Context<'_>) -> Result<Direction> {
        let store = get_store::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let pds = ReadingDirectionStore::extract_from_store(&store)?;
        watches.page_direction.send_data(pds.clone())?;
        Ok(pds.into())
    }
    pub async fn get_sidebar_direction(&self, ctx: &Context<'_>) -> Result<Direction> {
        let store = get_store::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let sds = SidebarDirectionStore::extract_from_store(&store)?;
        watches.sidebar_direction.send_data(sds.clone())?;
        Ok(sds.into())
    }
}
