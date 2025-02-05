use std::{ops::Deref, sync::Arc};

use serde::{Deserialize, Serialize};
use tauri::Runtime;
use tauri_plugin_store::{Error, Store, StoreBuilder};

pub mod enums;
pub mod structs;

pub trait ExtractFromStore<'de, R>: std::marker::Sized + Deserialize<'de>
where
    R: Runtime,
{
    fn extract_from_store(store: &Store<R>) -> Result<Self, Error>;
}

pub trait StoreCrud<R>: Serialize
where
    R: Runtime,
{
    fn insert(&self, store: &Store<R>) -> Result<(), Error>;
    fn insert_and_save(&self, store: &Store<R>) -> Result<(), Error> {
        self.insert(store)?;
        store.save()?;
        Ok(())
    }
    fn delete(&self, store: &Store<R>) -> Result<(), Error>;
    fn delete_and_save(&self, store: &Store<R>) -> Result<(), Error> {
        self.delete(store)?;
        store.save()?;
        Ok(())
    }
}

pub trait DefaulStore<R>
where
    R: Runtime,
{
    fn default_store(store_builder: StoreBuilder<R>) -> Result<StoreBuilder<R>, Error>;
}

#[derive(Clone)]
pub struct MangaDexStore<R: Runtime>(pub(crate) Arc<Store<R>>);

impl<R: Runtime> Deref for MangaDexStore<R> {
    type Target = Store<R>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
