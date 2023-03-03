use actix_web::dev::{Server, ServerHandle};
use mangadex_desktop_api2;
use tauri::{
    AppHandle, Runtime, State, Window,
};
use crate::Error;
use crate::Result;
use crate::handle_error;

use std::{collections::HashMap, sync::Mutex};
pub struct MangadexDesktopApiHandle {
    key: Mutex<String>,
    def: Mutex<HashMap<String, ServerHandle>>,
}

impl Default for MangadexDesktopApiHandle {
    fn default() -> Self {
        let hash_maps: HashMap<String, ServerHandle> = HashMap::new();
        MangadexDesktopApiHandle {
            def: Mutex::new(hash_maps),
            key: Mutex::new("default".to_string()),
        }
    }
}

#[tauri::command]
pub async fn launch_server<R: Runtime>(
    _app: AppHandle<R>,
    _window: Window<R>,
    state: State<'_, MangadexDesktopApiHandle>,
) -> Result<String> {
    mangadex_desktop_api2::verify_all_fs()?;
    let server: Server = mangadex_desktop_api2::launch_async_server_default()?;
    let handle: ServerHandle = server.handle();
    tauri::async_runtime::spawn(server);
    handle_error!(state.def.lock()).insert(handle_error!(state.key.lock()).to_string(), handle);
    Ok("server launched".to_string())
}

#[tauri::command]
pub async fn stop_server(state: tauri::State<'_, MangadexDesktopApiHandle>) -> Result<String> {
    let key = handle_error!(state.key.lock()).to_string();
    let mut start = handle_error!(state.def.lock());
    let handle_base = match start.get_mut(&(key)) {
        Some(data) => data,
        None => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                "Can't find the server handle".to_string(),
            )))
        }
    };
    let handle = handle_base.stop(true);
    tauri::async_runtime::spawn(handle);
    Ok("stopped server".to_string())
}
