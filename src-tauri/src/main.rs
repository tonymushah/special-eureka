#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
#[path ="./mangadex_session/main.rs"] mod mangadex_session;

fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_store::PluginBuilder::default().build())
    .plugin(mangadex_session::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
