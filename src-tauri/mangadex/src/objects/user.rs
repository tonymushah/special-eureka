use async_graphql::Object;
use mangadex_api_schema_rust::{
    v5::{UserAttributes as Attributes, UserObject},
    ApiObjectNoRelationships,
};
use uuid::Uuid;

use self::attributes::UserAttributes;

use super::{GetAttributes, GetId};

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

impl GetId for User {
    fn get_id(&self) -> Uuid {
        match self {
            User::WithRelationship(i) => i.id,
            User::WithoutRelationship(i) => i.id,
        }
    }
}

impl From<User> for Attributes {
    fn from(value: User) -> Self {
        match value {
            User::WithRelationship(i) => i.attributes,
            User::WithoutRelationship(i) => i.attributes,
        }
    }
}

impl From<&User> for Attributes {
    fn from(value: &User) -> Self {
        match value {
            User::WithRelationship(i) => i.attributes.clone(),
            User::WithoutRelationship(i) => i.attributes.clone(),
        }
    }
}

impl GetAttributes for User {
    type Attributes = UserAttributes;
    fn get_attributes(&self) -> Self::Attributes {
        Into::<Attributes>::into(self).into()
    }
}

#[Object]
impl User {
    pub async fn id(&self) -> Uuid {
        self.get_id()
    }
    pub async fn attributes(&self) -> UserAttributes {
        self.get_attributes()
    }
}
