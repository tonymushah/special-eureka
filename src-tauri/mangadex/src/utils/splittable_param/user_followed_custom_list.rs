use mangadex_api_input_types::follows::lists::UserFollowedListParams;
use mangadex_api_schema_rust::v5::CustomListObject;

use crate::constants::MANGADEX_DEFAULT_LIMIT;

use super::{SendableParam, SplittableParam};

impl SplittableParam for UserFollowedListParams {
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
}

impl SendableParam for UserFollowedListParams {
    type Item = CustomListObject;
    async fn send(
        self,
        client: &mangadex_api::MangaDexClient,
    ) -> crate::Result<mangadex_api_schema_rust::v5::Results<Self::Item>> {
        Ok(Self::send(self, client).await?)
    }
}
