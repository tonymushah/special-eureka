use std::{ops::Deref, sync::Arc};

use crate::objects::api_client::attributes::ApiClientAttributes;
use mangadex_api_schema_rust::{
    ApiObjectNoRelationships as AONR, v5::ApiClientAttributes as Attributes,
};
use tokio::sync::watch::Sender;

use super::{SendData, SendDataResult, WatcherInnerData};

type InnerData = WatcherInnerData<ApiClientAttributes>;

type Inner = Sender<Option<InnerData>>;

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
    T: Into<InnerData>,
{
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(Some(data.into()));
        Ok(())
    }
}

impl From<InnerData> for AONRApiClient {
    fn from(value: InnerData) -> Self {
        non_exhaustive::non_exhaustive!(Self {
            id: value.id,
            attributes: value.attributes.into(),
        })
    }
}
