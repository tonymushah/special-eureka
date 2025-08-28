use std::{ops::Deref, sync::Arc};

use mangadex_api_schema_rust::{ApiObjectNoRelationships, v5::TagAttributes as Attributes};
use mangadex_api_types_rust::RelationshipType;
use tokio::sync::watch::Sender;

use crate::objects::{GetAttributes, GetId, tag::attributes::TagAttributes};

use super::{SendData, WatcherInnerData};

type InnerData = WatcherInnerData<TagAttributes>;

type Inner = Sender<Option<InnerData>>;

type AONRTag = ApiObjectNoRelationships<Attributes>;

#[derive(Clone, Debug)]
pub struct TagWatch(Arc<Inner>);

impl Deref for TagWatch {
    type Target = Arc<Inner>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for TagWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(None)))
    }
}

impl<T> SendData<T> for TagWatch
where
    T: GetId + GetAttributes<Attributes = TagAttributes>,
{
    fn send_data(&self, data: T) -> super::SendDataResult {
        self.send_replace(Some(data.into()));
        Ok(())
    }
}

impl From<InnerData> for AONRTag {
    fn from(value: InnerData) -> Self {
        Self {
            id: value.id,
            type_: RelationshipType::Tag,
            attributes: value.attributes.into(),
        }
    }
}
