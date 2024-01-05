use std::{ops::Deref, sync::Arc};

use mangadex_api_schema_rust::{v5::ChapterAttributes as Attributes, ApiObjectNoRelationships};
use mangadex_api_types_rust::RelationshipType;
use tokio::sync::watch::Sender;

use crate::objects::{chapter::attributes::ChapterAttributes, GetAttributes, GetId};

use super::{SendData, WatcherInnerData};

type InnerData = WatcherInnerData<ChapterAttributes>;

type Inner = Sender<Option<InnerData>>;

type AONRChapter = ApiObjectNoRelationships<Attributes>;

#[derive(Clone, Debug)]
pub struct ChapterWatch(Arc<Inner>);

impl Deref for ChapterWatch {
    type Target = Arc<Inner>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for ChapterWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(None)))
    }
}

impl<T> SendData<T> for ChapterWatch
where
    T: GetId + GetAttributes<Attributes = ChapterAttributes>,
{
    fn send_data(&self, data: T) -> super::SendDataResult {
        self.send_replace(Some(data.into()));
        Ok(())
    }
}

impl From<InnerData> for AONRChapter {
    fn from(value: InnerData) -> Self {
        Self {
            id: value.id,
            type_: RelationshipType::Chapter,
            attributes: value.attributes.into(),
        }
    }
}
