use std::{ops::Deref, sync::Arc};

use mangadex_desktop_api2::AppState;
use tokio::sync::RwLock;

type OfflineAppStateInner = Arc<RwLock<Option<AppState>>>;

#[derive(Clone)]
pub struct OfflineAppState(pub OfflineAppStateInner);

impl Deref for OfflineAppState {
    type Target = OfflineAppStateInner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
