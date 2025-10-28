use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::store::types::enums::reading_mode::ReadingMode;

use super::{SendData, SendDataResult};

type InnerData = ReadingMode;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct ReadingModeWatch(Arc<Inner>);

impl Deref for ReadingModeWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for ReadingModeWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(ReadingMode::default())))
    }
}

impl<T> SendData<T> for ReadingModeWatch
where
    T: Into<InnerData>,
{
    #[cfg_attr(feature = "hotpath", hotpath::measure)]
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
