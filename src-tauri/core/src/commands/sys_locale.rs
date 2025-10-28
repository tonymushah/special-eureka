use tauri::command;

#[command]
#[cfg_attr(feature = "hotpath", hotpath::measure)]
pub fn sys_locale() -> Option<String> {
    sys_locale::get_locale()
}
