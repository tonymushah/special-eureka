use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::objects::{GetAttributes, GetId, user::attributes::UserAttributes};

use super::{SendData, WatcherInnerData};

type InnerData = WatcherInnerData<UserAttributes>;

type Inner = Sender<Option<InnerData>>;

#[derive(Clone, Debug)]
pub struct UserMeWatch(Arc<Inner>);

impl Deref for UserMeWatch {
    type Target = Arc<Inner>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for UserMeWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(None)))
    }
}

impl<T> SendData<T> for UserMeWatch
where
    T: GetId + GetAttributes<Attributes = UserAttributes>,
{
    fn send_data(&self, data: T) -> super::SendDataResult {
        self.send_replace(Some(data.into()));
        Ok(())
    }
}
