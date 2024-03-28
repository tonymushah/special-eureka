use std::{
    ops::Deref,
    sync::{Arc, RwLock},
};

use tauri::{Runtime, Window};

#[derive(Clone, Debug)]
pub struct LastFocusedWindow<R: Runtime>(Arc<RwLock<Option<Window<R>>>>);

impl<R: Runtime> Deref for LastFocusedWindow<R> {
    type Target = Arc<RwLock<Option<Window<R>>>>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl<R: Runtime> Default for LastFocusedWindow<R> {
    fn default() -> Self {
        Self(Arc::new(RwLock::new(None)))
    }
}
