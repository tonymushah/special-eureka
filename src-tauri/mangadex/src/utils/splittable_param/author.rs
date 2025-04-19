use mangadex_api_input_types::author::list::AuthorListParams;
use mangadex_api_schema_rust::v5::AuthorObject;

use crate::constants::MANGADEX_DEFAULT_LIMIT;

use super::{SendableParam, SplittableParam};

impl SplittableParam for AuthorListParams {
    fn offset(&self) -> u32 {
        self.offset.unwrap_or_default()
    }

    fn limit(&self) -> u32 {
        self.limit.unwrap_or(MANGADEX_DEFAULT_LIMIT)
    }

    fn set_offset(&mut self, offset: u32) {
        self.offset = Some(offset)
    }

    fn set_limit(&mut self, limit: u32) {
        self.limit = Some(limit)
    }
    fn ids(&self) -> &[uuid::Uuid] {
        &self.author_ids
    }
    fn set_ids(&mut self, _ids: Vec<uuid::Uuid>) {
        self.author_ids = _ids;
    }
}

impl SendableParam for AuthorListParams {
    type Item = AuthorObject;
    async fn send(
        self,
        client: &mangadex_api::MangaDexClient,
    ) -> crate::Result<mangadex_api_schema_rust::v5::Results<Self::Item>> {
        Ok(AuthorListParams::send(self, client).await?)
    }
}
