use std::{ops::Deref, sync::Arc};

use mangadex_desktop_api2::AppState;
use tokio::{sync::RwLock, time::Instant};

type OfflineAppStateInner = Arc<RwLock<Option<AppState>>>;

type LastTimeTokenWhenFecthedInner = Arc<RwLock<Option<Instant>>>;

#[derive(Clone)]
pub struct OfflineAppState(OfflineAppStateInner);

impl Default for OfflineAppState {
    fn default() -> Self {
        Self(Arc::new(RwLock::new(None)))
    }
}

impl Deref for OfflineAppState {
    type Target = OfflineAppStateInner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

#[derive(Clone)]
pub struct LastTimeTokenWhenFecthed(LastTimeTokenWhenFecthedInner);

impl Deref for LastTimeTokenWhenFecthed {
    type Target = LastTimeTokenWhenFecthedInner;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl Default for LastTimeTokenWhenFecthed {
    fn default() -> Self {
        Self(Arc::new(RwLock::new(None)))
    }
}
