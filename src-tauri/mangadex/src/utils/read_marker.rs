use std::collections::HashMap;

use mangadex_api_schema_rust::v5::MangaReadMarkers;
use tauri::{Manager, Runtime};
use uuid::Uuid;

use crate::utils::traits_utils::MangadexTauriManagerExt;

pub async fn has_title_read<M, R>(app: &M, titles: Vec<Uuid>) -> crate::Result<HashMap<Uuid, bool>>
where
    M: Manager<R> + Sync,
    R: Runtime,
{
    let client = app.get_mangadex_client_with_auth_refresh().await?;
    let res = client
        .manga()
        .read()
        .get()
        .manga_ids(titles)
        .grouped(true)
        .send()
        .await?;
    match res {
        MangaReadMarkers::Grouped(g) => Ok(g
            .data
            .into_iter()
            .map(|(k, v)| (k, !v.is_empty()))
            .collect()),
        _ => Err(crate::Error::GotReadMarkersUnGrouped),
    }
}
