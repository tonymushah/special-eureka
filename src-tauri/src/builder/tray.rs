use tauri::{
    CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem,
};

pub fn get_tray() -> SystemTray {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");
    let tray_menu = SystemTrayMenu::new()
        .add_item(quit)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(hide);
    SystemTray::new().with_menu(tray_menu)
}

pub fn on_system_tray_event(app: &tauri::AppHandle, event: SystemTrayEvent) {
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
}
