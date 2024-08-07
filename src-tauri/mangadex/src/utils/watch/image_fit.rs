use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::store::types::enums::image_fit::ImageFit;

use super::{SendData, SendDataResult};

type InnerData = ImageFit;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct ImageFitWatch(Arc<Inner>);

impl Deref for ImageFitWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for ImageFitWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(ImageFit::default())))
    }
}

impl<T> SendData<T> for ImageFitWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
