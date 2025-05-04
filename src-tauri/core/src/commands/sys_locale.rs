use tauri::command;

#[command]
pub fn sys_locale() -> Option<String> {
    sys_locale::get_locale()
}
