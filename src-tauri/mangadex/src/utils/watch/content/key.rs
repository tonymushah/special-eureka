use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::store::types::structs::content::profiles::ContentProfileDefaultKey;

use super::{SendData, SendDataResult};

type InnerData = ContentProfileDefaultKey;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct ContentProfileDefaultKeyWatch(Arc<Inner>);

impl Deref for ContentProfileDefaultKeyWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for ContentProfileDefaultKeyWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(ContentProfileDefaultKey::default())))
    }
}

impl<T> SendData<T> for ContentProfileDefaultKeyWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
