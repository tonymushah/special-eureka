use std::io;

use async_graphql_parser::types::ExecutableDocument;
use diesel::prelude::*;
use graphql_persistent_queries_sqlite_schema::schema;

#[derive(Debug, Insertable)]
#[diesel(table_name = schema::persistent_queries)]
pub struct InsertQuery<'a> {
    pub key: &'a str,
    pub operations: &'a [u8],
    pub fragments: &'a [u8],
    pub version_insert: &'a str,
}

#[derive(Debug, Selectable, Queryable)]
#[diesel(table_name = schema::persistent_queries, check_for_backend(diesel::sqlite::Sqlite))]
pub struct PersQuery {
    pub operations: Vec<u8>,
    pub fragments: Vec<u8>,
}

impl TryFrom<PersQuery> for ExecutableDocument {
    type Error = ciborium::de::Error<io::Error>;
    fn try_from(value: PersQuery) -> Result<Self, Self::Error> {
        Ok(Self {
            operations: ciborium::from_reader(value.operations.as_slice())?,
            fragments: ciborium::from_reader(value.fragments.as_slice())?,
        })
    }
}
