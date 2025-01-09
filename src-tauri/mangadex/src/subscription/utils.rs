pub mod watch;

use tokio_stream::{Stream, StreamExt};
use uuid::Uuid;
pub use watch::WatchSubscriptionStream;

use crate::utils::watch::WatcherInnerData;

pub trait FilterWatchDataById: Stream {
    type OutputItem;
    fn filter_by_id(self, id: Uuid) -> impl Stream<Item = Self::OutputItem>;
}

pub trait FilterWatchOptionDataById: Stream {
    type OutputItem;
    fn option_filter_by_id(self, id: Uuid) -> impl Stream<Item = Self::OutputItem>;
}

impl<S, T> FilterWatchDataById for S
where
    S: Stream<Item = WatcherInnerData<T>>,
{
    type OutputItem = T;
    fn filter_by_id(self, id: Uuid) -> impl Stream<Item = Self::OutputItem> {
        self.filter(move |data| data.id == id).map(|d| d.attributes)
    }
}

impl<S, T> FilterWatchOptionDataById for S
where
    S: Stream<Item = Option<WatcherInnerData<T>>>,
{
    type OutputItem = T;
    fn option_filter_by_id(self, id: Uuid) -> impl Stream<Item = Self::OutputItem> {
        self.filter_map(move |v| v.filter(|data| data.id == id).map(|data| data.attributes))
    }
}

pub trait OptionFlattenStream: Stream {
    type OutputItem;
    fn option_flatten(self) -> impl Stream<Item = Self::OutputItem>;
}

impl<S, T> OptionFlattenStream for S
where
    S: Stream<Item = Option<T>>,
{
    type OutputItem = T;
    fn option_flatten(self) -> impl Stream<Item = Self::OutputItem> {
        self.filter_map(|v| v)
    }
}

pub trait ResultFlattenStream: Stream {
    type OutputItem;
    fn result_flatten(self) -> impl Stream<Item = Self::OutputItem>;
}

impl<S, T, E> ResultFlattenStream for S
where
    S: Stream<Item = Result<T, E>>,
{
    type OutputItem = T;
    fn result_flatten(self) -> impl Stream<Item = Self::OutputItem> {
        self.filter_map(|v| v.ok())
    }
}
