use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use mangadex_api_types_rust::language::Language;

use super::{SendData, SendDataResult};

type InnerData = Vec<Language>;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct ChapterLanguagesWatch(Arc<Inner>);

impl Deref for ChapterLanguagesWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for ChapterLanguagesWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(InnerData::default())))
    }
}

impl<T> SendData<T> for ChapterLanguagesWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
