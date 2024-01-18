use std::{
    fmt::Debug,
    ops::{Deref, DerefMut},
};

use super::watch::SendDataResult;

#[derive(Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Debug)]
pub enum Source {
    Online,
    Offline,
}

pub struct MultiSourceData<T> {
    data: T,
    source: Source,
}

impl<T> Deref for MultiSourceData<T> {
    type Target = T;
    fn deref(&self) -> &Self::Target {
        &self.data
    }
}

impl<T> DerefMut for MultiSourceData<T> {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.data
    }
}

impl<T> MultiSourceData<T> {
    pub fn online(data: T) -> Self {
        Self {
            data,
            source: Source::Online,
        }
    }
    pub fn offline(data: T) -> Self {
        Self {
            data,
            source: Source::Offline,
        }
    }
    pub fn is_online(&self) -> bool {
        self.source == Source::Online
    }
    pub fn is_offline(&self) -> bool {
        self.source == Source::Offline
    }
    pub fn as_online(self) -> Option<T> {
        if self.is_online() {
            Some(self.data)
        } else {
            None
        }
    }
    pub fn as_offline(self) -> Option<T> {
        if self.is_offline() {
            Some(self.data)
        } else {
            None
        }
    }
    pub fn inner_data(self) -> T {
        self.data
    }
    pub fn inner_data_ref(&self) -> &T {
        self.deref()
    }
}

impl<T> Clone for MultiSourceData<T>
where
    T: Clone,
{
    fn clone(&self) -> Self {
        Self {
            data: self.data.clone(),
            source: self.source,
        }
    }
}

impl<T> Copy for MultiSourceData<T> where T: Copy {}

impl<T> Debug for MultiSourceData<T>
where
    T: Debug,
{
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        self.source.fmt(f)?;
        self.data.fmt(f)
    }
}

pub trait SendMultiSourceData<T>: Send + Sync + Clone {
    fn send_online(&self, data: T) -> SendDataResult;
    fn send_offline(&self, data: T) -> SendDataResult;
}
