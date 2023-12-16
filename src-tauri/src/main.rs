#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
//use mangadex_desktop_api2::{verify_all_fs, launch_async_server_default};
use tauri::Manager;
use tauri::SystemTray;
use tauri::{CustomMenuItem, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem};
use tauri_plugin_aptabase::EventTracker;
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

    let builder = tauri::Builder::default();

    /*#[cfg(debug_assertions)]
    let builder = builder.plugin(_devtools);
    */
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
    match builder
        .system_tray(tray)
        .on_system_tray_event(|app, event| {
            if let SystemTrayEvent::MenuItemClick { ref id, .. } = event {
                match id.as_str() {
                    "quit" => {
                        app.exit(0);
                    }
                    _ => {}
                }
            }
            if app.get_window("splashscreen").is_none() {
                let window = app.get_window("main").unwrap();
                if let SystemTrayEvent::MenuItemClick { id, .. } = event {
                    let item_handle = app.tray_handle().get_item(&id);
                    match id.as_str() {
                        "hide" => {
                            if window.is_visible().unwrap() {
                                item_handle.set_title("Show").unwrap();
                                window.hide().unwrap();
                            } else {
                                item_handle.set_title("Hide").unwrap();
                                window.show().unwrap();
                                window.set_focus().unwrap();
                            }
                        }
                        _ => {}
                    }
                } else if let SystemTrayEvent::LeftClick { .. } = event {
                    let item_handle = app.tray_handle().get_item("hide");
                    item_handle.set_title("Hide").unwrap();
                    window.show().unwrap();
                    window.set_focus().unwrap();
                }
            }
        })
        .invoke_handler(tauri::generate_handler![close_splashscreen])
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_aptabase::Builder::new("A-EU-7568015669").build())
        .plugin(tauri_plugin_speu_mangadex::MangadexDesktopApi::default())
        .plugin(sentry_tauri::plugin())
        .setup(|app| {
            #[cfg(any(windows, target_os = "macos"))]
            if let Some(splashscreen) = app.get_window("splashscreen") {
                set_shadow(&splashscreen, true).unwrap();
                #[cfg(target_os = "macos")]
                apply_vibrancy(&splashscreen, NSVisualEffectMaterial::HudWindow, None, None)
                    .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

                #[cfg(target_os = "windows")]
                apply_blur(&splashscreen, Some((18, 18, 18, 125)))
                    .expect("Unsupported platform! 'apply_blur' is only supported on Windows");
            }
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
