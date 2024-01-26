use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use super::{SendData, WatcherInnerData};

type InnerData = WatcherInnerData<bool>;

type Inner = Sender<Option<InnerData>>;

#[derive(Clone, Debug)]
pub struct ReadMarkerWatch(Arc<Inner>);

impl Deref for ReadMarkerWatch {
    type Target = Arc<Inner>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for ReadMarkerWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(None)))
    }
}

impl<T> SendData<T> for ReadMarkerWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> super::SendDataResult {
        self.send_replace(Some(data.into()));
        Ok(())
    }
}
