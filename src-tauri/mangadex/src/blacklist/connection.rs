use std::path::Path;

use diesel_migrations::MigrationHarness;
use diesel_sqlite_utils::r2d2::{DbPool, etablish_connection as r2d2_connect};

/// This function will automatically:
/// - create the database file if doesn't exists
/// - run all pending migrations
pub fn create_pool_connection(path: &Path) -> crate::Result<DbPool> {
    if !path.exists() {
        std::fs::File::create_new(path)?;
    }
    let pool = r2d2_connect(
        path.to_str()
            .map(String::from)
            .ok_or(crate::Error::PathToStr)?,
    )
    .map_err(|error| crate::Error::MakingBlacklistPool { error })?;
    {
        let mut con = pool.get()?;
        con.run_pending_migrations(mangadex_blacklist_raw::MIGRATIONS)
            .map_err(crate::Error::DieselMigration)?
            .iter()
            .for_each(|migration| {
                log::info!("Executed pending migration: {migration}");
            });
    }
    Ok(pool)
}
