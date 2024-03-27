use tauri::{
    CustomMenuItem, Manager, Runtime, SystemTray, SystemTrayEvent, SystemTrayMenu,
    SystemTrayMenuItem,
};

use crate::states::last_focused_window::LastFocusedWindow;

pub fn get_tray() -> SystemTray {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");
    let tray_menu = SystemTrayMenu::new()
        .add_item(quit)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(hide);
    SystemTray::new().with_menu(tray_menu)
}

pub fn on_system_tray_event<R: Runtime>(app: &tauri::AppHandle<R>, event: SystemTrayEvent) {
    if let SystemTrayEvent::MenuItemClick { ref id, .. } = event {
        if id.as_str() == "quit" {
            app.exit(0);
        }
    }
    if app.get_window("splashscreen").is_none() {
        let last_focused_window_state = app.state::<LastFocusedWindow<R>>();
        if let Ok(read) = last_focused_window_state.read() {
            if let Some(window) = read.as_ref() {
                let some_fn = || -> tauri::Result<()> {
                    if let SystemTrayEvent::MenuItemClick { id, .. } = event {
                        let item_handle = app.tray_handle().get_item(&id);
                        if id.as_str() == "hide" {
                            if window.is_visible()? {
                                item_handle.set_title("Show")?;
                                window.hide()?;
                            } else {
                                item_handle.set_title("Hide")?;
                                window.show()?;
                                window.set_focus()?;
                            }
                        }
                    } else if let SystemTrayEvent::LeftClick { .. } = event {
                        let item_handle = app.tray_handle().get_item("hide");
                        item_handle.set_title("Hide")?;
                        window.show()?;
                        window.set_focus()?;
                    }
                    Ok(())
                };
                if let Err(e) = some_fn() {
                    let _ = app.emit_all("system-tray-error", e.to_string());
                }
            }
        };
    }
}
