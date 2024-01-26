pub mod data;

use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use self::data::ReadingState;

use super::{SendData, WatcherInnerData};

type InnerData = WatcherInnerData<ReadingState>;

type Inner = Sender<Option<InnerData>>;

#[derive(Clone, Debug)]
pub struct ReadingStateWatch(Arc<Inner>);

impl Deref for ReadingStateWatch {
    type Target = Arc<Inner>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for ReadingStateWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(None)))
    }
}

impl<T> SendData<T> for ReadingStateWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> super::SendDataResult {
        self.send_replace(Some(data.into()));
        Ok(())
    }
}
