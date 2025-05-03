use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::store::types::structs::chapter_layout::ChapterLayoutStore;

use super::{SendData, SendDataResult};

type InnerData = ChapterLayoutStore;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct ChapterLayoutWatch(Arc<Inner>);

impl Deref for ChapterLayoutWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for ChapterLayoutWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(ChapterLayoutStore::default())))
    }
}

impl<T> SendData<T> for ChapterLayoutWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
