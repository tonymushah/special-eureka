use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::store::types::enums::chapter_feed_style::ChapterFeedStyle;

use super::{SendData, SendDataResult};

type InnerData = ChapterFeedStyle;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct ChapterFeedStyleWatch(Arc<Inner>);

impl Deref for ChapterFeedStyleWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for ChapterFeedStyleWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(InnerData::default())))
    }
}

impl<T> SendData<T> for ChapterFeedStyleWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
