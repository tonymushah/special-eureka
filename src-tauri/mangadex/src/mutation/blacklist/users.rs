use std::{borrow::Cow, collections::HashSet};

use async_graphql::{Context, Object};
use diesel::prelude::*;
use tokio::task::spawn_blocking;
use uuid::Uuid;

use crate::{
    blacklist::emit_blacklist_change,
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
        let user_ids = user_ids.into_iter().collect::<HashSet<_>>();
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        let maybe_users = {
            let app_handle = app_handle.clone();
            crate::utils::get_attributes::users::get_user_ids_attributes(app_handle, &user_ids)
                .await
                .ok()
        };
        let res = {
            let app_handle = app_handle.clone();
            spawn_blocking(move || -> crate::Result<_> {
                use mangadex_blacklist_raw::schema::users::dsl::*;

                let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
                connection.transaction::<Vec<_>, crate::Error, _>(|connection| {
                    user_ids
                        .into_iter()
                        .map(|id| -> crate::Result<_> {
                            let app = app_handle.clone();
                            Ok(diesel::insert_into(users)
                                .values(InsertUser {
                                    user_id: id.as_bytes(),
                                    username: if let Some(map) = maybe_users.as_ref() {
                                        map.get(&id)
                                            .ok_or(crate::Error::UserNotFound(id))?
                                            .username
                                            .as_str()
                                            .into()
                                    } else {
                                        let _id = id;
                                        crate::utils::try_block_on(async move {
                                        crate::utils::get_attributes::users::get_user_id_attributes(
                                            app, _id,
                                        )
                                        .await
                                    })??
                                    .username
                                    .into()
                                    },
                                })
                                .returning(BlacklistedUserObject::as_returning())
                                .get_result(connection)?)
                        })
                        .collect()
                })
            })
            .await??
        };
        emit_blacklist_change(&app_handle)?;
        Ok(res)
    }

    pub async fn inner_unblock_many(
        &self,
        ctx: &Context<'_>,
        user_ids: Vec<Uuid>,
    ) -> crate::Result<Vec<BlacklistedUserObject>> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        let res = {
            let app_handle = app_handle.clone();
            spawn_blocking(move || -> crate::Result<_> {
                use mangadex_blacklist_raw::schema::users::dsl::*;

                let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
                Ok(diesel::delete(users.filter(
                    user_id.eq_any(user_ids.iter().map(|id| id.as_bytes()).collect::<Vec<_>>()),
                ))
                .returning(BlacklistedUserObject::as_returning())
                .get_results(&mut connection)?)
            })
            .await??
        };
        emit_blacklist_change(&app_handle)?;
        Ok(res)
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
