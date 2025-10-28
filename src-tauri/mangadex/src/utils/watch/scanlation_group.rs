use std::{ops::Deref, sync::Arc};

use mangadex_api_schema_rust::{
    ApiObjectNoRelationships, v5::ScanlationGroupAttributes as Attributes,
};
use mangadex_api_types_rust::RelationshipType;
use tokio::sync::watch::Sender;

use crate::objects::{
    GetAttributes, GetId, scanlation_group::attributes::ScanlationGroupAttributes,
};

use super::{SendData, WatcherInnerData};

type InnerData = WatcherInnerData<ScanlationGroupAttributes>;

type Inner = Sender<Option<InnerData>>;

type AONRScanlationGroup = ApiObjectNoRelationships<Attributes>;

#[derive(Clone, Debug)]
pub struct ScanlationGroupWatch(Arc<Inner>);

impl Deref for ScanlationGroupWatch {
    type Target = Arc<Inner>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for ScanlationGroupWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(None)))
    }
}

impl<T> SendData<T> for ScanlationGroupWatch
where
    T: GetId + GetAttributes<Attributes = ScanlationGroupAttributes>,
{
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn send_data(&self, data: T) -> super::SendDataResult {
        self.send_replace(Some(data.into()));
        Ok(())
    }
}

impl From<InnerData> for AONRScanlationGroup {
    fn from(value: InnerData) -> Self {
        Self {
            id: value.id,
            type_: RelationshipType::ScanlationGroup,
            attributes: value.attributes.into(),
        }
    }
}
