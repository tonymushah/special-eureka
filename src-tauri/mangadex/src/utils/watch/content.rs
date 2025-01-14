pub mod key;

use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::store::types::structs::content::profiles::ContentProfiles;

use super::{SendData, SendDataResult};

type InnerData = ContentProfiles;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct ContentProfilesWatch(Arc<Inner>);

impl Deref for ContentProfilesWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for ContentProfilesWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(ContentProfiles::default())))
    }
}

impl<T> SendData<T> for ContentProfilesWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
