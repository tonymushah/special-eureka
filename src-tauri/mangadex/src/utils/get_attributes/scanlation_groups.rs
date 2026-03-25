use std::collections::{HashMap, HashSet};

use eureka_mmanager::prelude::ChapterDataPullAsyncTrait;
use mangadex_api_input_types::scanlation_group::list::ScanlationGroupListParams;
use mangadex_api_schema_rust::v5::{RelatedAttributes, ScanlationGroupAttributes};
use mangadex_api_types_rust::RelationshipType;
use tauri::{AppHandle, Runtime};
use uuid::Uuid;

use crate::utils::{splittable_param::SendSplitted, traits_utils::MangadexTauriManagerExt};

pub async fn get_scanlation_group_id_attributes<R: Runtime>(
    app: AppHandle<R>,
    scanlation_group_ids: &HashSet<Uuid>,
) -> crate::Result<HashMap<Uuid, ScanlationGroupAttributes>> {
    let client = app.get_mangadex_client()?;
    if let Ok(res) = (ScanlationGroupListParams {
        group_ids: scanlation_group_ids.iter().cloned().collect(),
        limit: None,
        offset: None,
        name: None,
        order: None,
        includes: vec![],
        focused_language: None,
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
                .get_chapters()
                .await?
                .flatten()
                .flat_map(|group_entry| {
                    group_entry.relationships.into_iter().find_map(|d| {
                        if scanlation_group_ids.contains(&d.id)
                            && matches!(d.type_, RelationshipType::ScanlationGroup)
                            && let Some(RelatedAttributes::ScanlationGroup(scan_attr)) =
                                d.attributes
                        {
                            Some((d.id, scan_attr))
                        } else {
                            None
                        }
                    })
                })
                .collect::<HashMap<Uuid, ScanlationGroupAttributes>>();
            return Ok(authors_ttrs);
        }
    }
    Err(crate::Error::FetchScanlationGroupsAttributes)
}
