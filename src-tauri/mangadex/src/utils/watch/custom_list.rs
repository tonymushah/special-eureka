use std::{ops::Deref, sync::Arc};

use mangadex_api_schema_rust::{ApiObjectNoRelationships, v5::CustomListAttributes as Attributes};
use mangadex_api_types_rust::RelationshipType;
use tokio::sync::watch::Sender;

use crate::objects::{GetAttributes, GetId, custom_list::attributes::CustomListAttributes};

use super::{SendData, WatcherInnerData};

type InnerData = WatcherInnerData<CustomListAttributes>;

type Inner = Sender<Option<InnerData>>;

type AONRCustomList = ApiObjectNoRelationships<Attributes>;

#[derive(Clone, Debug)]
pub struct CustomListWatch(Arc<Inner>);

impl Deref for CustomListWatch {
    type Target = Arc<Inner>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for CustomListWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(None)))
    }
}

impl<T> SendData<T> for CustomListWatch
where
    T: GetId + GetAttributes<Attributes = CustomListAttributes>,
{
    fn send_data(&self, data: T) -> super::SendDataResult {
        self.send_replace(Some(data.into()));
        Ok(())
    }
}

impl From<InnerData> for AONRCustomList {
    fn from(value: InnerData) -> Self {
        Self {
            id: value.id,
            type_: RelationshipType::Author,
            attributes: value.attributes.into(),
        }
    }
}
