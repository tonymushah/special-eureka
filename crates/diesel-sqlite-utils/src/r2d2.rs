use diesel::{
    SqliteConnection,
    r2d2::{self, ConnectionManager, Pool, PooledConnection},
};

// set an alias, so we don't have to keep writing out this long type
pub type DbPool = Pool<ConnectionManager<SqliteConnection>>;

pub type DbPoolConnection = PooledConnection<ConnectionManager<SqliteConnection>>;

pub fn etablish_connection(uri: String) -> Result<DbPool, r2d2::PoolError> {
    let connection_manager = ConnectionManager::<SqliteConnection>::new(uri);

    DbPool::builder()
        .max_size(10)
        .min_idle(Some(3))
        .build(connection_manager)
}
