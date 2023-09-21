use crate::ins_handle::{add_in_chapter_failed, add_in_chapter_queue, add_in_chapter_success};
use crate::Result;
use crate::commands::server::MangadexDesktopApiHandle;

use serde_json::Value;

use super::download_chapter_normal_func;

#[tauri::command]
pub async fn download_chapter_normal_mode(
    chapter_id: String,
    _state: tauri::State<'_, MangadexDesktopApiHandle>,
) -> Result<String> {
    let chap_id_ = chapter_id.clone();
    let chap_id__ = chapter_id.clone();
    let chap_id___ = chapter_id.clone();
    add_in_chapter_queue(chap_id_)?;
    let data = match download_chapter_normal_func(chapter_id, _state).await {
        Ok(data) => data,
        Err(err) => {
            add_in_chapter_failed(chap_id__)?;
            return Err(err);
        }
    };
    let json_data: Value = serde_json::from_str(data.clone().as_str())?;
    if let Some(errors) = json_data.get("errors") {
        if let Some(errors_vec) = errors.as_array() {
            if errors_vec.is_empty() {
                add_in_chapter_success(chap_id__.clone())?;
                return Ok(data);
            } else {
                add_in_chapter_failed(chap_id__.clone())?;
                return Ok(data);
            }
        } else {
            add_in_chapter_success(chap_id___)?;
            return Ok(data);
        }
    } else {
        add_in_chapter_success(chap_id__)?;
        return Ok(data);
    }
}