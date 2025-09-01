use std::{ops::Deref, sync::Arc};

use mangadex_api_schema_rust::{
    ApiObjectNoRelationships, v5::UploadSessionFileAttributes as Attributes,
};
use mangadex_api_types_rust::RelationshipType;
use tokio::sync::watch::Sender;

use crate::{
    objects::{
        GetAttributes, GetId, upload::session_file::attributes::UploadSessionFileAttributes,
    },
    utils::watch::{SendData, SendDataResult, WatcherInnerData},
};

type InnerData = WatcherInnerData<UploadSessionFileAttributes>;

type Inner = Sender<Option<InnerData>>;

type AONRUploadSessionFile = ApiObjectNoRelationships<Attributes>;

#[derive(Clone, Debug)]
pub struct UploadSessionFileWatch(Arc<Inner>);

impl Deref for UploadSessionFileWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for UploadSessionFileWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(None)))
    }
}

impl<T> SendData<T> for UploadSessionFileWatch
where
    T: GetId + GetAttributes<Attributes = UploadSessionFileAttributes>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(Some(data.into()));
        Ok(())
    }
}

impl From<InnerData> for AONRUploadSessionFile {
    fn from(value: InnerData) -> Self {
        Self {
            id: value.id,
            type_: RelationshipType::UploadSessionFile,
            attributes: value.attributes.into(),
        }
    }
}
