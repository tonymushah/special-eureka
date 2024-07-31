use crate::Result;
use async_graphql::{Context, Object};
use mangadex_api_input_types::read_marker::batch_read_marker::MarkChapterBatchParam;

use crate::utils::{
    get_mangadex_client_from_graphql_context_with_auth_refresh, get_watches_from_graphql_context,
    watch::SendData,
};

#[derive(Debug, Clone, Copy)]
pub struct ReadMarkerMutations;

#[Object]
impl ReadMarkerMutations {
    pub async fn manga_read_markers_batch(
        &self,
        ctx: &Context<'_>,
        params: MarkChapterBatchParam,
    ) -> Result<bool> {
        let watches = get_watches_from_graphql_context::<tauri::Wry>(ctx)?;
        let client =
            get_mangadex_client_from_graphql_context_with_auth_refresh::<tauri::Wry>(ctx).await?;
        params.clone().send(&client).await?;
        params.chapter_ids_read.iter().for_each(|id| {
            let _ = watches.read_marker.send_data((*id, true));
        });
        params.chapter_ids_unread.iter().for_each(|id| {
            let _ = watches.read_marker.send_data((*id, false));
        });
        Ok(true)
    }
}
