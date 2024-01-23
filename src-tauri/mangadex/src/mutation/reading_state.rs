use async_graphql::{Context, Error, Object, Result};
use uuid::Uuid;

use crate::utils::{
    get_watches_from_graphql_context,
    watch::{
        reading_state::data::{ReadingState, ReadingStateEnum},
        SendData, WatcherInnerData,
    },
};

#[derive(Debug, Clone, Copy)]
pub struct ReadingStateMutations;

#[Object]
impl ReadingStateMutations {
    pub async fn set_page(
        &self,
        ctx: &Context<'_>,
        chapter_id: Uuid,
        state: ReadingStateEnum,
        page: Option<u32>,
    ) -> Result<ReadingState> {
        let state = match state {
            ReadingStateEnum::Previous => ReadingState::Previous,
            ReadingStateEnum::Current => {
                ReadingState::Current(page.ok_or(Error::new("the page should be setted"))?)
            }
            ReadingStateEnum::Next => ReadingState::Next,
        };
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        watches.reading_state.send_data(WatcherInnerData {
            id: chapter_id,
            attributes: state,
        })?;
        Ok(state)
    }
}
