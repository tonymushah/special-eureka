use std::fmt::Debug;

use uuid::Uuid;

use crate::objects::{GetAttributes, GetId};

pub mod api_client;
pub mod author;
pub mod chapter;
pub mod cover;
pub mod custom_list;
pub mod manga;
pub mod rating;
pub mod read_marker;
pub mod scanalation_group;
pub mod statistics;
pub mod tag;
pub mod upload;
pub mod user;

pub struct WatcherInnerData<T: ?Sized> {
    pub id: Uuid,
    pub attributes: T,
}

impl<T> Clone for WatcherInnerData<T>
where
    T: Clone,
{
    fn clone(&self) -> Self {
        Self {
            id: self.id,
            attributes: self.attributes.clone(),
        }
    }
}

impl<T> Copy for WatcherInnerData<T> where T: Copy {}

impl<T> From<(Uuid, T)> for WatcherInnerData<T> {
    fn from((id, attributes): (Uuid, T)) -> Self {
        Self { id, attributes }
    }
}

/*
impl<T> GetId for WatcherInnerData<T> {
    fn get_id(&self) -> Uuid {
        self.id
    }
}

impl<T> GetAttributes for WatcherInnerData<T>
where
    T: Clone,
{
    type Attributes = T;
    fn get_attributes(&self) -> Self::Attributes {
        self.attributes.clone()
    }
}

*/

impl<I, T> From<I> for WatcherInnerData<T>
where
    I: GetId + GetAttributes<Attributes = T>,
{
    fn from(value: I) -> Self {
        Self {
            id: value.get_id(),
            attributes: value.get_attributes(),
        }
    }
}

impl<T> Debug for WatcherInnerData<T>
where
    T: Debug,
{
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        self.id.fmt(f)?;
        self.attributes.fmt(f)
    }
}

pub type SendDataResult = Result<(), String>;

pub trait SendData<T>: Send + Sync + Clone {
    fn send_data(&self, data: T) -> SendDataResult;
}
