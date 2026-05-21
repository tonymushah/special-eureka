mod types;

use std::{
    fs::create_dir_all,
    io::Cursor,
    sync::{Arc, LazyLock},
};

use anyhow::anyhow;
use async_graphql_parser::types::ExecutableDocument;
use diesel::{
    Connection, ExpressionMethods, OptionalExtension, QueryDsl, RunQueryDsl, SelectableHelper,
    delete,
};
use diesel_migrations::MigrationHarness;
use once_cell::sync::OnceCell;

use async_graphql::extensions::apollo_persisted_queries::CacheStorage;

use diesel_sqlite_utils::r2d2::{DbPool, DbPoolConnection, etablish_connection};
use graphql_persistent_queries_sqlite_schema::{MIGRATIONS, schema};

use crate::types::{InsertQuery, PersQuery};

#[derive(Debug, Default, Clone)]
pub struct SqlitePersistentQueries {
    pool: Arc<OnceCell<DbPool>>,
    namespace: Option<String>,
}

fn crate_verstion() -> &'static str {
    env!("CARGO_PKG_VERSION")
}

fn load_pool() -> anyhow::Result<DbPool> {
    let db_dir = dirs::data_local_dir()
        .ok_or(anyhow!("Cannot find data local dir"))?
        .join("special-eureka/persistent-query");
    create_dir_all(&db_dir)?;
    let db_path = db_dir.join("data.db");
    let pool = etablish_connection(
        db_path
            .to_str()
            .map(String::from)
            .ok_or(anyhow!("Cannot transform PathBuf to String"))?,
    )?;
    {
        let mut connection = pool.get()?;
        connection.transaction::<(), anyhow::Error, _>(|connection| {
            use diesel::prelude::*;
            use schema::persistent_queries::dsl::*;
            let _ = connection
                .run_pending_migrations(MIGRATIONS)
                .map_err(anyhow::Error::msg);
            delete(persistent_queries)
                .filter(version_insert.ne(crate_verstion()))
                .execute(connection)?;
            Ok(())
        })?;
    }
    Ok(pool)
}

impl SqlitePersistentQueries {
    pub fn get_connection(&self) -> anyhow::Result<DbPoolConnection> {
        Ok(self.pool.get_or_try_init(load_pool)?.get()?)
    }
    pub fn with_namespace(&self, namespace: String) -> Self {
        let mut self_clone = self.clone();
        self_clone.namespace = Some(namespace);
        self_clone
    }
}

#[async_trait::async_trait]
impl CacheStorage for SqlitePersistentQueries {
    async fn get(&self, _key: String) -> Option<ExecutableDocument> {
        let self_clone = self.clone();
        let re_key = _key.clone();
        let res = tauri::async_runtime::spawn_blocking(
            move || -> anyhow::Result<Option<ExecutableDocument>> {
                use schema::persistent_queries::dsl::*;
                let mut conn = self_clone.get_connection()?;
                let mut sel = persistent_queries.filter(key.eq(_key)).into_boxed();
                if let Some(_namespace) = self_clone.namespace {
                    sel = sel.filter(namespace.eq(_namespace));
                }
                let maybe_res = sel
                    .select(PersQuery::as_select())
                    .get_result(&mut conn)
                    .optional()?;
                if let Some(res) = maybe_res {
                    Ok(Some(res.try_into()?))
                } else {
                    Ok(None)
                }
            },
        )
        .await;
        match res {
            Ok(Err(err)) => {
                log::error!("Cannot get from {re_key}: {err}");
                None
            }
            Ok(Ok(val)) => val,
            Err(err) => {
                log::error!("Error on spawn_blocking: {}", err);
                None
            }
        }
    }

    async fn set(&self, _key: String, query: ExecutableDocument) {
        let self_clone = self.clone();
        let res = tauri::async_runtime::spawn_blocking(move || -> anyhow::Result<()> {
            let _operations = {
                let mut buf = Cursor::new(Vec::<u8>::with_capacity(1024));
                ciborium::into_writer(&query.operations, &mut buf)?;
                buf.into_inner()
            };
            let _fragments = {
                let mut buf = Cursor::new(Vec::<u8>::with_capacity(1024 * 2));
                ciborium::into_writer(&query.fragments, &mut buf)?;
                buf.into_inner()
            };
            {
                use diesel::insert_into;
                use schema::persistent_queries::dsl::*;
                let _ = self_clone.get_connection()?.transaction(|conn| {
                    insert_into(persistent_queries)
                        .values(InsertQuery {
                            key: &_key,
                            fragments: &_fragments,
                            operations: &_operations,
                            version_insert: crate_verstion(),
                            namespace: self_clone.namespace.as_deref(),
                        })
                        .execute(conn)
                })?;
            }
            Ok(())
        })
        .await;
        match res {
            Ok(Err(err)) => {
                log::error!("Cannot insert query into cache: {}", err);
            }
            Err(err) => {
                log::error!("Error on CacheStorage::set spawn_blocking: {}", err);
            }
            _ => {}
        }
    }
}

pub static PERSISTENT_QUERIES: LazyLock<SqlitePersistentQueries> =
    LazyLock::new(SqlitePersistentQueries::default);
