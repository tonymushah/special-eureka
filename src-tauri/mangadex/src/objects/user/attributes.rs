use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::UserAttributes as Attributes;
use mangadex_api_types_rust::UserRole;

pub struct UserAttributes(Attributes);

impl Deref for UserAttributes {
    type Target = Attributes;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<Attributes> for UserAttributes {
    fn from(value: Attributes) -> Self {
        Self(value)
    }
}

impl From<UserAttributes> for Attributes {
    fn from(value: UserAttributes) -> Self {
        value.0
    }
}

#[Object]
impl UserAttributes {
    pub async fn username(&self) -> &String {
        &self.username
    }
    pub async fn roles(&self) -> &Vec<UserRole> {
        &self.roles
    }
    pub async fn version(&self) -> u32 {
        self.version
    }
}
