use std::{ops::Deref, sync::Arc};

use mangadex_api_schema_rust::{ApiObjectNoRelationships, v5::ChapterAttributes as Attributes};
use mangadex_api_types_rust::RelationshipType;
use tokio::sync::watch::Sender;

use crate::{
    objects::{GetAttributes, GetId, chapter::attributes::ChapterAttributes},
    utils::source::{MultiSourceData, SendMultiSourceData},
};

use super::{SendData, WatcherInnerData};

type InnerData = WatcherInnerData<MultiSourceData<ChapterAttributes>>;

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

impl<T> SendMultiSourceData<T> for ChapterWatch
where
    T: GetId + GetAttributes<Attributes = ChapterAttributes>,
{
    fn send_offline(&self, data: T) -> super::SendDataResult {
        self.send_data(
            (
                data.get_id(),
                MultiSourceData::offline(data.get_attributes()),
            )
                .into(),
        )
    }
    fn send_online(&self, data: T) -> super::SendDataResult {
        self.send_data(
            (
                data.get_id(),
                MultiSourceData::online(data.get_attributes()),
            )
                .into(),
        )
    }
}

impl SendData<InnerData> for ChapterWatch {
    fn send_data(&self, data: InnerData) -> super::SendDataResult {
        self.send_replace(Some(data));
        Ok(())
    }
}

impl From<InnerData> for AONRChapter {
    fn from(value: InnerData) -> Self {
        Self {
            id: value.id,
            type_: RelationshipType::Chapter,
            attributes: value.attributes.inner_data().into(),
        }
    }
}
