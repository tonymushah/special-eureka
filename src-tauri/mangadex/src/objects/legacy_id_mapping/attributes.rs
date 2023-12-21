use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::LegacyMappingIdAttributes as LMIA;
use mangadex_api_types_rust::LegacyMappingType;
use uuid::Uuid;

#[derive(Debug)]
pub struct LegacyMappingIdAttributes(pub LMIA);

impl From<LMIA> for LegacyMappingIdAttributes {
    fn from(value: LMIA) -> Self {
        Self(value)
    }
}

impl From<&LMIA> for LegacyMappingIdAttributes {
    fn from(value: &LMIA) -> Self {
        Self(LMIA {
            type_: value.type_,
            legacy_id: value.legacy_id,
            new_id: value.new_id,
        })
    }
}

impl Deref for LegacyMappingIdAttributes {
    type Target = LMIA;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Clone for LegacyMappingIdAttributes {
    fn clone(&self) -> Self {
        Self(LMIA {
            type_: self.type_,
            legacy_id: self.legacy_id,
            new_id: self.new_id,
        })
    }
}

#[Object]
impl LegacyMappingIdAttributes {
    pub async fn type_(&self) -> LegacyMappingType {
        self.type_
    }
    pub async fn legacy_id(&self) -> u32 {
        self.legacy_id
    }
    pub async fn new_id(&self) -> Uuid {
        self.new_id
    }
}
