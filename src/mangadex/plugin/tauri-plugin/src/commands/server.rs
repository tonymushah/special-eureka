use actix_web::dev::ServerHandle;
use mangadex_desktop_api2;
use mangadex_desktop_api2::server::AppState;

use tokio::sync::Mutex;
use tauri::async_runtime::JoinHandle;

use std::sync::Arc;

pub struct MangadexDesktopApiHandle {
    pub server: Arc<Mutex<Option<ServerHandle>>>,
    pub server_handle: Arc<Mutex<Option<JoinHandle<std::result::Result<(), std::io::Error>>>>>,
    pub app_state: Arc<Mutex<Option<AppState>>>
}

impl Default for MangadexDesktopApiHandle {
    fn default() -> Self {
        MangadexDesktopApiHandle {
            server: Arc::new(Mutex::new(None)),
            server_handle: Arc::new(Mutex::new(None)),
            app_state: Arc::new(Mutex::new(None)),
        }
    }
}

mod launch_server;
pub use launch_server::*;

mod is_server_started;
pub use is_server_started::*;

mod stop_server;
pub use stop_server::*;

mod get_running_tasks;
pub use get_running_tasks::*;

mod get_tasks_limit;
pub use get_tasks_limit::*;