use diesel_sqlite_utils::paginated::Paginate;
use mangadex_blacklist_raw::schema as dbschema;
use time::PrimitiveDateTime;
use tokio::task::spawn_blocking;
use uuid::Uuid;

use crate::{
    objects::blacklist::scanlation_groups::{
        BlacklistedScanlationGroupObject, BlacklistedScanlationGroupResults,
    },
    utils::{
        SortDirection,
        traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
    },
};
use async_graphql::{InputObject, Object};

pub struct BlacklistScanlationGroupsQueries;

#[derive(Debug, InputObject, Clone, Default)]
pub struct BlacklistScanlationGroupsListParam {
    pub offset: Option<u32>,
    pub limit: Option<u32>,
    pub scanlation_groups_name: Option<String>,
    pub inserted_since: Option<PrimitiveDateTime>,
    pub inserted_before: Option<PrimitiveDateTime>,
    pub order: Option<SortDirection>,
}

#[Object]
impl BlacklistScanlationGroupsQueries {
    pub async fn list(
        &self,
        ctx: &async_graphql::Context<'_>,
        params: Option<BlacklistScanlationGroupsListParam>,
    ) -> crate::Result<BlacklistedScanlationGroupResults> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        let params = params.unwrap_or_default();
        spawn_blocking(move || -> crate::Result<_> {
            use dbschema::scanlation_groups::dsl::*;
            use diesel::prelude::*;
            let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
            let offset = params.offset.unwrap_or_default();
            let limit = params
                .limit
                .unwrap_or(diesel_sqlite_utils::paginated::DEFAULT_PER_PAGE.try_into()?);
            let mut boxed = scanlation_groups
                .select(BlacklistedScanlationGroupObject::as_select())
                .into_boxed();
            match params.order.unwrap_or(SortDirection::Descending) {
                SortDirection::Ascending => boxed = boxed.order_by(insert_time.asc()),
                SortDirection::Descending => boxed = boxed.order_by(insert_time.desc()),
            };
            if let Some(name) = params
                .scanlation_groups_name
                .as_ref()
                .filter(|m| !m.is_empty())
            {
                boxed = boxed.filter(group_name.like(name));
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
            Ok(BlacklistedScanlationGroupResults {
                offset,
                limit,
                data,
                total: total.try_into()?,
            })
        })
        .await?
    }
    pub async fn get(
        &self,
        ctx: &async_graphql::Context<'_>,
        id: Uuid,
    ) -> crate::Result<BlacklistedScanlationGroupObject> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        spawn_blocking(move || -> crate::Result<_> {
            use dbschema::scanlation_groups::dsl::*;
            use diesel::prelude::*;
            let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;

            Ok(scanlation_groups
                .select(BlacklistedScanlationGroupObject::as_select())
                .filter(group_id.eq(id.as_bytes()))
                .first(&mut connection)?)
        })
        .await?
    }
    pub async fn get_by_ids(
        &self,
        ctx: &async_graphql::Context<'_>,
        #[graphql(validator(min_items = 1))] ids: Vec<Uuid>,
    ) -> crate::Result<Vec<BlacklistedScanlationGroupObject>> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        spawn_blocking(move || -> crate::Result<_> {
            use dbschema::scanlation_groups::dsl::*;
            use diesel::prelude::*;
            let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;

            Ok(scanlation_groups
                .select(BlacklistedScanlationGroupObject::as_select())
                .filter(
                    group_id.eq_any(
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
