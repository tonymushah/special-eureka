use std::borrow::Cow;

use async_graphql::{Context, Object};
use diesel::prelude::*;
use tokio::task::spawn_blocking;
use uuid::Uuid;

use crate::{
    objects::blacklist::users::BlacklistedUserObject,
    utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
};

pub struct BlacklistedUsersMutations;

#[derive(Debug, Insertable)]
#[diesel(
	table_name = mangadex_blacklist_raw::schema::users,
	check_for_backend(diesel::sqlite::Sqlite)
)]
struct InsertUser<'a> {
    user_id: &'a uuid::Bytes,
    username: Cow<'a, str>,
}

impl BlacklistedUsersMutations {
    pub async fn inner_block_many(
        &self,
        ctx: &Context<'_>,
        user_ids: Vec<Uuid>,
    ) -> crate::Result<Vec<BlacklistedUserObject>> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        spawn_blocking(move || -> crate::Result<_> {
            use mangadex_blacklist_raw::schema::users::dsl::*;

            let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
            connection.transaction::<Vec<_>, crate::Error, _>(|connection| {
                user_ids
                    .into_iter()
                    .map(|id| -> crate::Result<_> {
                        Ok(diesel::insert_into(users)
                            .values(InsertUser {
                                user_id: id.as_bytes(),
                                username: todo!(),
                            })
                            .returning(BlacklistedUserObject::as_returning())
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
        user_ids: Vec<Uuid>,
    ) -> crate::Result<Vec<BlacklistedUserObject>> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        spawn_blocking(move || -> crate::Result<_> {
            use mangadex_blacklist_raw::schema::users::dsl::*;

            let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
            Ok(diesel::delete(users.filter(
                user_id.eq_any(user_ids.iter().map(|id| id.as_bytes()).collect::<Vec<_>>()),
            ))
            .returning(BlacklistedUserObject::as_returning())
            .get_results(&mut connection)?)
        })
        .await?
    }
}

#[Object]
impl BlacklistedUsersMutations {
    pub async fn block_one(
        &self,
        ctx: &Context<'_>,
        user_id: Uuid,
    ) -> crate::error::wrapped::Result<BlacklistedUserObject> {
        Ok(self
            .inner_block_many(ctx, vec![user_id])
            .await?
            .into_iter()
            .next()
            .ok_or(crate::Error::FirstValueExpected)?)
    }
    pub async fn block_many(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1))] user_ids: Vec<Uuid>,
    ) -> crate::error::wrapped::Result<Vec<BlacklistedUserObject>> {
        Ok(self.inner_block_many(ctx, user_ids).await?)
    }
    pub async fn unblock_one(
        &self,
        ctx: &Context<'_>,
        user_id: Uuid,
    ) -> crate::error::wrapped::Result<BlacklistedUserObject> {
        Ok(self
            .inner_unblock_many(ctx, vec![user_id])
            .await?
            .into_iter()
            .next()
            .ok_or(crate::Error::FirstValueExpected)?)
    }
    pub async fn unblock_many(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1))] user_ids: Vec<Uuid>,
    ) -> crate::error::wrapped::Result<Vec<BlacklistedUserObject>> {
        Ok(self.inner_unblock_many(ctx, user_ids).await?)
    }
}
