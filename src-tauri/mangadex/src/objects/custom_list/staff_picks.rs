use mangadex_api::MangaDexClient;
use mangadex_api_schema_rust::v5::CustomListResponse;
use mangadex_api_types_rust::error::Result;
use reqwest::Client;
use serde::{Deserialize, Serialize};
use url::Url;
use uuid::Uuid;

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct StaffPicksData {
    pub id: Uuid,
}

impl StaffPicksData {
    pub async fn get(client: &Client) -> Result<Self> {
        Ok(client.get(Url::parse("https://raw.githubusercontent.com/tonymushah/special-eureka/master/public/mangadex/json/staff-pics.json")?).send().await?.json().await?)
    }
    pub async fn get_result(&self, client: &MangaDexClient) -> CustomListResponse {
        client.custom_list().id(self.id).get().send().await
    }
}
