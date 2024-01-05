use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use super::{SendData, SendDataResult};

type InnerData = bool;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct IsLoggedWatch(Arc<Inner>);

impl Deref for IsLoggedWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for IsLoggedWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(false)))
    }
}

impl<T> SendData<T> for IsLoggedWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        self.send(data.into());
        Ok(())
    }
}
