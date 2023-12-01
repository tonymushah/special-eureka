#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
//use mangadex_desktop_api2::{verify_all_fs, launch_async_server_default};
use tauri::Manager;
use tauri::SystemTray;
use tauri::{CustomMenuItem, SystemTrayMenu, SystemTrayMenuItem, SystemTrayEvent};
use tauri_plugin_aptabase::EventTracker;

#[tauri::command]
async fn close_splashscreen(window: tauri::Window) -> Result<(), String> {
    // Close splashscreen
    window.emit_all("splash", "closing...").map_err(|e| e.to_string())?;
    tokio::time::sleep(std::time::Duration::from_secs(10)).await;
    if let Some(splashscreen) = window.get_window("splashscreen") {
        splashscreen.close().map_err(|e| e.to_string())?;
    }
    // Show main window
    window.get_window("main").ok_or(String::from("the main window is not found"))?.show().map_err(|e| e.to_string())?;
    Ok(())
}

#[tokio::main]
async fn main() {
    let client = sentry_tauri::sentry::init((
        "https://9ded544d4e5945459c62371ec4177585@o4505556825473024.ingest.sentry.io/4505556830322688",
        sentry_tauri::sentry::ClientOptions {
            release: sentry_tauri::sentry::release_name!(),
            ..Default::default()
        },
    ));

    // Everything before here runs in both app and crash reporter processes
    let _guard = sentry_tauri::minidump::init(&client);
    // Everything after here runs in only the app process

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
        .on_system_tray_event(|app, event| {
            let window = app.get_window("main").unwrap(); 
            if let SystemTrayEvent::MenuItemClick { id, .. } = event {
                let item_handle = app.tray_handle().get_item(&id);
                match id.as_str() {
                    "hide" => {
                        if window.is_visible().unwrap() {
                            window.hide().unwrap();
                            item_handle.set_title("Show").unwrap();
                        } else {
                            window.show().unwrap();
                            item_handle.set_title("Hide").unwrap();
                        }
                    },
                    "quit" => {
                        app.exit(0);
                    },
                    _ => {}
                } 
            }else if let SystemTrayEvent::LeftClick { .. } = event {
                let item_handle = app.tray_handle().get_item("hide");
                window.show().unwrap();
                item_handle.set_title("Hide").unwrap();
            }
        })
        .invoke_handler(tauri::generate_handler![close_splashscreen])
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_aptabase::Builder::new("A-EU-7568015669").build())
        .plugin(tauri_plugin_speu_mangadex::init())
        .plugin(sentry_tauri::plugin())
        .setup(|app|{
            app.track_event("app_launched", None);
            Ok(())
        })
        .build(context)
    {
        Ok(app) => app.run(|_app_handle, _event| {}),
        Err(error) => {
            panic!("{}", error.to_string());
        }
    };
}
