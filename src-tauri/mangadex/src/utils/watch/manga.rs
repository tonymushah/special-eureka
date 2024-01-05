use std::{ops::Deref, sync::Arc};

use mangadex_api_schema_rust::{v5::MangaAttributes as Attributes, ApiObjectNoRelationships};
use mangadex_api_types_rust::RelationshipType;
use tokio::sync::watch::Sender;

use crate::objects::{
    manga::attributes::GraphQLMangaAttributes as MangaAttributes, GetAttributes, GetId,
};

use super::{SendData, WatcherInnerData};

type InnerData = WatcherInnerData<MangaAttributes>;

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

impl<T> SendData<T> for MangaWatch
where
    T: GetId + GetAttributes<Attributes = MangaAttributes>,
{
    fn send_data(&self, data: T) -> super::SendDataResult {
        if let Err(err) = self.send(Some(data.into())) {
            Err(err.to_string())
        } else {
            Ok(())
        }
    }
}

impl From<InnerData> for AONRManga {
    fn from(value: InnerData) -> Self {
        Self {
            id: value.id,
            type_: RelationshipType::Manga,
            attributes: value.attributes.into(),
        }
    }
}
