use async_graphql::{Context, Object, Result};

use crate::{
    store::types::{
        enums::{
            direction::{
                reading::ReadingDirectionStore, sidebar::SidebarDirectionStore, Direction,
            },
            reading_mode::{ReadingMode, ReadingModeStore},
        },
        ExtractFromStore, StoreCrud,
    },
    utils::{get_store, get_watches_from_graphql_context, watch::SendData},
};

#[derive(Debug, Clone, Copy)]
pub struct UserOptionMutations;

#[Object]
impl UserOptionMutations {
    pub async fn set_reading_mode(
        &self,
        ctx: &Context<'_>,
        mode: ReadingMode,
    ) -> Result<ReadingMode> {
        let mut store = get_store::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = ReadingModeStore::from(mode);
        inner.insert_and_save(&mut store)?;
        watches.reading_mode.send_data(inner)?;
        Ok(ReadingModeStore::extract_from_store(&store)?.into())
    }
    pub async fn set_page_direction(
        &self,
        ctx: &Context<'_>,
        direction: Direction,
    ) -> Result<Direction> {
        let mut store = get_store::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = ReadingDirectionStore::from(direction);
        inner.insert_and_save(&mut store)?;
        watches.page_direction.send_data(inner)?;
        Ok(ReadingDirectionStore::extract_from_store(&store)?.into())
    }
    pub async fn set_sidebar_direction(
        &self,
        ctx: &Context<'_>,
        direction: Direction,
    ) -> Result<Direction> {
        let mut store = get_store::<tauri::Wry>(ctx).await?;
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let inner = SidebarDirectionStore::from(direction);
        inner.insert_and_save(&mut store)?;
        watches.sidebar_direction.send_data(inner)?;
        Ok(SidebarDirectionStore::extract_from_store(&store)?.into())
    }
}
