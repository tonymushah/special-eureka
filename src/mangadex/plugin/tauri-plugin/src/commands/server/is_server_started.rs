use crate::Error;
use crate::Result;
use mangadex_desktop_api2;
use mangadex_desktop_api2::settings::server_options::ServerOptions;
use tauri::api::http::HttpRequestBuilder;

use super::MangadexDesktopApiHandle;

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

