use diesel_migrations::{EmbeddedMigrations, embed_migrations};

pub mod schema;

pub const MIGRATIONS: EmbeddedMigrations = embed_migrations!();
