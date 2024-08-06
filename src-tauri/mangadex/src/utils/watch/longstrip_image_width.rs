use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use super::{SendData, SendDataResult};

type InnerData = f64;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct LongstripImageWidthWatch(Arc<Inner>);

impl Deref for LongstripImageWidthWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for LongstripImageWidthWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(0f64)))
    }
}

impl<T> SendData<T> for LongstripImageWidthWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
