use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::store::types::enums::manga_list_style::MangaListStyle;

use super::{SendData, SendDataResult};

type InnerData = MangaListStyle;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct MangaListStyleWatch(Arc<Inner>);

impl Deref for MangaListStyleWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for MangaListStyleWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(MangaListStyle::default())))
    }
}

impl<T> SendData<T> for MangaListStyleWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
