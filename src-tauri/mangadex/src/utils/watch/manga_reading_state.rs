use std::{ops::Deref, sync::Arc};

use mangadex_api_types_rust::ReadingStatus;

use tokio::sync::watch::Sender;

use super::{SendData, WatcherInnerData};

type InnerData = WatcherInnerData<Option<ReadingStatus>>;

type Inner = Sender<Option<InnerData>>;

#[derive(Clone, Debug)]
pub struct MangaReadingStateWatch(Arc<Inner>);

impl Deref for MangaReadingStateWatch {
    type Target = Arc<Inner>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for MangaReadingStateWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(None)))
    }
}

impl<T> SendData<T> for MangaReadingStateWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> super::SendDataResult {
        self.send_replace(Some(data.into()));
        Ok(())
    }
}
