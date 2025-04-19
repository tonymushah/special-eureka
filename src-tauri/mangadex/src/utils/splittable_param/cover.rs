use mangadex_api_input_types::cover::list::CoverListParam;
use mangadex_api_schema_rust::v5::CoverObject;

use crate::constants::MANGADEX_DEFAULT_LIMIT;

use super::{SendableParam, SplittableParam};

impl SplittableParam for CoverListParam {
    fn offset(&self) -> u32 {
        self.offset.unwrap_or_default()
    }

    fn limit(&self) -> u32 {
        self.limit.unwrap_or(MANGADEX_DEFAULT_LIMIT)
    }

    fn set_offset(&mut self, offset: u32) {
        self.offset.replace(offset);
    }

    fn set_limit(&mut self, limit: u32) {
        self.limit.replace(limit);
    }
    fn ids(&self) -> &[uuid::Uuid] {
        &self.cover_ids
    }
    fn set_ids(&mut self, _ids: Vec<uuid::Uuid>) {
        self.cover_ids = _ids
    }
}

impl SendableParam for CoverListParam {
    type Item = CoverObject;
    async fn send(
        self,
        client: &mangadex_api::MangaDexClient,
    ) -> crate::Result<mangadex_api_schema_rust::v5::Results<Self::Item>> {
        Ok(Self::send(self, client).await?)
    }
}
