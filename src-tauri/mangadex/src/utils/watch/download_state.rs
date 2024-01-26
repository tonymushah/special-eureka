use std::{ops::Deref, sync::Arc};

use crate::utils::download_state::DownloadState;

use tokio::sync::watch::Sender;

use super::{SendData, WatcherInnerData};

type InnerData = WatcherInnerData<DownloadState>;

type Inner = Sender<Option<InnerData>>;

#[derive(Clone, Debug)]
pub struct DownloadStateWatch(Arc<Inner>);

impl Deref for DownloadStateWatch {
    type Target = Arc<Inner>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for DownloadStateWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(None)))
    }
}

impl<T> SendData<T> for DownloadStateWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> super::SendDataResult {
        self.send_replace(Some(data.into()));
        Ok(())
    }
}
