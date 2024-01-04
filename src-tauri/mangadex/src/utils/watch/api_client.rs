use std::{ops::Deref, sync::Arc};

use crate::objects::api_client::attributes::ApiClientAttributes;
use mangadex_api_schema_rust::{
    v5::ApiClientAttributes as Attributes, ApiObjectNoRelationships as AONR,
};
use mangadex_api_types_rust::RelationshipType;
use tokio::sync::watch::Sender;

use super::{SendData, SendDataResult, WatcherInnerData};

type Inner = Sender<Option<WatcherInnerData<ApiClientAttributes>>>;

type AONRApiClient = AONR<Attributes>;

#[derive(Clone, Debug)]
pub struct ApiClientWatch(Arc<Inner>);

impl Deref for ApiClientWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for ApiClientWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(None)))
    }
}

impl<T> SendData<T> for ApiClientWatch
where
    T: Into<WatcherInnerData<ApiClientAttributes>>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        if let Err(err) = self.send(Some(data.into())) {
            Err(err.to_string())
        } else {
            Ok(())
        }
    }
}

impl From<WatcherInnerData<ApiClientAttributes>> for AONRApiClient {
    fn from(value: WatcherInnerData<ApiClientAttributes>) -> Self {
        Self {
            id: value.id,
            type_: RelationshipType::ApiClient,
            attributes: value.attributes.into(),
        }
    }
}
