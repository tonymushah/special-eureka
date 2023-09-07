use crate::Error;
use crate::Result;
use actix_web::dev::{Server, ServerHandle};
use mangadex_desktop_api2;
use mangadex_desktop_api2::server::AppState;
use mangadex_desktop_api2::settings::server_options::ServerOptions;
use tauri::api::http::HttpRequestBuilder;
use tauri::async_runtime::JoinHandle;
use tauri::{AppHandle, Runtime, State, Window};

use tokio::sync::Mutex;

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

#[tauri::command]
pub async fn is_server_started(_state: tauri::State<'_, MangadexDesktopApiHandle>) -> Result<bool> {
    #[cfg(realease)]{
        Ok(_state.server.clone().lock().await.is_some())
    }
    #[cfg(not(realease))]{
        let client = match tauri::api::http::ClientBuilder::new().build() {
            Ok(d) => d,
            Err(e) => return Err(Error::Io(std::io::Error::new(std::io::ErrorKind::Other, e.to_string())))
        };
        let sirv_option = match ServerOptions::new() {
            Ok(d) => d,
            Err(e) => return Err(Error::Io(std::io::Error::new(std::io::ErrorKind::Other, e.to_string())))
        };
        let request = match HttpRequestBuilder::new("GET", format!("http://{}:{}", sirv_option.hostname, sirv_option.port)) {
            Ok(d) => d,
            Err(e) => return Err(Error::Io(std::io::Error::new(std::io::ErrorKind::Other, e.to_string())))
        };
        match client.send(request).await {
            Ok(d) => Ok(d.status().is_success()),
            Err(e) => Err(Error::Io(std::io::Error::new(std::io::ErrorKind::Other, e.to_string())))
        }
    }
}

#[tauri::command(rename_all = "snake_case")]
pub async fn launch_server<R: Runtime>(
    _app: AppHandle<R>,
    _window: Window<R>,
    state: State<'_, MangadexDesktopApiHandle>,
) -> Result<String> {
    let server: Server = mangadex_desktop_api2::launch_async_server_default().await?;
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
