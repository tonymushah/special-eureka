use std::{ops::Deref, sync::Arc};

use mangadex_api_schema_rust::{ApiObjectNoRelationships, v5::MangaAttributes as Attributes};
use mangadex_api_types_rust::RelationshipType;
use tokio::sync::watch::Sender;

use crate::{
    objects::{GetAttributes, GetId, manga::attributes::GraphQLMangaAttributes as MangaAttributes},
    utils::source::{MultiSourceData, SendMultiSourceData},
};

use super::{SendData, WatcherInnerData};

type InnerData = WatcherInnerData<MultiSourceData<MangaAttributes>>;

type Inner = Sender<Option<InnerData>>;

type AONRManga = ApiObjectNoRelationships<Attributes>;

#[derive(Clone, Debug)]
pub struct MangaWatch(Arc<Inner>);

impl Deref for MangaWatch {
    type Target = Arc<Inner>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for MangaWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(None)))
    }
}

impl<T> SendMultiSourceData<T> for MangaWatch
where
    T: GetId + GetAttributes<Attributes = MangaAttributes>,
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

impl SendData<InnerData> for MangaWatch {
    fn send_data(&self, data: InnerData) -> super::SendDataResult {
        self.send_replace(Some(data));
        Ok(())
    }
}

impl From<InnerData> for AONRManga {
    fn from(value: InnerData) -> Self {
        Self {
            id: value.id,
            type_: RelationshipType::Manga,
            attributes: value.attributes.inner_data().into(),
        }
    }
}
