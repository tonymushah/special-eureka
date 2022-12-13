#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
//use mangadex_desktop_api2::{verify_all_fs, launch_async_server_default};
mod mangadex_desktop_api;
use tauri::Manager;

#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
  // Close splashscreen
    window.emit_all("splash", "closing...").unwrap();
    std::thread::sleep(std::time::Duration::from_secs(10));
    if let Some(splashscreen) = window.get_window("splashscreen") {
      splashscreen.close().unwrap();
    }
    
    // Show main window
    window.get_window("main").unwrap().show().unwrap()
}

#[tokio::main]
async fn main() {

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![close_splashscreen])
    .plugin(tauri_plugin_store::PluginBuilder::default().build())
    .plugin(mangadex_desktop_api::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
