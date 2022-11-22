#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
//use mangadex_desktop_api2::{verify_all_fs, launch_async_server_default};


#[tokio::main]
async fn main() {

  tauri::Builder::default()
    .plugin(tauri_plugin_store::PluginBuilder::default().build())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
