use std::path::Path;

use diesel_sqlite_utils::r2d2::{DbPool, DbPoolConnection};

pub mod connection;
pub mod filters;

#[derive(Debug)]
pub struct BlacklistDatabasePool {
    pool: DbPool,
}

impl BlacklistDatabasePool {
    pub fn new(path: &Path) -> crate::Result<Self> {
        Ok(Self {
            pool: connection::create_pool_connection(path)?,
        })
    }
    pub fn get_connection(&self) -> crate::Result<DbPoolConnection> {
        Ok(self.pool.get()?)
    }
    pub fn get_connection_timeout(
        &self,
        timeout: std::time::Duration,
    ) -> crate::Result<DbPoolConnection> {
        Ok(self.pool.get_timeout(timeout)?)
    }
}
