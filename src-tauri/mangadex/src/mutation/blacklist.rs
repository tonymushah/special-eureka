use std::borrow::Cow;

use async_graphql::{Context, Object};
use diesel::prelude::*;
use tokio::task::spawn_blocking;
use uuid::Uuid;

use crate::{objects::blacklist::{authors::BlacklistedAuthorObject, scanlation_groups::BlacklistedScanlationGroupObject, users::BlacklistedUserObject}, utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt}};

pub struct BlacklistMutations;

#[derive(Debug, Insertable)]
#[diesel(
	table_name = mangadex_blacklist_raw::schema::authors_artists, 
	check_for_backend(diesel::sqlite::Sqlite)
)]
struct InsertAuthor<'a> {
	author_id: &'a uuid::Bytes,
	author_name: Cow<'a,str>
}

#[derive(Debug, Insertable)]
#[diesel(
	table_name = mangadex_blacklist_raw::schema::scanlation_groups, 
	check_for_backend(diesel::sqlite::Sqlite)
)]
struct InsertScanlationGroup<'a> {
	group_id: &'a uuid::Bytes,
	group_name: Cow<'a, str>
}

#[derive(Debug, Insertable)]
#[diesel(
	table_name = mangadex_blacklist_raw::schema::users, 
	check_for_backend(diesel::sqlite::Sqlite)
)]
struct InsertUser<'a> {
	user_id: &'a uuid::Bytes,
	username: Cow<'a, str>
}

#[Object]
impl BlacklistMutations {
	pub async fn block_author_artist(&self, ctx: &Context<'_>, author_id: Uuid) -> crate::Result<BlacklistedAuthorObject> {
		let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
		let id = author_id;
		spawn_blocking(move|| -> crate::Result<_> {
			use mangadex_blacklist_raw::schema::authors_artists::dsl::*;
			
			let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
			Ok(diesel::insert_into(authors_artists)
				.values(InsertAuthor {
							author_id: id.as_bytes(),
							author_name: todo!()
						})
				.returning(BlacklistedAuthorObject::as_returning())
				.get_result(&mut connection)?)
		}).await?
	}
	pub async fn block_authors_artists(&self, ctx: &Context<'_>, #[graphql(validator(min_items = 1))] author_ids: Vec<Uuid>) -> crate::Result<Vec<BlacklistedAuthorObject>> {
		let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();

		spawn_blocking(move|| -> crate::Result<_> {
			use mangadex_blacklist_raw::schema::authors_artists::dsl::*;
			
			let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
			connection.transaction::<Vec<_>, crate::Error, _>(|connection| {
				author_ids.into_iter().map(|id| -> crate::Result<_> {
					Ok(diesel::insert_into(authors_artists)
						.values(InsertAuthor {
							author_id: id.as_bytes(),
							author_name: todo!()
						})
					.returning(BlacklistedAuthorObject::as_returning())
					.get_result(connection)?)
				}).collect()
			})
		}).await?
	}
	pub async fn unblock_author_artist(&self, ctx: &Context<'_>, author_id: Uuid) -> crate::Result<BlacklistedAuthorObject> {
		let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
		let id = author_id;
		spawn_blocking(move|| -> crate::Result<_> {
			use mangadex_blacklist_raw::schema::authors_artists::dsl::*;
			
			let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
			Ok(diesel::delete(authors_artists.filter(author_id.eq(id.as_bytes())))
				.returning(BlacklistedAuthorObject::as_returning())
				.get_result(&mut connection)?)
		}).await?
	}
	pub async fn unblock_authors_artists(&self, ctx: &Context<'_>, #[graphql(validator(min_items = 1))] author_ids: Vec<Uuid>) -> crate::Result<Vec<BlacklistedAuthorObject>> {
		let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
		spawn_blocking(move|| -> crate::Result<_> {
			use mangadex_blacklist_raw::schema::authors_artists::dsl::*;
			
			let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
			Ok(diesel::delete(authors_artists
					.filter(author_id
						.eq_any(author_ids.iter().map(|id| id.as_bytes()).collect::<Vec<_>>())
					))
				.returning(BlacklistedAuthorObject::as_returning())
				.get_results(&mut connection)?)
		}).await?
	}
	
