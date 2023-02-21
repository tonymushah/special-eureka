#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
//use mangadex_desktop_api2::{verify_all_fs, launch_async_server_default};
mod mangadex_desktop_api;
use std::io::Result;

use tauri::Manager;
use tauri::Menu;
use tauri::SystemTray;
use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem};
use once_cell::sync::OnceCell;

static mut INDENTIFIER : OnceCell<String> = OnceCell::new();

fn set_indentifier(identifier: String) -> Result<()>{
  match std::thread::spawn(move|| -> Result<()> {
    unsafe{
      match INDENTIFIER.set(identifier) {
      Ok(_) => return Ok(()),
      Err(_) => {
        return Err(std::io::Error::new(std::io::ErrorKind::AlreadyExists, "The identifier already setted"));
      }
    }
    }
  }).join(){
    Ok(res) => res,
    Err(_) => Err(std::io::Error::new(std::io::ErrorKind::Other, "Error on loading notification handle"))
  }
}

pub fn get_indentifier() -> Result<&'static String>{
  let data_: &'static String;
  unsafe{
    match INDENTIFIER.get(){
      None => return Err(std::io::Error::new(std::io::ErrorKind::NotFound, "Identifier not found")),
      Some(data) => {
        data_ = data;
      }
    }
  }
  Ok(data_)
}

pub fn get_notification_handle_mut() -> Result<&'static mut String>{
  let data_: &'static mut String;
  unsafe{
    match INDENTIFIER.get_mut(){
      None => return Err(std::io::Error::new(std::io::ErrorKind::NotFound, "Identifier not found")),
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

  match set_indentifier(identifier){
    Ok(_) => (),
    Err(err) => {
      panic!("{}", err.to_string());
    }
  };

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
    .plugin(mangadex_desktop_api::init())
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
