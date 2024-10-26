use std::{ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::store::types::enums::pagination_style::PaginationStyle;

use super::{SendData, SendDataResult};

type InnerData = PaginationStyle;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct PaginationStyleWatch(Arc<Inner>);

impl Deref for PaginationStyleWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for PaginationStyleWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(InnerData::default())))
    }
}

impl<T> SendData<T> for PaginationStyleWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
