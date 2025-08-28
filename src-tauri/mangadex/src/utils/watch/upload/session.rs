use std::{ops::Deref, sync::Arc};

use mangadex_api_schema_rust::{
    ApiObjectNoRelationships, v5::upload_session::UploadSessionAttributes as Attributes,
};
use mangadex_api_types_rust::RelationshipType;
use tokio::sync::watch::Sender;

use crate::{
    objects::{GetAttributes, GetId, upload::session::attributes::UploadSessionAttributes},
    utils::watch::{SendData, SendDataResult, WatcherInnerData},
};

type InnerData = WatcherInnerData<UploadSessionAttributes>;

type Inner = Sender<Option<InnerData>>;

type AONRUploadSession = ApiObjectNoRelationships<Attributes>;

#[derive(Clone, Debug)]
pub struct UploadSessionWatch(Arc<Inner>);

impl Deref for UploadSessionWatch {
    type Target = Arc<Inner>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for UploadSessionWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(None)))
    }
}

impl<T> SendData<T> for UploadSessionWatch
where
    T: GetId + GetAttributes<Attributes = UploadSessionAttributes>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(Some(data.into()));
        Ok(())
    }
}

impl From<InnerData> for AONRUploadSession {
    fn from(value: InnerData) -> Self {
        Self {
            id: value.id,
            type_: RelationshipType::UploadSession,
            attributes: value.attributes.into(),
        }
    }
}
