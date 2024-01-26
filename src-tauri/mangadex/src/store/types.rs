use std::ops::{Deref, DerefMut};

use serde::{Deserialize, Serialize};
use tauri::Runtime;
use tauri_plugin_store::{Error, Store, StoreBuilder};

pub mod enums;
pub mod structs;

pub(crate) trait ExtractFromStore<'de, R>: std::marker::Sized + Deserialize<'de>
where
    R: Runtime,
{
    fn extract_from_store(store: &Store<R>) -> Result<Self, Error>;
}

pub(crate) trait StoreCrud<R>: Serialize
where
    R: Runtime,
{
    fn insert(&self, store: &mut Store<R>) -> Result<(), Error>;
    fn insert_and_save(&self, store: &mut Store<R>) -> Result<(), Error> {
        self.insert(store)?;
        store.save()?;
        Ok(())
    }
    fn delete(&self, store: &mut Store<R>) -> Result<(), Error>;
    fn delete_and_save(&self, store: &mut Store<R>) -> Result<(), Error> {
        self.delete(store)?;
        store.save()?;
        Ok(())
    }
}

pub(crate) trait DefaulStore<R>
where
    R: Runtime,
{
    fn default_store(store_builder: StoreBuilder<R>) -> Result<StoreBuilder<R>, Error>;
}

#[derive(Clone)]
pub struct MangaDexStore<R: Runtime>(pub(crate) Store<R>);

impl<R: Runtime> Deref for MangaDexStore<R> {
    type Target = Store<R>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl<R: Runtime> DerefMut for MangaDexStore<R> {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}
