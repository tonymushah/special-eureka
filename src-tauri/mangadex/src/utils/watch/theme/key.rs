use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::store::types::structs::theme::profiles::ThemeProfileDefaultKey;

use super::{SendData, SendDataResult};

type InnerData = ThemeProfileDefaultKey;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct ThemeProfileDefaultKeyWatch(Arc<Inner>);

impl Deref for ThemeProfileDefaultKeyWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for ThemeProfileDefaultKeyWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(ThemeProfileDefaultKey::default())))
    }
}

impl<T> SendData<T> for ThemeProfileDefaultKeyWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
