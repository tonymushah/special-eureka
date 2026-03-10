use async_graphql::SimpleObject;
use diesel::prelude::*;
use time::PrimitiveDateTime;
use uuid::Uuid;

#[derive(Debug, Clone, SimpleObject, Selectable, Queryable)]
#[diesel(
	table_name = mangadex_blacklist_raw::schema::labels,
	check_for_backend(diesel::sqlite::Sqlite)
)]
pub struct BlacklistLabel {
    #[diesel(
		deserialize_as = Vec<u8>,
		column_name = "label_id"
	)]
    pub id: Uuid,
    pub name: String,
    pub create_date: Option<PrimitiveDateTime>,
    pub description: Option<String>,
}
