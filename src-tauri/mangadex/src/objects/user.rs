use async_graphql::Object;
use mangadex_api_schema_rust::{
    v5::{UserAttributes as Attributes, UserObject},
    ApiObjectNoRelationships,
};
use uuid::Uuid;

use self::attributes::UserAttributes;

pub mod attributes;
pub mod lists;
pub mod relationships;

#[derive(Clone, Debug)]
pub enum User {
    WithRelationship(UserObject),
    WithoutRelationship(ApiObjectNoRelationships<Attributes>),
}

impl From<UserObject> for User {
    fn from(value: UserObject) -> Self {
        Self::WithRelationship(value)
    }
}

impl From<ApiObjectNoRelationships<Attributes>> for User {
    fn from(value: ApiObjectNoRelationships<Attributes>) -> Self {
        Self::WithoutRelationship(value)
    }
}

#[Object]
impl User {
    pub async fn id(&self) -> Uuid {
        match self {
            User::WithRelationship(i) => i.id,
            User::WithoutRelationship(i) => i.id,
        }
    }
    pub async fn attributes(&self) -> UserAttributes {
        match self {
            User::WithRelationship(i) => i.attributes.clone().into(),
            User::WithoutRelationship(i) => i.attributes.clone().into(),
        }
    }
}
