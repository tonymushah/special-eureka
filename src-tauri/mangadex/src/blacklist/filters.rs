use std::collections::HashSet;

use mangadex_api_types_rust::RelationshipType;
use tauri::{AppHandle, Runtime};
use tokio::task::spawn_blocking;
use uuid::Uuid;

use crate::utils::traits_utils::MangadexTauriManagerExt;

pub async fn filter_author_artists_titles<R: Runtime>(
    app: AppHandle<R>,
    mut titles: Vec<crate::objects::manga::MangaObject>,
) -> crate::Result<Vec<crate::objects::manga::MangaObject>> {
    let black_listed: HashSet<Uuid> = {
        let author_ids = titles
            .iter()
            .flat_map(|t| match t {
                crate::objects::manga::MangaObject::WithRel(api_object) => Some(
                    api_object
                        .relationships
                        .iter()
                        .filter(|t| {
                            matches!(t.type_, RelationshipType::Artist | RelationshipType::Author)
                        })
                        .map(|d| d.id.as_bytes().to_vec()),
                ),
                // TODO make this available
                crate::objects::manga::MangaObject::WithoutRel(_) => None,
            })
            .flatten()
            .collect::<Vec<_>>();
        spawn_blocking(move || -> crate::Result<_> {
            use diesel::prelude::*;
            use mangadex_blacklist_raw::schema::authors_artists::dsl::*;

            let mut connection = app.blacklist_database_pool()?.get_connection()?;
            authors_artists
                .select(author_id)
                .filter(author_id.eq_any(author_ids))
                .load_iter::<Vec<u8>, diesel::connection::DefaultLoadingMode>(&mut connection)?
                .map(|bin| -> crate::Result<_> {
                    let bin = bin?;
                    Ok(Uuid::from_slice(&bin)?)
                })
                .collect::<Result<_, crate::Error>>()
        })
        .await??
    };
    titles.retain(|t| match t {
        crate::objects::manga::MangaObject::WithRel(api_object) => {
            !api_object.relationships.iter().any(|t| {
                matches!(t.type_, RelationshipType::Author | RelationshipType::Artist)
                    && black_listed.contains(&t.id)
            })
        }
        // TODO make this works
        crate::objects::manga::MangaObject::WithoutRel(_) => false,
    });
    titles.shrink_to_fit();
    Ok(titles)
}

pub async fn filter_scanlation_groups_chapters<R: Runtime>(
    app: AppHandle<R>,
    mut chapters: Vec<crate::objects::chapter::Chapter>,
) -> crate::Result<Vec<crate::objects::chapter::Chapter>> {
    let black_listed: HashSet<Uuid> = {
        let scanlation_group_ids = chapters
            .iter()
            .filter_map(|c| match c {
                crate::objects::chapter::Chapter::WithRelationship(api_object) => Some(
                    api_object
                        .relationships
                        .iter()
                        .filter(|c| matches!(c.type_, RelationshipType::ScanlationGroup))
                        .map(|c| c.id.as_bytes().to_vec()),
                ),
                crate::objects::chapter::Chapter::WithoutRelationship(_) => None,
            })
            .flatten()
            .collect::<Vec<_>>();
        spawn_blocking(move || -> crate::Result<_> {
            use diesel::prelude::*;
            use mangadex_blacklist_raw::schema::scanlation_groups::dsl::*;

            let mut connection = app.blacklist_database_pool()?.get_connection()?;
            scanlation_groups
                .select(group_id)
                .filter(group_id.eq_any(scanlation_group_ids))
                .load_iter::<Vec<u8>, diesel::connection::DefaultLoadingMode>(&mut connection)?
                .map(|bin| -> crate::Result<_> {
                    let bin = bin?;
                    Ok(Uuid::from_slice(&bin)?)
                })
                .collect::<Result<_, crate::Error>>()
        })
        .await??
    };
    chapters.retain(|c| match c {
        crate::objects::chapter::Chapter::WithRelationship(api_object) => {
            !api_object.relationships.iter().any(|o| {
                matches!(o.type_, RelationshipType::ScanlationGroup) && black_listed.contains(&o.id)
            })
        }
        crate::objects::chapter::Chapter::WithoutRelationship(_) => false,
    });
    chapters.shrink_to_fit();
    Ok(chapters)
}
