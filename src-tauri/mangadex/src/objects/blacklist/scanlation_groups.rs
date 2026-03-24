use async_graphql::SimpleObject;
use diesel::{Selectable, prelude::Queryable};
use time::PrimitiveDateTime;
use uuid::Uuid;

#[derive(Debug, Clone, Queryable, SimpleObject, Selectable)]
#[diesel(
	table_name = mangadex_blacklist_raw::schema::scanlation_groups,
	check_for_backend(diesel::sqlite::Sqlite)
)]
pub struct BlacklistedScanlationGroupObject {
    #[diesel(
		deserialize_as = Vec<u8>,
		column_name = "group_id"
	)]
    pub id: Uuid,
    #[diesel(column_name = "group_name")]
    pub name: String,
    #[diesel(column_name = "insert_time")]
    pub insert_date: Option<PrimitiveDateTime>,
}

#[derive(Clone, SimpleObject)]
pub struct BlacklistedScanlationGroupResults {
    pub offset: u32,
    pub limit: u32,
    pub data: Vec<BlacklistedScanlationGroupObject>,
    pub total: u64,
}
