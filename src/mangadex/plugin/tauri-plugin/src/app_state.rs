use std::sync::Arc;

use mangadex_desktop_api2::AppState;
use tokio::sync::RwLock;

#[derive(Clone)]
pub struct OfflineAppState(pub Arc<RwLock<Option<AppState>>>);