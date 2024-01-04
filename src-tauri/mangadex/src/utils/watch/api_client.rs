use std::{ops::Deref, sync::Arc};

use crate::objects::api_client::{attributes::ApiClientAttributes, ApiClient};
use tokio::sync::watch::Sender;
use uuid::Uuid;

use super::{SendData, SendDataResult};

type Inner = Sender<Option<(Uuid, ApiClientAttributes)>>;

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

impl SendData<ApiClient> for ApiClientWatch {
    fn send_data(&self, data: ApiClient) -> SendDataResult {
        if let Err(err) = self.send(Some((data.get_id(), data.get_attributes()))) {
            Err(err.to_string())
        } else {
            Ok(())
        }
    }
}
