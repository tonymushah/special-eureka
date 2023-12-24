pub mod attributes;
pub mod lists;

use std::ops::Deref;

use async_graphql::Object;
use attributes::LegacyMappingIdAttributes;
use mangadex_api_schema_rust::{
    v5::{IdMappingObject, LegacyMappingIdAttributes as LMIA},
    ApiObject,
};
use uuid::Uuid;

#[derive(Debug)]
pub struct LegacyIdMapping(pub IdMappingObject);

impl Clone for LegacyIdMapping {
    fn clone(&self) -> Self {
        let attributes = LMIA {
            type_: self.attributes.type_,
            legacy_id: self.attributes.legacy_id,
            new_id: self.attributes.new_id,
        };
        Self(ApiObject {
            type_: self.type_,
            id: self.id,
            attributes,
            relationships: self.relationships.clone(),
        })
    }
}

impl From<IdMappingObject> for LegacyIdMapping {
    fn from(value: IdMappingObject) -> Self {
        Self(value)
    }
}

impl Deref for LegacyIdMapping {
    type Target = IdMappingObject;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[Object]
impl LegacyIdMapping {
    pub async fn id(&self) -> Uuid {
        self.id
    }
    pub async fn attributes(&self) -> LegacyMappingIdAttributes {
        (&self.attributes).into()
    }
}
