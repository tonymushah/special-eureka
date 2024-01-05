use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::objects::{user::attributes::UserAttributes, GetAttributes, GetId};

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
        if let Err(err) = self.send(Some(data.into())) {
            Err(err.to_string())
        } else {
            Ok(())
        }
    }
}