	pub async fn block_scanlation_group(&self, ctx: &Context<'_>, scanlation_group_id: Uuid) -> crate::Result<BlacklistedScanlationGroupObject> {
		let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();

		spawn_blocking(move|| -> crate::Result<_> {
			use mangadex_blacklist_raw::schema::scanlation_groups::dsl::*;
			
			let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
			Ok(diesel::insert_into(scanlation_groups)
				.values(InsertScanlationGroup {
							group_id: scanlation_group_id.as_bytes(),
							group_name: todo!()
						})
				.returning(BlacklistedScanlationGroupObject::as_returning())
				.get_result(&mut connection)?)
		}).await?
	}
	pub async fn block_scanlation_groups(&self, ctx: &Context<'_>, #[graphql(validator(min_items = 1))] scanlation_group_ids: Vec<Uuid>) -> crate::Result<Vec<BlacklistedScanlationGroupObject>> {
		let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();

		spawn_blocking(move|| -> crate::Result<_> {
			use mangadex_blacklist_raw::schema::scanlation_groups::dsl::*;
			
			let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
			connection.transaction::<Vec<_>, crate::Error, _>(|connection| {
				scanlation_group_ids.iter().map(|scanlation_group_id| -> crate::Result<_> {
					Ok(diesel::insert_into(scanlation_groups)
						.values(InsertScanlationGroup {
									group_id: scanlation_group_id.as_bytes(),
									group_name: todo!()
								})
						.returning(BlacklistedScanlationGroupObject::as_returning())
						.get_result(connection)?)
				}).collect()
			})
			
		}).await?
	}
	pub async fn unblock_scanlation_group(&self, ctx: &Context<'_>, scanlation_group_id:Uuid) -> crate::Result<BlacklistedScanlationGroupObject> {
		let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();

		spawn_blocking(move|| -> crate::Result<_> {
			use mangadex_blacklist_raw::schema::scanlation_groups::dsl::*;
			
			let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
			Ok(diesel::delete(scanlation_groups.filter(group_id.eq(scanlation_group_id.as_bytes())))
				.returning(BlacklistedScanlationGroupObject::as_returning())
				.get_result(&mut connection)?)
		}).await?
	}
	pub async fn unblock_scanlation_groups(&self, ctx: &Context<'_>, #[graphql(validator(min_items = 1))] scanlation_group_ids:Vec<Uuid>) -> crate::Result<BlacklistedScanlationGroupObject> {
		let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();

		spawn_blocking(move|| -> crate::Result<_> {
			use mangadex_blacklist_raw::schema::scanlation_groups::dsl::*;
			
			let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
			Ok(diesel::delete(scanlation_groups
					.filter(group_id
						.eq_any(scanlation_group_ids
							.iter()
							.map(|scanlation_group_id| scanlation_group_id.as_bytes())
							.collect::<Vec<_>>()
						)
					)
				)
				.returning(BlacklistedScanlationGroupObject::as_returning())
				.get_result(&mut connection)?)
		}).await?
	}
	
	pub async fn block_user(&self, ctx: &Context<'_>, user_id: Uuid) -> crate::Result<BlacklistedUserObject> {
		let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
		let id = user_id;
		spawn_blocking(move|| -> crate::Result<_> {
			use mangadex_blacklist_raw::schema::users::dsl::*;
			
			let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
			Ok(diesel::insert_into(users)
				.values(InsertUser {
							user_id: id.as_bytes(),
							username: todo!()
						})
				.returning(BlacklistedUserObject::as_returning())
				.get_result(&mut connection)?)
		}).await?
	}
	pub async fn block_users(&self, ctx: &Context<'_>, #[graphql(validator(min_items = 1))] user_ids: Vec<Uuid>) -> crate::Result<Vec<BlacklistedUserObject>> {
		let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
		spawn_blocking(move|| -> crate::Result<_> {
			use mangadex_blacklist_raw::schema::users::dsl::*;
			
			let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
			connection.transaction::<Vec<_>, crate::Error, _>(|connection| {
				user_ids.into_iter().map(|id| -> crate::Result<_> {
					Ok(diesel::insert_into(users)
						.values(InsertUser {
									user_id: id.as_bytes(),
									username: todo!()
								})
						.returning(BlacklistedUserObject::as_returning())
						.get_result(connection)?)
				}).collect()
			})
		}).await?
	}
	pub async fn unblock_user(&self, ctx: &Context<'_>, user_id: Uuid) -> crate::Result<BlacklistedUserObject> {
		let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
		let id = user_id;
		spawn_blocking(move|| -> crate::Result<_> {
			use mangadex_blacklist_raw::schema::users::dsl::*;
			
			let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
			Ok(diesel::delete(users.filter(user_id.eq(id.as_bytes())))
				.returning(BlacklistedUserObject::as_returning())
				.get_result(&mut connection)?)
		}).await?
	}
	pub async fn unblock_users(&self, ctx: &Context<'_>, #[graphql(validator(min_items = 1))] user_ids: Vec<Uuid>) -> crate::Result<Vec<BlacklistedUserObject>> {
		let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
		spawn_blocking(move|| -> crate::Result<_> {
			use mangadex_blacklist_raw::schema::users::dsl::*;
			
			let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
			Ok(diesel::delete(
					users
						.filter(
							user_id.eq_any(user_ids
								.iter()
								.map(|id| id.as_bytes())
								.collect::<Vec<_>>()
							)
						)
				)
				.returning(BlacklistedUserObject::as_returning())
				.get_results(&mut connection)?)
		}).await?
	}
}