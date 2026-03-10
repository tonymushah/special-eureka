use async_graphql::SimpleObject;
use diesel::{Selectable, prelude::Queryable};
use time::PrimitiveDateTime;
use uuid::Uuid;

#[derive(Clone, Debug, SimpleObject, Queryable, Selectable)]
#[diesel(
	table_name = mangadex_blacklist_raw::schema::authors_artists,
	check_for_backend(diesel::sqlite::Sqlite)
)]
pub struct BlacklistedAuthorObject {
    #[diesel(
    	deserialize_as = Vec<u8>,
     	column_name = "author_id"
    )]
    pub id: Uuid,
    #[diesel(column_name = "author_name")]
    pub name: String,
    #[diesel(column_name = "insert_time")]
    pub insert_date: Option<PrimitiveDateTime>,
}

#[derive(Clone, SimpleObject)]
pub struct BlacklistedAuthorResults {
    pub offset: u32,
    pub limit: u32,
    pub data: Vec<BlacklistedAuthorObject>,
    pub total: u64,
}
