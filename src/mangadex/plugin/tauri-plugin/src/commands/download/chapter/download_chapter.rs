use crate::Result;
use crate::commands::server::MangadexDesktopApiHandle;

use super::download_chapter_normal_mode;

#[tauri::command]
pub async fn download_chapter(
    chapter_id: String,
    _state: tauri::State<'_, MangadexDesktopApiHandle>,
) -> Result<String> {
    Ok(download_chapter_normal_mode(chapter_id, _state).await?)
}
