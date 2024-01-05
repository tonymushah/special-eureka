pub mod manga;

use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::objects::{statistics::StatisticsComments, GetAttributes, GetId};

use super::{SendData, WatcherInnerData};

type InnerData = WatcherInnerData<Option<StatisticsComments>>;

type Inner = Sender<Option<InnerData>>;

#[derive(Clone, Debug)]
pub struct StatisticsWatch(Arc<Inner>);

impl Deref for StatisticsWatch {
    type Target = Arc<Inner>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for StatisticsWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(None)))
    }
}

impl<T> SendData<T> for StatisticsWatch
where
    T: GetId + GetAttributes<Attributes = Option<StatisticsComments>>,
{
    fn send_data(&self, data: T) -> super::SendDataResult {
        self.send_replace(Some(data.into()));
        Ok(())
    }
}
