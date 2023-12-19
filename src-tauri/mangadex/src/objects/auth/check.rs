use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::CheckTokenResponse;
use mangadex_api_types_rust::UserRole;

#[derive(Debug, Clone)]
pub struct AuthCheck(pub CheckTokenResponse);

impl From<CheckTokenResponse> for AuthCheck {
    fn from(value: CheckTokenResponse) -> Self {
        Self(value)
    }
}

impl Deref for AuthCheck {
    type Target = CheckTokenResponse;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[Object]
impl AuthCheck {
    pub async fn is_authenticated(&self) -> bool {
        self.is_authenticated
    }
    pub async fn roles(&self) -> &Vec<UserRole> {
        &self.roles
    }
    pub async fn permissions(&self) -> &Vec<String> {
        &self.permissions
    }
}
