use mangadex_api::v5::custom_list::id::feed::get::CustomListMangaFeedBuilder;
use mangadex_api_input_types::feed::custom_list_feed::CustomListMangaFeedParams;
use mangadex_api_schema_rust::v5::ChapterObject;

use crate::constants::MANGADEX_DEFAULT_LIMIT;

use super::{SendableParam, SplittableParam};

impl SplittableParam for CustomListMangaFeedParams {
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

impl SendableParam for CustomListMangaFeedParams {
    type Item = ChapterObject;
    async fn send(
        self,
        client: &mangadex_api::MangaDexClient,
    ) -> crate::Result<mangadex_api_schema_rust::v5::Results<Self::Item>> {
        Ok(Self::send(self, client).await?)
    }
    async fn send_with_auth(
        self,
        client: &mangadex_api::MangaDexClient,
    ) -> crate::Result<mangadex_api_schema_rust::v5::Results<Self::Item>>
    where
        Self: Sized,
    {
        let mut param: CustomListMangaFeedBuilder = self.into();
        Ok(param
            .with_auth(true)
            .http_client(client.get_http_client())
            .send()
            .await?)
    }
}
