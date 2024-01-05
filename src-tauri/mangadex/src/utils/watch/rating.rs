use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::objects::{rating::RatingItemAttributes, GetAttributes, GetId};

use super::{SendData, WatcherInnerData};

type InnerData = WatcherInnerData<RatingItemAttributes>;

type Inner = Sender<Option<InnerData>>;

#[derive(Clone, Debug)]
pub struct RatingWatch(Arc<Inner>);

impl Deref for RatingWatch {
    type Target = Arc<Inner>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for RatingWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(None)))
    }
}

impl<T> SendData<T> for RatingWatch
where
    T: GetId + GetAttributes<Attributes = RatingItemAttributes>,
{
    fn send_data(&self, data: T) -> super::SendDataResult {
        self.send_replace(Some(data.into()));
        Ok(())
    }
}
