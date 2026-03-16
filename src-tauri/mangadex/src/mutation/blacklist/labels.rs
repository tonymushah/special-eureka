use std::borrow::Cow;

use async_graphql::{Context, InputObject, Object};
use diesel::prelude::*;
use tokio::task::spawn_blocking;
use uuid::Uuid;

use crate::{
    objects::blacklist::label::BlacklistLabel,
    utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
};

pub struct BlacklistLabelsMutations;

#[derive(Debug, Clone, InputObject)]
pub struct CreateBlacklistLabelParam {
    pub label_name: String,
    pub description: Option<String>,
    // TODO implement this if it required by the UI
    // pub authors_artists_ids: Option<Vec<Uuid>>,
    // pub scanlation_groups_ids: Option<Vec<Uuid>>,
    // pub user_ids: Option<Vec<Uuid>>,
}

#[derive(Debug, Insertable)]
#[diesel(
	check_for_backend(diesel::sqlite::Sqlite),
	table_name = mangadex_blacklist_raw::schema::labels
)]
struct InsertLabel<'a> {
    label_id: Cow<'a, uuid::Bytes>,
    name: Cow<'a, str>,
    description: Option<Cow<'a, str>>,
}

#[derive(Debug, Insertable)]
#[diesel(
	check_for_backend(diesel::sqlite::Sqlite),
	table_name = mangadex_blacklist_raw::schema::authors_labels
)]
struct InsertLabelLinkAuthors<'a> {
    author: Cow<'a, uuid::Bytes>,
    label: Cow<'a, uuid::Bytes>,
    notes: Option<Cow<'a, str>>,
}

#[derive(Debug, Insertable)]
#[diesel(
	check_for_backend(diesel::sqlite::Sqlite),
	table_name = mangadex_blacklist_raw::schema::scanlation_groups_labels
)]
struct InsertLabelLinkScanlationGroup<'a> {
    scanlation_group: Cow<'a, uuid::Bytes>,
    label: Cow<'a, uuid::Bytes>,
    notes: Option<Cow<'a, str>>,
}

#[derive(Debug, Insertable)]
#[diesel(
	check_for_backend(diesel::sqlite::Sqlite),
	table_name = mangadex_blacklist_raw::schema::users_labels
)]
struct InsertLabelLinkUser<'a> {
    user: Cow<'a, uuid::Bytes>,
    label: Cow<'a, uuid::Bytes>,
    notes: Option<Cow<'a, str>>,
}

