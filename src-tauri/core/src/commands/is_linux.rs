#[tauri::command]
#[cfg_attr(feature = "hotpath", hotpath::measure)]
pub fn is_linux() -> bool {
    cfg!(target_os = "linux")
}
