#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
//use std::path::Path;

//use mangadex_desktop_api2::{verify_all_fs, launch_async_server_default};
use tauri::Manager;
use tauri::Menu;
use tauri::SystemTray;
use tauri::Window;
use tauri::{CustomMenuItem, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem};
use uuid::Uuid;
#[cfg(any(windows, target_os = "macos"))]
use window_shadows::set_shadow;
#[cfg(any(windows, target_os = "macos"))]
use window_vibrancy::apply_blur;
#[cfg(target_os = "macos")]
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};

#[tauri::command]
async fn close_splashscreen(window: tauri::Window) -> Result<(), String> {
    let main = window
        .get_window("main")
        .ok_or(String::from("the main window is not found"))?;
    // Close splashscreen
    window
        .emit_all("splash", "closing...")
        .map_err(|e| e.to_string())?;
    tokio::time::sleep(std::time::Duration::from_secs(10)).await;
    if let Some(splashscreen) = window.get_window("splashscreen") {
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

fn main() {
    /*
    #[cfg(debug_assertions)] // only enable instrumentation in development builds
    let _devtools = devtools::init();
    */
    let mut builder = tauri::Builder::default();

    let context = tauri::generate_context!();
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");
    let tray_menu = SystemTrayMenu::new()
        .add_item(quit)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(hide);
    let tray = SystemTray::new().with_menu(tray_menu);

    let dev_menu = Menu::new()
        .add_item(CustomMenuItem::new(String::from("home"), "Home"))
        .add_item(CustomMenuItem::new(
            String::from("new_window"),
            "New Window",
        ));
    builder = builder
        .menu(dev_menu)
        .on_menu_event(|e| match e.menu_item_id() {
            "new_window" => {
                let current_url = e.window().url();
                let _ = Window::builder(
                    e.window(),
                    Uuid::new_v4().to_string(),
                    tauri::WindowUrl::External(current_url),
                )
                .title("Special Eureka")
                .build();
            }
            "home" => {
                let _ = e.window().emit("redirect", "/");
            }
            _ => {}
        });
    let on_system_tray_event = |app: &tauri::AppHandle, event: SystemTrayEvent| {
        if let SystemTrayEvent::MenuItemClick { ref id, .. } = event {
            if id.as_str() == "quit" {
                app.exit(0);
            }
        }
        if app.get_window("splashscreen").is_none() {
            let window = app.get_window("main").unwrap();
            if let SystemTrayEvent::MenuItemClick { id, .. } = event {
                let item_handle = app.tray_handle().get_item(&id);
                if id.as_str() == "hide" {
                    if window.is_visible().unwrap() {
                        item_handle.set_title("Show").unwrap();
                        window.hide().unwrap();
                    } else {
                        item_handle.set_title("Hide").unwrap();
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                }
            } else if let SystemTrayEvent::LeftClick { .. } = event {
                let item_handle = app.tray_handle().get_item("hide");
                item_handle.set_title("Hide").unwrap();
                window.show().unwrap();
                window.set_focus().unwrap();
            }
        }
    };
    let setup = |_app: &mut tauri::App| -> Result<(), Box<dyn std::error::Error>> {
        #[cfg(any(windows, target_os = "macos"))]
        if let Some(splashscreen) = _app.get_window("splashscreen") {
            set_shadow(&splashscreen, true).unwrap();
            #[cfg(target_os = "macos")]
            apply_vibrancy(&splashscreen, NSVisualEffectMaterial::HudWindow, None, None)
                .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

            #[cfg(target_os = "windows")]
            apply_blur(&splashscreen, Some((18, 18, 18, 125)))
                .expect("Unsupported platform! 'apply_blur' is only supported on Windows");
        }
        Ok(())
    };
    match builder
        .system_tray(tray)
        .on_system_tray_event(on_system_tray_event)
        .invoke_handler(tauri::generate_handler![close_splashscreen])
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_speu_mangadex::init())
        .setup(setup)
        .build(context)
    {
        Ok(app) => app.run(|_app_handle, _event| {}),
        Err(error) => {
            panic!("{}", error.to_string());
        }
    };
}
