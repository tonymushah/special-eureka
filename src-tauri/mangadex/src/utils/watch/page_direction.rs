use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::store::types::enums::direction::Direction;

use super::{SendData, SendDataResult};

type InnerData = Direction;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct PageDirectionWatch(Arc<Inner>);

impl Deref for PageDirectionWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for PageDirectionWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(Direction::default())))
    }
}

impl<T> SendData<T> for PageDirectionWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
