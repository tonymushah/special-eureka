use std::{borrow::Cow, collections::HashSet};

use async_graphql::{Context, Object};
use diesel::prelude::*;
use tokio::task::spawn_blocking;
use uuid::Uuid;

use crate::{
    blacklist::emit_blacklist_change,
    objects::blacklist::authors::BlacklistedAuthorObject,
    utils::{
        get_attributes::author_artists::get_author_artist_id_attributes,
        traits_utils::{MangadexAsyncGraphQLContextExt, MangadexTauriManagerExt},
    },
};

#[derive(Debug, Insertable)]
#[diesel(
	table_name = mangadex_blacklist_raw::schema::authors_artists,
	check_for_backend(diesel::sqlite::Sqlite)
)]
struct InsertAuthor<'a> {
    author_id: &'a uuid::Bytes,
    author_name: Cow<'a, str>,
}

pub struct BlacklistAuthorArtistsMutations;

impl BlacklistAuthorArtistsMutations {
    pub async fn inner_block_many(
        &self,
        ctx: &Context<'_>,
        author_ids: Vec<Uuid>,
    ) -> crate::Result<Vec<BlacklistedAuthorObject>> {
        let author_ids: HashSet<_> = author_ids.into_iter().collect();
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();

        let attrs = {
            let app_handle = app_handle.clone();
            get_author_artist_id_attributes(app_handle, &author_ids).await?
        };
        let res = {
            let app_handle = app_handle.clone();
            spawn_blocking(move || -> crate::Result<_> {
                use mangadex_blacklist_raw::schema::authors_artists::dsl::*;

                let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
                connection.transaction::<Vec<_>, crate::Error, _>(|connection| {
                    author_ids
                        .into_iter()
                        .map(|id| -> crate::Result<_> {
                            Ok(diesel::insert_into(authors_artists)
                                .values(InsertAuthor {
                                    author_id: id.as_bytes(),
                                    author_name: attrs
                                        .get(&id)
                                        .ok_or(crate::Error::AuthorNotFound(id))?
                                        .name
                                        .as_str()
                                        .into(),
                                })
                                .returning(BlacklistedAuthorObject::as_returning())
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
        author_ids: Vec<Uuid>,
    ) -> crate::Result<Vec<BlacklistedAuthorObject>> {
        let app_handle = ctx.get_app_handle::<tauri::Wry>()?.clone();
        let res = {
            let app_handle = app_handle.clone();
            spawn_blocking(move || -> crate::Result<_> {
                use mangadex_blacklist_raw::schema::authors_artists::dsl::*;

                let mut connection = app_handle.blacklist_database_pool()?.get_connection()?;
                Ok(diesel::delete(
                    authors_artists.filter(
                        author_id.eq_any(
                            author_ids
                                .iter()
                                .map(|id| id.as_bytes())
                                .collect::<Vec<_>>(),
                        ),
                    ),
                )
                .returning(BlacklistedAuthorObject::as_returning())
                .get_results(&mut connection)?)
            })
            .await??
        };
        emit_blacklist_change(&app_handle)?;
        Ok(res)
    }
}

#[Object]
impl BlacklistAuthorArtistsMutations {
    pub async fn block_one(
        &self,
        ctx: &Context<'_>,
        author_id: Uuid,
    ) -> crate::error::wrapped::Result<BlacklistedAuthorObject> {
        Ok(self
            .inner_block_many(ctx, vec![author_id])
            .await?
            .into_iter()
            .next()
            .ok_or(crate::Error::FirstValueExpected)?)
    }
    pub async fn block_many(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1))] author_ids: Vec<Uuid>,
    ) -> crate::error::wrapped::Result<Vec<BlacklistedAuthorObject>> {
        Ok(self.inner_block_many(ctx, author_ids).await?)
    }
    pub async fn unblock_one(
        &self,
        ctx: &Context<'_>,
        author_id: Uuid,
    ) -> crate::error::wrapped::Result<BlacklistedAuthorObject> {
        Ok(self
            .inner_unblock_many(ctx, vec![author_id])
            .await?
            .into_iter()
            .next()
            .ok_or(crate::Error::FirstValueExpected)?)
    }
    pub async fn unblock_many(
        &self,
        ctx: &Context<'_>,
        #[graphql(validator(min_items = 1))] author_ids: Vec<Uuid>,
    ) -> crate::error::wrapped::Result<Vec<BlacklistedAuthorObject>> {
        Ok(self.inner_unblock_many(ctx, author_ids).await?)
    }
}
