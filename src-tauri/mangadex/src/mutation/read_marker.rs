use async_graphql::{Context, EmptyMutation, Object, Result};
use mangadex_api_input_types::read_marker::batch_read_marker::MarkChapterBatchParam;

use crate::utils::get_mangadex_client_from_graphql_context;

#[derive(Debug, Clone, Copy)]
pub struct ReadMarkerMutations;

#[Object]
impl ReadMarkerMutations {
    pub async fn manga_read_markers_batch(
        &self,
        ctx: &Context<'_>,
        params: MarkChapterBatchParam,
    ) -> Result<EmptyMutation> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        params.send(&client).await?;
        Ok(EmptyMutation)
    }
}
