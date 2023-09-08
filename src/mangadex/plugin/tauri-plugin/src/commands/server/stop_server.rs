use crate::Error;
use crate::Result;

use super::MangadexDesktopApiHandle;

#[tauri::command]
pub async fn stop_server(state: tauri::State<'_, MangadexDesktopApiHandle>) -> Result<String> {
    let mut inner_sirv = state.server.clone().lock_owned().await;
    let mut inner_sirv_handle = state.server_handle.clone().lock_owned().await;
    let mut inner_app_state = state.app_state.clone().lock_owned().await;
    if inner_sirv_handle.is_some() || inner_sirv.is_some() || inner_app_state.is_some() {
        if let Some(handle) = inner_sirv.take() {
            handle.stop(true).await;
            if let Some(s_handle) = inner_sirv_handle.take() {
                match s_handle.await {
                    Ok(_) => (),
                    Err(e) => println!("{}", e.to_string()),
                };
                inner_app_state.take();
            }
            return Ok("stopped server".to_string());
        } else {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                "Can't find the server handle".to_string(),
            )));
        }
    } else {
        return Err(Error::Io(std::io::Error::new(
            std::io::ErrorKind::Other,
            "Can't find the server handle".to_string(),
        )));
    }
}
