use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::store::types::enums::manga_infos_positions::MangaInfosPositions;

use super::{SendData, SendDataResult};

type InnerData = MangaInfosPositions;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct MangaInfosPositionsWatch(Arc<Inner>);

impl Deref for MangaInfosPositionsWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for MangaInfosPositionsWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(InnerData::default())))
    }
}

impl<T> SendData<T> for MangaInfosPositionsWatch
where
    T: Into<InnerData>,
{
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
