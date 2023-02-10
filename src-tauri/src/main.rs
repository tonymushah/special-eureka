#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
//use mangadex_desktop_api2::{verify_all_fs, launch_async_server_default};
mod mangadex_desktop_api;
use std::io::Result;

use tauri::Manager;
use tauri::SystemTray;
use tauri::api::notification::Notification;
use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem};
use once_cell::sync::OnceCell;
use tauri::api::dialog::message;

static mut NOTIFICATION_HANDLE : OnceCell<Notification> = OnceCell::new();

fn set_notification_handle(identifier: impl Into<String>) -> Result<()>{
  let noti = Notification::new(identifier);
  match std::thread::spawn(move|| -> Result<()> {
    unsafe{
      match NOTIFICATION_HANDLE.set(noti) {
      Ok(_) => return Ok(()),
      Err(_) => {
        return Err(std::io::Error::new(std::io::ErrorKind::Other, "The notification handle already setted"));
      }
    }
    }
  }).join(){
    Ok(res) => res,
    Err(_) => Err(std::io::Error::new(std::io::ErrorKind::Other, "The notification handle already setted"))
  }
}

pub fn get_notification_handle() -> Result<&'static Notification>{
  let data_: &'static Notification;
  unsafe{
    match NOTIFICATION_HANDLE.get(){
      None => return Err(std::io::Error::new(std::io::ErrorKind::NotFound, "Notification handle not found")),
      Some(data) => {
        data_ = data;
      }
    }
  }
  Ok(data_)
}

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
  let identifier = context.config().tauri.bundle.identifier.clone();

  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let hide = CustomMenuItem::new("hide".to_string(), "Hide");
  let tray_menu = SystemTrayMenu::new()
    .add_item(quit)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(hide);
  let tray = SystemTray::new().with_menu(tray_menu);

  match tauri::Builder::default().setup(move |_app| {
      let identifier = &identifier;
      set_notification_handle(identifier).unwrap();
      Ok(())
    })
    .system_tray(tray)
    .invoke_handler(tauri::generate_handler![close_splashscreen])
    .plugin(tauri_plugin_store::PluginBuilder::default().build())
    .plugin(mangadex_desktop_api::init())
    .setup(|app_| {
      Ok(())
    })
    .build(context){
      Ok(app) => {
        app.run(|_app_handle, _event| {

        })
      },
      Err(error) => {
      }
    };
  
}
