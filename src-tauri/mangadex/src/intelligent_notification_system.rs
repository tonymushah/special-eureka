use std::{
    collections::{HashMap, hash_map::Entry},
    hash::Hash,
    io::Result,
};

#[derive(Debug, Clone, Default, PartialEq, Eq, Copy)]
pub enum DownloadEntryState {
    #[default]
    Queue,
    Success,
    Failed,
}

/// Refactor this into an hash map with an enum
#[derive(Clone)]
pub struct DownloadEntries<T>(HashMap<T, DownloadEntryState>);

impl<T> Default for DownloadEntries<T> {
    fn default() -> Self {
        Self::new()
    }
}

impl<T> DownloadEntries<T> {
    pub fn new() -> Self {
        Self(HashMap::new())
    }
    pub fn is_all_finished(&self) -> bool {
        self.0
            .iter()
            .all(|(_, state)| *state != DownloadEntryState::Queue)
    }
    pub fn is_empty(&self) -> bool {
        self.0.is_empty()
    }
    pub fn clear(&mut self) {
        self.0.clear();
    }
}
impl<T> DownloadEntries<T>
where
    T: Clone,
{
    pub fn get_queue(&self) -> Vec<T> {
        self.0
            .iter()
            .filter(|(_, state)| **state == DownloadEntryState::Queue)
            .map(|(t, _)| t.clone())
            .collect()
    }
    pub fn get_success(&self) -> Vec<T> {
        self.0
            .iter()
            .filter(|(_, state)| **state == DownloadEntryState::Success)
            .map(|(t, _)| t.clone())
            .collect()
    }
    pub fn get_failed(&self) -> Vec<T> {
        self.0
            .iter()
            .filter(|(_, state)| **state == DownloadEntryState::Failed)
            .map(|(t, _)| t.clone())
            .collect()
    }
    pub fn get_failed_len(&self) -> usize {
        self.0
            .iter()
            .filter(|(_, state)| **state == DownloadEntryState::Failed)
            .count()
    }
    pub fn get_success_len(&self) -> usize {
        self.0
            .iter()
            .filter(|(_, state)| **state == DownloadEntryState::Success)
            .count()
    }
    pub fn get_queue_len(&self) -> usize {
        self.0
            .iter()
            .filter(|(_, state)| **state == DownloadEntryState::Queue)
            .count()
    }
    pub fn get_finished_len(&self) -> usize {
        self.0
            .iter()
            .filter(|(_, state)| **state != DownloadEntryState::Queue)
            .count()
    }
    pub fn entries(&self) -> Vec<T> {
        self.0.keys().cloned().collect()
    }
}

impl<T> DownloadEntries<T>
where
    T: Eq + Hash,
{
    pub fn add_in_queue(&mut self, to_insert: T) -> Result<()> {
        match self.0.entry(to_insert) {
            Entry::Occupied(_) => {
                return Err(std::io::Error::new(
                    std::io::ErrorKind::AlreadyExists,
                    "The value to insert is alredy in queue",
                ));
            }
            Entry::Vacant(d) => {
                d.insert(DownloadEntryState::Queue);
            }
        }
        Ok(())
    }
    pub fn add_in_failed(&mut self, to_insert: T) -> Result<()> {
        match self.0.entry(to_insert) {
            Entry::Occupied(mut e) => match e.get() {
                DownloadEntryState::Queue => {
                    *e.get_mut() = DownloadEntryState::Failed;
                }
                DownloadEntryState::Success => {
                    return Err(std::io::Error::new(
                        std::io::ErrorKind::AlreadyExists,
                        "The value to insert is alredy in success",
                    ));
                }
                DownloadEntryState::Failed => {
                    return Err(std::io::Error::new(
                        std::io::ErrorKind::AlreadyExists,
                        "The value to insert is alredy in failed",
                    ));
                }
            },
            Entry::Vacant(_) => {
                return Err(std::io::Error::new(
                    std::io::ErrorKind::AlreadyExists,
                    "The value to insert is alredy in failed",
                ));
            }
        }
        Ok(())
    }
    pub fn add_in_success(&mut self, to_insert: T) -> Result<()> {
        match self.0.entry(to_insert) {
            Entry::Occupied(mut e) => match e.get() {
                DownloadEntryState::Queue => {
                    *e.get_mut() = DownloadEntryState::Success;
                }
                DownloadEntryState::Success => {
                    return Err(std::io::Error::new(
                        std::io::ErrorKind::AlreadyExists,
                        "The value to insert is alredy in success",
                    ));
                }
                DownloadEntryState::Failed => {
                    return Err(std::io::Error::new(
                        std::io::ErrorKind::AlreadyExists,
                        "The value to insert is alredy in failed",
                    ));
                }
            },
            Entry::Vacant(_) => {
                return Err(std::io::Error::new(
                    std::io::ErrorKind::AlreadyExists,
                    "The value to insert is alredy in failed",
                ));
            }
        }
        Ok(())
    }
}
