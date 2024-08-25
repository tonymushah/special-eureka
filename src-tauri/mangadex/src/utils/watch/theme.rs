pub mod key;

use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::store::types::structs::theme::profiles::ThemeProfiles;

use super::{SendData, SendDataResult};

type InnerData = ThemeProfiles;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct ThemeProfilesWatch(Arc<Inner>);

impl Deref for ThemeProfilesWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for ThemeProfilesWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(ThemeProfiles::default())))
    }
}

impl<T> SendData<T> for ThemeProfilesWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
