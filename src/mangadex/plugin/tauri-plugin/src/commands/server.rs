use crate::Error;
use crate::Result;
use actix_web::dev::{Server, ServerHandle};
use mangadex_desktop_api2;
use tauri::async_runtime::JoinHandle;
use tauri::{AppHandle, Runtime, State, Window};

use tokio::sync::Mutex;

use std::sync::Arc;

pub struct MangadexDesktopApiHandle {
    server: Arc<Mutex<Option<ServerHandle>>>,
    server_handle: Arc<Mutex<Option<JoinHandle<std::result::Result<(), std::io::Error>>>>>,
}

impl Default for MangadexDesktopApiHandle {
    fn default() -> Self {
        MangadexDesktopApiHandle {
            server: Arc::new(Mutex::new(None)),
            server_handle: Arc::new(Mutex::new(None)),
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

    state
        .server_handle
        .clone()
        .lock_owned()
        .await
        .replace(tauri::async_runtime::spawn(async move {
            return server.await;
        }));
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
        if let Some(s_handle) = state.server_handle.clone().lock_owned().await.take() {
            match s_handle.await {
                Ok(_) => (),
                Err(e) => println!("{}", e.to_string()),
            };
        }
        return Ok("stopped server".to_string());
    } else {
        return Err(Error::Io(std::io::Error::new(
            std::io::ErrorKind::Other,
            "Can't find the server handle".to_string(),
        )));
    }
}
