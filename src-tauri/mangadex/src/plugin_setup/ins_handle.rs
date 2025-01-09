use tauri::Runtime;

pub fn ins_handle<R: Runtime>(app: &tauri::AppHandle<R>) -> crate::PluginSetupResult<()> {
    Ok(())
}
