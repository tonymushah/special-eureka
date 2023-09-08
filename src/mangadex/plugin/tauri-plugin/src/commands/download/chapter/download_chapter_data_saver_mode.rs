use crate::ins_handle::{add_in_chapter_failed, add_in_chapter_success};
use crate::ErrorPayload;
use crate::Result;
use crate::{this_eureka_reqwest_result, Error};
use crate::commands::server::MangadexDesktopApiHandle;

use serde_json::Value;

#[tauri::command]
pub async fn download_chapter_data_saver_mode(
    chapter_id: String,
    _state: tauri::State<'_, MangadexDesktopApiHandle>,
) -> Result<String> {
    let chap_id__ = chapter_id.clone();
    let chap_id___ = chapter_id.clone();
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
        "http://{}:{}/chapter/{}/data-saver",
        server_option.hostname, server_option.port, chapter_id
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
    let json_data: Value = serde_json::from_str(response_text.clone().as_str())?;
    if let Some(errors) = json_data.get("errors") {
        if let Some(errors_vec) = errors.as_array() {
            if errors_vec.is_empty() {
                add_in_chapter_success(chap_id__.clone())?;
            } else {
                add_in_chapter_failed(chap_id__.clone())?;
            }
        } else {
            add_in_chapter_success(chap_id___)?;
        }
    } else {
        add_in_chapter_success(chap_id__)?;
    }
    Ok(response_text)
}
