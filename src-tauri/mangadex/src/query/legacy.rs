use crate::Result;
use async_graphql::{Context, Object};
use mangadex_api_input_types::legacy::mapping::LegacyIdMappingParams;

use crate::{
    objects::legacy_id_mapping::lists::LegacyIdMappingResults,
    utils::get_mangadex_client_from_graphql_context,
};

#[derive(Debug, Clone, Copy)]
pub struct LegacyQueries;

#[Object]
impl LegacyQueries {
    pub async fn id_mapping(
        &self,
        ctx: &Context<'_>,
        params: LegacyIdMappingParams,
    ) -> Result<LegacyIdMappingResults> {
        let client = get_mangadex_client_from_graphql_context::<tauri::Wry>(ctx)?;
        Ok(params.send(&client).await?.into())
    }
}
