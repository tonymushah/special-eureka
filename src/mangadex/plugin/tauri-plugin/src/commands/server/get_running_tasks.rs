use super::MangadexDesktopApiHandle;

#[tauri::command]
pub async fn get_running_tasks(
    state: tauri::State<'_, MangadexDesktopApiHandle>,
) -> crate::Result<usize> {
    let s = state.app_state.clone();
    let app_state_ = s.lock().await;
    if let Some(app_state) = app_state_.as_ref() {
        Ok(app_state.download_tasks.get_running_tasks())
    } else {
        Err(crate::Error::Io(std::io::Error::new(
            std::io::ErrorKind::NotFound,
            "App state is not initialized",
        )))
    }
}