#[Object]
impl BlacklistLabelsMutations {
    pub async fn create_label(
        &self,
        ctx: &Context<'_>,
        param: CreateBlacklistLabelParam,
    ) -> crate::error::wrapped::Result<BlacklistLabel> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        let _param = param.clone();
        let label = spawn_blocking(move || -> crate::Result<_> {
            use mangadex_blacklist_raw::schema::labels::dsl::*;
            let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
            let _label_id = Uuid::now_v7();
            Ok(diesel::insert_into(labels)
                .values(InsertLabel {
                    label_id: Cow::Borrowed(_label_id.as_bytes()),
                    name: _param.label_name.as_str().into(),
                    description: _param.description.as_ref().map(|s| s.as_str().into()),
                })
                .returning(BlacklistLabel::as_returning())
                .get_result(&mut connection)?)
        })
        .await??;
        Ok(label)
    }
    pub async fn delete_labels(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1))] label_ids: Vec<Uuid>,
    ) -> crate::error::wrapped::Result<Vec<BlacklistLabel>> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        let label_ids: Vec<Vec<u8>> = label_ids
            .into_iter()
            .map(|d| d.as_bytes().to_vec())
            .collect();
        let label = spawn_blocking(move || -> crate::Result<_> {
            use mangadex_blacklist_raw::schema::labels::dsl::*;
            let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
            Ok(diesel::delete(labels.filter(label_id.eq_any(label_ids)))
                .returning(BlacklistLabel::as_returning())
                .get_results(&mut connection)?)
        })
        .await??;
        Ok(label)
    }

    pub async fn link_authors_artists(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1))] label_ids: Vec<Uuid>,
        #[graphql(validator(min_items = 1))] author_ids: Vec<Uuid>,
        notes: Option<String>,
    ) -> crate::error::wrapped::Result<Option<bool>> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        let _notes = notes;
        spawn_blocking(move || -> crate::Result<_> {
            use mangadex_blacklist_raw::schema::authors_labels::dsl::*;
            let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
            connection.transaction::<(), crate::Error, _>(|connection| {
                for label_ in &label_ids {
                    for author_id in &author_ids {
                        diesel::insert_into(authors_labels)
                            .values(InsertLabelLinkAuthors {
                                author: Cow::Borrowed(author_id.as_bytes()),
                                label: Cow::Borrowed(label_.as_bytes()),
                                notes: _notes.as_ref().map(|n| n.as_str().into()),
                            })
                            .execute(connection)?;
                    }
                }
                Ok(())
            })?;
            Ok(())
        })
        .await??;
        Ok(None)
    }
    pub async fn link_scanlation_groups(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1))] label_ids: Vec<Uuid>,
        #[graphql(validator(min_items = 1))] scanlation_groups_ids: Vec<Uuid>,
        notes: Option<String>,
    ) -> crate::Result<Option<bool>> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        let _notes = notes;
        spawn_blocking(move || -> crate::Result<_> {
            use mangadex_blacklist_raw::schema::scanlation_groups_labels::dsl::*;
            let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
            connection.transaction::<(), crate::Error, _>(|connection| {
                for label_ in &label_ids {
                    for group_id in &scanlation_groups_ids {
                        diesel::insert_into(scanlation_groups_labels)
                            .values(InsertLabelLinkScanlationGroup {
                                scanlation_group: Cow::Borrowed(group_id.as_bytes()),
                                label: Cow::Borrowed(label_.as_bytes()),
                                notes: _notes.as_ref().map(|n| n.as_str().into()),
                            })
                            .execute(connection)?;
                    }
                }
                Ok(())
            })?;
            Ok(())
        })
        .await??;
        Ok(None)
    }
    pub async fn link_users(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1))] label_ids: Vec<Uuid>,
        #[graphql(validator(min_items = 1))] user_ids: Vec<Uuid>,
        notes: Option<String>,
    ) -> crate::Result<Option<bool>> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        let _notes = notes;
        spawn_blocking(move || -> crate::Result<_> {
            use mangadex_blacklist_raw::schema::users_labels::dsl::*;
            let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
            connection.transaction::<(), crate::Error, _>(|connection| {
                for label_ in &label_ids {
                    for user_id in &user_ids {
                        diesel::insert_into(users_labels)
                            .values(InsertLabelLinkUser {
                                user: Cow::Borrowed(user_id.as_bytes()),
                                label: Cow::Borrowed(label_.as_bytes()),
                                notes: _notes.as_ref().map(|n| n.as_str().into()),
                            })
                            .execute(connection)?;
                    }
                }
                Ok(())
            })?;
            Ok(())
        })
        .await??;
        Ok(None)
    }

    pub async fn unlink_authors_artists(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1))] label_ids: Vec<Uuid>,
        #[graphql(validator(min_items = 1))] author_ids: Vec<Uuid>,
    ) -> crate::error::wrapped::Result<Option<bool>> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        spawn_blocking(move || -> crate::Result<_> {
            use mangadex_blacklist_raw::schema::authors_labels::dsl::*;
            let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
            connection.transaction::<(), crate::Error, _>(|connection| {
                for label_ in &label_ids {
                    for author_id in &author_ids {
                        diesel::delete(authors_labels)
                            .filter(author.eq(author_id.as_bytes()))
                            .filter(label.eq(label_.as_bytes()))
                            .execute(connection)?;
                    }
                }
                Ok(())
            })?;
            Ok(())
        })
        .await??;
        Ok(None)
    }
    pub async fn unlink_scanlation_groups(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1))] label_ids: Vec<Uuid>,
        #[graphql(validator(min_items = 1))] scanlation_groups_ids: Vec<Uuid>,
    ) -> crate::Result<Option<bool>> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        spawn_blocking(move || -> crate::Result<_> {
            use mangadex_blacklist_raw::schema::scanlation_groups_labels::dsl::*;
            let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
            connection.transaction::<(), crate::Error, _>(|connection| {
                for label_ in &label_ids {
                    for group_id in &scanlation_groups_ids {
                        diesel::delete(scanlation_groups_labels)
                            .filter(label.eq(label_.as_bytes()))
                            .filter(scanlation_group.eq(group_id.as_bytes()))
                            .execute(connection)?;
                    }
                }
                Ok(())
            })?;
            Ok(())
        })
        .await??;
        Ok(None)
    }
    pub async fn unlink_users(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1))] label_ids: Vec<Uuid>,
        #[graphql(validator(min_items = 1))] user_ids: Vec<Uuid>,
    ) -> crate::Result<Option<bool>> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        spawn_blocking(move || -> crate::Result<_> {
            use mangadex_blacklist_raw::schema::users_labels::dsl::*;
            let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
            connection.transaction::<(), crate::Error, _>(|connection| {
                for label_ in &label_ids {
                    for user_id in &user_ids {
                        diesel::delete(users_labels)
                            .filter(user.eq(user_id.as_bytes()))
                            .filter(label.eq(label_.as_bytes()))
                            .execute(connection)?;
                    }
                }
                Ok(())
            })?;
            Ok(())
        })
        .await??;
        Ok(None)
    }
}
