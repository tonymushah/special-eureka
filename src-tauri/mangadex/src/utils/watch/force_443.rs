use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use super::{SendData, SendDataResult};

type InnerData = bool;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct ForcePort443Watch(Arc<Inner>);

impl Deref for ForcePort443Watch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for ForcePort443Watch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(false)))
    }
}

impl<T> SendData<T> for ForcePort443Watch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
