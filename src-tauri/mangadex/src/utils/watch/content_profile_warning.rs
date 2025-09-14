use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::store::types::enums::content_profile_warning::ContentProfileWarningMode;

use super::{SendData, SendDataResult};

type InnerData = ContentProfileWarningMode;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct ContentProfileWarningModeWatch(Arc<Inner>);

impl Deref for ContentProfileWarningModeWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for ContentProfileWarningModeWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(Default::default())))
    }
}

impl<T> SendData<T> for ContentProfileWarningModeWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
