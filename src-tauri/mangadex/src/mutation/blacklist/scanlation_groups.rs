use std::borrow::Cow;

use async_graphql::{Context, Object};
use diesel::prelude::*;
use tokio::task::spawn_blocking;
use uuid::Uuid;

use crate::{
    objects::blacklist::scanlation_groups::BlacklistedScanlationGroupObject,
    utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
};

#[derive(Debug, Insertable)]
#[diesel(
	table_name = mangadex_blacklist_raw::schema::scanlation_groups,
	check_for_backend(diesel::sqlite::Sqlite)
)]
struct InsertScanlationGroup<'a> {
    group_id: &'a uuid::Bytes,
    group_name: Cow<'a, str>,
}
pub struct BlacklistScanlationGroupsMutations;

impl BlacklistScanlationGroupsMutations {
    pub async fn inner_block_many(
        &self,
        ctx: &Context<'_>,
        scanlation_group_ids: Vec<Uuid>,
    ) -> crate::Result<Vec<BlacklistedScanlationGroupObject>> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();

        spawn_blocking(move || -> crate::Result<_> {
            use mangadex_blacklist_raw::schema::scanlation_groups::dsl::*;

            let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
            connection.transaction::<Vec<_>, crate::Error, _>(|connection| {
                scanlation_group_ids
                    .iter()
                    .map(|scanlation_group_id| -> crate::Result<_> {
                        Ok(diesel::insert_into(scanlation_groups)
                            .values(InsertScanlationGroup {
                                group_id: scanlation_group_id.as_bytes(),
                                group_name: todo!(),
                            })
                            .returning(BlacklistedScanlationGroupObject::as_returning())
                            .get_result(connection)?)
                    })
                    .collect()
            })
        })
        .await?
    }
    pub async fn inner_unblock_many(
        &self,
        ctx: &Context<'_>,
        scanlation_group_ids: Vec<Uuid>,
    ) -> crate::Result<Vec<BlacklistedScanlationGroupObject>> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();

        spawn_blocking(move || -> crate::Result<_> {
            use mangadex_blacklist_raw::schema::scanlation_groups::dsl::*;

            let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
            Ok(diesel::delete(
                scanlation_groups.filter(
                    group_id.eq_any(
                        scanlation_group_ids
                            .iter()
                            .map(|scanlation_group_id| scanlation_group_id.as_bytes())
                            .collect::<Vec<_>>(),
                    ),
                ),
            )
            .returning(BlacklistedScanlationGroupObject::as_returning())
            .get_results(&mut connection)?)
        })
        .await?
    }
}

#[Object]
impl BlacklistScanlationGroupsMutations {
    pub async fn block_one(
        &self,
        ctx: &Context<'_>,
        scanlation_group_id: Uuid,
    ) -> crate::error::wrapped::Result<BlacklistedScanlationGroupObject> {
        Ok(self
            .inner_block_many(ctx, vec![scanlation_group_id])
            .await?
            .into_iter()
            .next()
            .ok_or(crate::Error::FirstValueExpected)?)
    }
    pub async fn block_many(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1))] scanlation_group_ids: Vec<Uuid>,
    ) -> crate::error::wrapped::Result<Vec<BlacklistedScanlationGroupObject>> {
        Ok(self.inner_block_many(ctx, scanlation_group_ids).await?)
    }
    pub async fn unblock_one(
        &self,
        ctx: &Context<'_>,
        scanlation_group_id: Uuid,
    ) -> crate::error::wrapped::Result<BlacklistedScanlationGroupObject> {
        Ok(self
            .inner_unblock_many(ctx, vec![scanlation_group_id])
            .await?
            .into_iter()
            .next()
            .ok_or(crate::Error::FirstValueExpected)?)
    }
    pub async fn unblock_many(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1))] scanlation_group_ids: Vec<Uuid>,
    ) -> crate::error::wrapped::Result<Vec<BlacklistedScanlationGroupObject>> {
        Ok(self.inner_unblock_many(ctx, scanlation_group_ids).await?)
    }
}
