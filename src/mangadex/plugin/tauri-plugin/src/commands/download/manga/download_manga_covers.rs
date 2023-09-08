use crate::ErrorPayload;
use crate::Result;
use crate::{this_eureka_reqwest_result, Error};

use crate::commands::server::MangadexDesktopApiHandle;

#[tauri::command]
pub async fn download_manga_covers(
    manga_id: String,
    _state: tauri::State<'_, MangadexDesktopApiHandle>,
) -> Result<String> {
    let app_state = _state
        .app_state
        .lock()
        .await
        .clone()
        .ok_or(std::io::Error::new(
            std::io::ErrorKind::NotFound,
            "The app state is not initialized",
        ))?;
    let server_option = app_state.server_options.clone();
    let client = &app_state.http_client.lock().await.client;
    let request = client.put(format!(
        "http://{}:{}/manga/{}/covers",
        server_option.hostname, server_option.port, manga_id
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)
}
