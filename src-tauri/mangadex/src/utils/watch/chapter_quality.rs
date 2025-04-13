use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::store::types::enums::chapter_quality::DownloadMode;

use super::{SendData, SendDataResult};

type InnerData = DownloadMode;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct ChapterQualityWatch(Arc<Inner>);

impl Deref for ChapterQualityWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for ChapterQualityWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(InnerData::default())))
    }
}

impl<T> SendData<T> for ChapterQualityWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
