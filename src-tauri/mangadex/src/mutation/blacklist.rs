use async_graphql::{Context, Object};
use diesel::prelude::*;
use tokio::task::spawn_blocking;
use uuid::Uuid;

use crate::{objects::blacklist::authors::BlacklistedAuthorObject, utils::traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt}};

pub struct BlacklistMutations;

#[derive(Debug, Insertable)]
#[diesel(
	table_name = mangadex_blacklist_raw::schema::authors_artists, 
	check_for_backend(diesel::sqlite::Sqlite)
)]
struct InsertAuthor<'a> {
	author_id: &'a uuid::Bytes,
	author_name: &'a str
}

#[Object]
impl BlacklistMutations {
	pub async fn block_authors_artists(&self, ctx: &Context<'_>, author_id: Uuid) -> crate::Result<BlacklistedAuthorObject> {
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
	pub async fn unblock_authors_artists(&self, ctx: &Context<'_>, author_id: Uuid) -> crate::Result<BlacklistedAuthorObject> {
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
}