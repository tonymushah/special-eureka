#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use tauri_plugin_log::{LogTarget, LoggerBuilder};
//use mangadex_desktop_api2::{verify_all_fs, launch_async_server_default};
mod mangadex_desktop_api;

#[tokio::main]
async fn main() {

  tauri::Builder::default()
    .plugin(LoggerBuilder::default().targets([
      LogTarget::LogDir
    ]).build())
    .plugin(tauri_plugin_store::PluginBuilder::default().build())
    .plugin(mangadex_desktop_api::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
