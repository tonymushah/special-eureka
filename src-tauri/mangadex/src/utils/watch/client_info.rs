use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::objects::oauth::ClientInfo;

use super::SendData;

type InnerData = ClientInfo;

type Inner = Sender<Option<InnerData>>;

#[derive(Clone, Debug)]
pub struct ClientInfoWatch(Arc<Inner>);

impl Deref for ClientInfoWatch {
    type Target = Arc<Inner>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for ClientInfoWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(None)))
    }
}

impl<T> SendData<T> for ClientInfoWatch
where
    T: Into<Option<ClientInfo>>,
{
    fn send_data(&self, data: T) -> super::SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
