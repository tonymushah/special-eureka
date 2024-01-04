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
