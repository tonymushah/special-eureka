use crate::ErrorPayload;
use crate::Result;
use crate::{this_eureka_reqwest_result, Error};

use crate::commands::server::MangadexDesktopApiHandle;

#[tauri::command]
pub async fn patch_all_manga_cover(_state: tauri::State<'_, MangadexDesktopApiHandle>) -> Result<String> {
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
    let client = app_state.http_client.lock().await.client.clone();
    let request = client.patch(format!(
        "http://{}:{}/mangas/all/cover",
        server_option.hostname, server_option.port
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