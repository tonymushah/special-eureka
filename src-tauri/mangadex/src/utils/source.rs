use std::ops::{Deref, DerefMut};

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
