use async_graphql::SimpleObject;
use mangadex_api_schema_rust::v5::oauth::ClientInfo as Info;

#[derive(Debug, Clone, SimpleObject)]
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
