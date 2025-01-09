use tauri::{Emitter, Manager, Runtime};

#[tauri::command]
pub async fn close_splashscreen<R: Runtime>(
    webview: tauri::WebviewWindow<R>,
) -> Result<(), String> {
    let main = webview
        .get_webview_window("main")
        .ok_or(String::from("the main window is not found"))?;
    // Close splashscreen
    webview
        .emit("splash", "closing...")
        .map_err(|e| e.to_string())?;
    tokio::time::sleep(std::time::Duration::from_secs(10)).await;
    if let Some(splashscreen) = webview.get_webview_window("splashscreen") {
        splashscreen.close().map_err(|e| e.to_string())?;
    }
    // Show main window
    main.show().map_err(|e| e.to_string())?;
    /*
    #[cfg(any(windows, target_os = "macos"))]
    set_shadow(&main, true).unwrap();
    #[cfg(target_os = "macos")]
    apply_vibrancy(&main, NSVisualEffectMaterial::HudWindow, None, None).expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");
    #[cfg(target_os = "windows")]
    apply_blur(&main, Some((18, 18, 18, 125))).expect("Unsupported platform! 'apply_blur' is only supported on Windows");
    */
    Ok(())
}
