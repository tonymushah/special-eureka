use std::path::Path;

use diesel_sqlite_utils::r2d2::{DbPool, DbPoolConnection};
use tauri::{AppHandle, Emitter, Runtime};

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

pub fn emit_blacklist_change<R: Runtime>(app: &AppHandle<R>) -> crate::Result<()> {
    app.emit("org.mangadex.blacklist.change", ())?;
    Ok(())
}
