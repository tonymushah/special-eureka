use async_graphql::SimpleObject;
use diesel::{Selectable, prelude::Queryable};
use time::PrimitiveDateTime;
use uuid::Uuid;

#[derive(Clone, Debug, SimpleObject, Queryable, Selectable)]
#[diesel(
	table_name = mangadex_blacklist_raw::schema::users, 
	check_for_backend(diesel::sqlite::Sqlite)
)]
pub struct BlacklistedUserObject {
    #[diesel(
    	deserialize_as = Vec<u8>, 
     	column_name = "user_id"
    )]
    pub id: Uuid,
    #[diesel(column_name = "username")]
    pub name: String,
    #[diesel(column_name = "insert_time")]
    pub insert_date: Option<PrimitiveDateTime>,
}

#[derive(Clone, SimpleObject)]
pub struct BlacklistedUserResults {
	pub offset: u32,
	pub limit: u32,
	pub data: Vec<BlacklistedUserObject>,
	pub total: u64
}