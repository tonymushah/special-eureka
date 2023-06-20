use crate::Error;
use crate::Result;
use actix_web::dev::{Server, ServerHandle};
use mangadex_desktop_api2;
use tauri::{AppHandle, Runtime, State, Window};

use tokio::sync::Mutex;

use std::sync::Arc;

pub struct MangadexDesktopApiHandle {
    server: Arc<Mutex<Option<ServerHandle>>>,
}

impl Default for MangadexDesktopApiHandle {
    fn default() -> Self {
        MangadexDesktopApiHandle {
            server: Arc::new(Mutex::new(None)),
        }
    }
}

#[tauri::command]
pub async fn is_server_started(state: tauri::State<'_, MangadexDesktopApiHandle>) -> Result<bool> {
    Ok(state.server.clone().lock().await.is_some())
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
    let mut inner_sirv = state.server.clone().lock_owned().await;
    if inner_sirv.is_none() {
        match inner_sirv.replace(handle) {
            Some(_) => (),
            None => (),
        };
    } else {
        return Err(Error::Io(std::io::Error::new(
            std::io::ErrorKind::AlreadyExists,
            "The server handle already exist",
        )));
    }
    Ok("Server launched".to_string())
}

#[tauri::command]
pub async fn stop_server(state: tauri::State<'_, MangadexDesktopApiHandle>) -> Result<String> {
    let mut server_handle = state.server.clone().lock_owned().await;
    if let Some(handle) = server_handle.take() {
        handle.stop(true).await;
        return Ok("stopped server".to_string());
    } else {
        return Err(Error::Io(std::io::Error::new(
            std::io::ErrorKind::Other,
            "Can't find the server handle".to_string(),
        )));
    }
}
