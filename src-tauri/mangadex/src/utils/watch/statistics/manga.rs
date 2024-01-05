use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::{
    objects::{statistics::manga::MangaStatisticsAttributes, GetAttributes, GetId},
    utils::watch::SendDataResult,
};

use super::{SendData, WatcherInnerData};

type InnerData = WatcherInnerData<MangaStatisticsAttributes>;

type Inner = Sender<Option<InnerData>>;

#[derive(Clone, Debug)]
pub struct MangaStatisticsWatch(Arc<Inner>);

impl Deref for MangaStatisticsWatch {
    type Target = Arc<Inner>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for MangaStatisticsWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(None)))
    }
}

impl<T> SendData<T> for MangaStatisticsWatch
where
    T: GetId + GetAttributes<Attributes = MangaStatisticsAttributes>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        if let Err(err) = self.send(Some(data.into())) {
            Err(err.to_string())
        } else {
            Ok(())
        }
    }
}
