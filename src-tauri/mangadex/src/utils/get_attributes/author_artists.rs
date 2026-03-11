use eureka_mmanager::prelude::MangaDataPullAsyncTrait;
use mangadex_api_schema_rust::v5::{AuthorAttributes, RelatedAttributes};
use mangadex_api_types_rust::RelationshipType;
use tauri::{AppHandle, Runtime};
use uuid::Uuid;

use crate::utils::traits_utils::MangadexTauriManagerExt;

pub async fn get_author_artist_id_attributes<R: Runtime>(
    app: AppHandle<R>,
    author_id: Uuid,
) -> crate::Result<AuthorAttributes> {
    {
        let mofas = app.get_offline_app_state()?;
        let read = mofas.read().await;
        if let Some(offline_app_state) = read.as_ref() {
            let maybe_attr = offline_app_state
                .app_state
                .get_manga_list()
                .await?
                .flatten()
                .find_map(|manga_entry| {
                    manga_entry.relationships.into_iter().find_map(|d| {
                        if d.id == author_id
                            && matches!(
                                d.type_,
                                RelationshipType::Artist | RelationshipType::Author
                            )
                            && let Some(RelatedAttributes::Author(author_attr)) = d.attributes
                        {
                            Some(author_attr)
                        } else {
                            None
                        }
                    })
                });
            if let Some(attr) = maybe_attr {
                return Ok(attr);
            }
        }
    }
    let client = app.get_mangadex_client()?;
    Ok(client
        .author()
        .id(author_id)
        .get()
        .send()
        .await?
        .data
        .attributes)
}
