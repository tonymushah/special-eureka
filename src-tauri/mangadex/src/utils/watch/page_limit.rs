use std::{num::NonZero, ops::Deref, sync::Arc};

use tokio::sync::watch::Sender;

use crate::store::types::structs::page_limit::PAGE_LIMIT_DEFAULT;

use super::{SendData, SendDataResult};

type InnerData = Option<NonZero<u64>>;

type Inner = Sender<InnerData>;

#[derive(Clone, Debug)]
pub struct PageLimitWatch(Arc<Inner>);

impl Deref for PageLimitWatch {
    type Target = Inner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for PageLimitWatch {
    fn default() -> Self {
        Self(Arc::new(Sender::new(NonZero::new(PAGE_LIMIT_DEFAULT))))
    }
}

impl<T> SendData<T> for PageLimitWatch
where
    T: Into<InnerData>,
{
    fn send_data(&self, data: T) -> SendDataResult {
        self.send_replace(data.into());
        Ok(())
    }
}
