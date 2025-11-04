use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use super::{SendData, SendDataResult};

type InnerData = bool;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct ToastNotifyWatch(Arc<Inner>);

impl Deref for ToastNotifyWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for ToastNotifyWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(false)))
    }
}

impl<T> SendData<T> for ToastNotifyWatch
where
    T: Into<InnerData>,
{
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
