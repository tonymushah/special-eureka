use async_graphql::Object;
use uuid::Uuid;

use crate::export::txt::export_uuids_as_txt;

pub struct ExportMutations;

#[Object]
impl ExportMutations {
    pub async fn uuids_to_as_txt(
        &self,
        uuids: Vec<Uuid>,
        file: String,
    ) -> crate::Result<String, crate::error::ErrorWrapper> {
        export_uuids_as_txt(uuids, file).await.map_err(Into::into)
    }
}
