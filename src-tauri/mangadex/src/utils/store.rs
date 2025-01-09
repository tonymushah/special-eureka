use std::{ops::Deref, sync::Arc};

use tauri::Runtime;
use tauri_plugin_store::Store;
use tokio::sync::RwLock;

use crate::store::types::MangaDexStore;

#[derive(Clone)]
pub struct MangaDexStoreState<R: Runtime>(Arc<RwLock<MangaDexStore<R>>>);

impl<R: Runtime> MangaDexStoreState<R> {
    pub fn new(store: MangaDexStore<R>) -> Self {
        Self(Arc::new(RwLock::new(store)))
    }
    pub fn new_from_store(store: Arc<Store<R>>) -> Self {
        Self::new(MangaDexStore(store))
    }
}

impl<R: Runtime> Deref for MangaDexStoreState<R> {
    type Target = Arc<RwLock<MangaDexStore<R>>>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
