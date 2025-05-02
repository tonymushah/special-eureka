#[tauri::command]
pub fn is_linux() -> bool {
    cfg!(target_os = "linux")
}
