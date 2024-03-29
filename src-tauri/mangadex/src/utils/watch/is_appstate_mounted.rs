use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use super::{SendData, SendDataResult};

type InnerData = bool;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct IsAppStateMountedWatch(Arc<Inner>);

impl Deref for IsAppStateMountedWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for IsAppStateMountedWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(false)))
    }
}

impl<T> SendData<T> for IsAppStateMountedWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
