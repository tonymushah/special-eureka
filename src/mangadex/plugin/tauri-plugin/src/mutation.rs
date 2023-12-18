pub mod api_client;
pub mod author;
pub mod captcha;

use async_graphql::Object;

use self::{api_client::ApiClientMutation, author::AuthorMutations, captcha::CaptchaMutations};

#[derive(Debug, Clone, Copy)]
pub struct Mutation;

#[Object]
impl Mutation {
    pub async fn api_client(&self) -> ApiClientMutation {
        ApiClientMutation
    }
    pub async fn author(&self) -> AuthorMutations {
        AuthorMutations
    }
    pub async fn captcha(&self) -> CaptchaMutations {
        CaptchaMutations
    }
}
