#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
//use mangadex_desktop_api2::{verify_all_fs, launch_async_server_default};
use tauri::Manager;
use tauri::SystemTray;
use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem};

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
  let context = tauri::generate_context!();
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let hide = CustomMenuItem::new("hide".to_string(), "Hide");
  let tray_menu = SystemTrayMenu::new()
    .add_item(quit)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(hide);
  let tray = SystemTray::new().with_menu(tray_menu);
  match tauri::Builder::default()
    .system_tray(tray)
    .invoke_handler(tauri::generate_handler![close_splashscreen])
    .plugin(tauri_plugin_store::PluginBuilder::default().build())
    .plugin(tauri_plugin_speu_mangadex::init())
    .build(context){
      Ok(app) => {
        app.run(|_app_handle, _event| {

        })
      },
      Err(error) => {
        panic!("{}", error.to_string());
      }
    };
  
}
