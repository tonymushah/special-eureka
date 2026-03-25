use std::collections::{HashMap, HashSet};

use eureka_mmanager::prelude::MangaDataPullAsyncTrait;
use mangadex_api_input_types::author::list::AuthorListParams;
use mangadex_api_schema_rust::v5::{AuthorAttributes, RelatedAttributes};
use mangadex_api_types_rust::RelationshipType;
use tauri::{AppHandle, Runtime};
use uuid::Uuid;

use crate::utils::{splittable_param::SendSplitted, traits_utils::MangadexTauriManagerExt};

pub async fn get_author_artist_id_attributes<R: Runtime>(
    app: AppHandle<R>,
    author_ids: &HashSet<Uuid>,
) -> crate::Result<HashMap<Uuid, AuthorAttributes>> {
    let client = app.get_mangadex_client()?;
    if let Ok(res) = (AuthorListParams {
        author_ids: author_ids.iter().cloned().collect(),
        limit: None,
        offset: None,
        name: None,
        order: None,
        includes: vec![],
    }
    .send_splitted_default(&client)
    .await)
    {
        return Ok(res.data.into_iter().map(|o| (o.id, o.attributes)).collect());
    }
    {
        let mofas = app.get_offline_app_state()?;
        let read = mofas.read().await;
        if let Some(offline_app_state) = read.as_ref() {
            let authors_ttrs = offline_app_state
                .app_state
                .get_manga_list()
                .await?
                .flatten()
                .flat_map(|manga_entry| {
                    manga_entry.relationships.into_iter().find_map(|d| {
                        if author_ids.contains(&d.id)
                            && matches!(
                                d.type_,
                                RelationshipType::Artist | RelationshipType::Author
                            )
                            && let Some(RelatedAttributes::Author(author_attr)) = d.attributes
                        {
                            Some((d.id, author_attr))
                        } else {
                            None
                        }
                    })
                })
                .collect::<HashMap<Uuid, AuthorAttributes>>();
            return Ok(authors_ttrs);
        }
    }
    Err(crate::Error::FetchAuthorAttributes)
}
