use std::{ops::Deref, sync::Arc};

use mangadex_api_schema_rust::{v5::CoverAttributes as Attributes, ApiObjectNoRelationships};
use mangadex_api_types_rust::RelationshipType;
use tokio::sync::watch::Sender;

use crate::objects::{cover::attributes::CoverAttributes, GetAttributes, GetId};

use super::{SendData, WatcherInnerData};

type InnerData = WatcherInnerData<CoverAttributes>;

type Inner = Sender<Option<InnerData>>;

type AONRCover = ApiObjectNoRelationships<Attributes>;

#[derive(Clone, Debug)]
pub struct CoverWatch(Arc<Inner>);

impl Deref for CoverWatch {
    type Target = Arc<Inner>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for CoverWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(None)))
    }
}

impl<T> SendData<T> for CoverWatch
where
    T: GetId + GetAttributes<Attributes = CoverAttributes>,
{
    fn send_data(&self, data: T) -> super::SendDataResult {
        self.send_replace(Some(data.into()));
        Ok(())
    }
}

impl From<InnerData> for AONRCover {
    fn from(value: InnerData) -> Self {
        Self {
            id: value.id,
            type_: RelationshipType::CoverArt,
            attributes: value.attributes.into(),
        }
    }
}
