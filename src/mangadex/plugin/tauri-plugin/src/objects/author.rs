pub mod attributes;

use async_graphql::Object;
use mangadex_api_schema_rust::{
    v5::{AuthorAttributes as Attributes, AuthorObject},
    ApiObjectNoRelationships,
};
use uuid::Uuid;

use self::attributes::AuthorAttributes;

#[derive(Clone)]
pub enum Author {
    WithRel(AuthorObject),
    WithoutRel(ApiObjectNoRelationships<Attributes>),
}

impl From<AuthorObject> for Author {
    fn from(value: AuthorObject) -> Self {
        Self::WithRel(value)
    }
}

impl From<ApiObjectNoRelationships<Attributes>> for Author {
    fn from(value: ApiObjectNoRelationships<Attributes>) -> Self {
        Self::WithoutRel(value)
    }
}

#[Object]
impl Author {
    pub async fn id(&self) -> Uuid {
        match self {
            Author::WithRel(o) => o.id,
            Author::WithoutRel(o) => o.id,
        }
    }
    pub async fn attributes(&self) -> AuthorAttributes {
        match self {
            Author::WithRel(o) => o.attributes.clone().into(),
            Author::WithoutRel(o) => o.attributes.clone().into(),
        }
    }
}
