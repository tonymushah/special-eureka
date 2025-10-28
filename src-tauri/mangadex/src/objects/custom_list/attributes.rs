use std::ops::Deref;

use async_graphql::Object;
use mangadex_api_schema_rust::v5::CustomListAttributes as Attributes;
use mangadex_api_types_rust::CustomListVisibility;

#[derive(Clone, Debug)]
pub struct CustomListAttributes(Attributes);

impl From<Attributes> for CustomListAttributes {
    fn from(value: Attributes) -> Self {
        Self(value)
    }
}

impl From<CustomListAttributes> for Attributes {
    fn from(value: CustomListAttributes) -> Self {
        value.0
    }
}

impl Deref for CustomListAttributes {
    type Target = Attributes;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[Object]
#[cfg_attr(feature = "hotpath", hotpath::measure_all)]
impl CustomListAttributes {
    pub async fn name(&self) -> &String {
        &self.name
    }
    pub async fn visibility(&self) -> CustomListVisibility {
        self.visibility
    }
    pub async fn version(&self) -> u32 {
        self.version
    }
}
