pub mod api_client;

use async_graphql::Object;

use self::api_client::ApiClientMutation;

#[derive(Debug, Clone, Copy)]
pub struct Mutation;

#[Object]
impl Mutation {
    pub async fn api_client(&self) -> ApiClientMutation {
        ApiClientMutation
    }
}
