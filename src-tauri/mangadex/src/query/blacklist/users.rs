use async_graphql::{InputObject, Object};
use diesel_sqlite_utils::paginated::Paginate;
use mangadex_blacklist_raw::schema as dbschema;
use time::PrimitiveDateTime;
use tokio::task::spawn_blocking;
use uuid::Uuid;

use crate::{
    objects::blacklist::users::{BlacklistedUserObject, BlacklistedUserResults},
    utils::{
        SortDirection,
        traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
    },
};

pub struct BlacklistUsersQueries;

#[derive(Debug, InputObject, Clone, Default)]
pub struct BlacklistUserListParam {
    pub offset: Option<u32>,
    pub limit: Option<u32>,
    pub username: Option<String>,
    pub inserted_since: Option<PrimitiveDateTime>,
    pub inserted_before: Option<PrimitiveDateTime>,
    pub order: Option<SortDirection>,
}

#[Object]
impl BlacklistUsersQueries {
    pub async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        params: Option<BlacklistUserListParam>,
    ) -> crate::Result<BlacklistedUserResults> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        let params = params.unwrap_or_default();
        spawn_blocking(move || -> crate::Result<_> {
            use dbschema::users::dsl::*;
            use diesel::prelude::*;
            let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
            let offset = params.offset.unwrap_or_default();
            let limit = params
                .limit
                .unwrap_or(diesel_sqlite_utils::paginated::DEFAULT_PER_PAGE.try_into()?);
            let mut boxed = users
                .select(BlacklistedUserObject::as_select())
                .into_boxed();
            match params.order.unwrap_or(SortDirection::Descending) {
                SortDirection::Ascending => boxed = boxed.order_by(insert_time.asc()),
                SortDirection::Descending => boxed = boxed.order_by(insert_time.desc()),
            };
            if let Some(name) = params.username.as_ref().filter(|m| !m.is_empty()) {
                boxed = boxed.filter(username.like(name));
            }
            if let Some(since) = params.inserted_since.as_ref() {
                boxed = boxed.filter(insert_time.gt(since));
            }
            if let Some(before) = params.inserted_before.as_ref() {
                boxed = boxed.filter(insert_time.lt(before));
            }
            let (data, total) = boxed
                .paginate(offset as i64, limit as i64)
                .load_data(&mut connection)?;
            Ok(BlacklistedUserResults {
                total: total.try_into()?,
                limit,
                offset,
                data,
            })
        })
        .await?
    }
    pub async fn get(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> crate::Result<BlacklistedUserObject> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        spawn_blocking(move || -> crate::Result<_> {
            use dbschema::users::dsl::*;
            use diesel::prelude::*;
            let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;

            Ok(users
                .select(BlacklistedUserObject::as_select())
                .filter(user_id.eq(id.as_bytes()))
                .first(&mut connection)?)
        })
        .await?
    }
    pub async fn get_by_ids(
        &self,
        ctx: &async_graphql::Context<'_>,
        #[graphql(validator(min_items = 1))] ids: Vec<Uuid>,
    ) -> crate::Result<Vec<BlacklistedUserObject>> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        spawn_blocking(move || -> crate::Result<_> {
            use dbschema::users::dsl::*;
            use diesel::prelude::*;
            let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
            Ok(users
                .select(BlacklistedUserObject::as_returning())
                .filter(
                    user_id.eq_any(
                        ids.into_iter()
                            .map(|d| Vec::from(d.as_bytes()))
                            .collect::<Vec<Vec<u8>>>(),
                    ),
                )
                .load(&mut connection)?)
        })
        .await?
    }
}
