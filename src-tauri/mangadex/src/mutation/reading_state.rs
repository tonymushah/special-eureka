use crate::{Result, error::Error};
use async_graphql::{Context, Object};
use uuid::Uuid;

use crate::utils::{
    get_watches_from_graphql_context,
    watch::{
        SendData, WatcherInnerData,
        reading_state::data::{ReadingState, ReadingStateEnum},
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
                ReadingState::Current(page.ok_or(Error::ChapterReadingSetPage)?)
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
