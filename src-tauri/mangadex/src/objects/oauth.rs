use async_graphql::{InputObject, SimpleObject};
use mangadex_api_schema_rust::v5::oauth::ClientInfo as Info;

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, SimpleObject, InputObject, Deserialize, Serialize)]
#[graphql(input_name = "ClientIntoInput")]
pub struct ClientInfo {
    pub client_id: String,
    pub client_secret: String,
}

impl From<Info> for ClientInfo {
    fn from(value: Info) -> Self {
        Self {
            client_id: value.client_id,
            client_secret: value.client_secret,
        }
    }
}

impl From<ClientInfo> for Info {
    fn from(value: ClientInfo) -> Self {
        Self {
            client_id: value.client_id,
            client_secret: value.client_secret,
        }
    }
}
