use std::collections::{HashMap, HashSet};

use eureka_mmanager::prelude::ChapterDataPullAsyncTrait;
use mangadex_api_input_types::user::list::UserListParam;
use mangadex_api_schema_rust::v5::{RelatedAttributes, UserAttributes};
use mangadex_api_types_rust::RelationshipType;
use tauri::{AppHandle, Runtime};
use uuid::Uuid;

use crate::utils::{splittable_param::SendSplitted, traits_utils::MangadexTauriManagerExt};

pub async fn get_user_ids_attributes<R: Runtime>(
    app: AppHandle<R>,
    user_ids: &HashSet<Uuid>,
) -> crate::Result<HashMap<Uuid, UserAttributes>> {
    let client = app.get_mangadex_client_with_auth_refresh().await?;
    if let Ok(res) = (UserListParam {
        user_ids: user_ids.iter().cloned().collect(),
        limit: None,
        offset: None,
        order: None,
        username: None,
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
            let user_ttrs = offline_app_state
                .app_state
                .get_chapters()
                .await?
                .flatten()
                .flat_map(|user_entry| {
                    user_entry.relationships.into_iter().find_map(|d| {
                        if user_ids.contains(&d.id)
                            && matches!(d.type_, RelationshipType::User)
                            && let Some(RelatedAttributes::User(user_attr)) = d.attributes
                        {
                            Some((d.id, user_attr))
                        } else {
                            None
                        }
                    })
                })
                .collect::<HashMap<Uuid, UserAttributes>>();
            return Ok(user_ttrs);
        }
    }
    Err(crate::Error::FetchUserAttributes)
}

pub async fn get_user_id_attributes<R: Runtime>(
    app: AppHandle<R>,
    user_id: Uuid,
) -> crate::Result<UserAttributes> {
    let client = app.get_mangadex_client()?;
    if let Ok(res) = client.user().id(user_id).get().send().await {
        return Ok(res.data.attributes);
    }
    {
        let mofas = app.get_offline_app_state()?;
        let read = mofas.read().await;
        if let Some(offline_app_state) = read.as_ref() {
            let user_ttrs = offline_app_state
                .app_state
                .get_chapters()
                .await?
                .flatten()
                .find_map(|user_entry| {
                    user_entry.relationships.into_iter().find_map(|d| {
                        if user_id == d.id
                            && matches!(d.type_, RelationshipType::User)
                            && let Some(RelatedAttributes::User(user_attr)) = d.attributes
                        {
                            Some(user_attr)
                        } else {
                            None
                        }
                    })
                });
            return user_ttrs.ok_or(crate::Error::UserNotFound(user_id));
        }
    }
    Err(crate::Error::FetchUserAttributes)
}
