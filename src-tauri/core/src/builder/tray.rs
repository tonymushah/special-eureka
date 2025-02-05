use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, TrayIconEvent},
    AppHandle, Manager, Runtime,
};

use crate::{
    commands::open_new_window::{open_new_window_sync, open_new_window_sync_from_app},
    states::last_focused_window::LastFocusedWindow,
};

pub fn on_tray<R: Runtime>(app: &AppHandle<R>, event: TrayIconEvent) {
    if let Some(tray) = app.tray_by_id(event.id()) {
        (|| {
            let Ok(quit) = MenuItem::new(app, "Quit", true, None::<&str>) else {
                return;
            };
            let Ok(new_window) = MenuItem::new(app, "Open a new window", true, None::<&str>) else {
                return;
            };
            let Ok(menu) = Menu::with_items(app, &[&quit, &new_window]) else {
                return;
            };
            if tray.set_menu(Some(menu)).is_ok() {
                tray.on_menu_event(move |app, event| {
                    if event.id() == quit.id() {
                        app.exit(0);
                    }
                    if event.id == new_window.id()
                        && app.get_webview_window("splashcreen").is_none()
                    {
                        let last_wrap = app.state::<LastFocusedWindow<R>>();
                        if let Some(last) = last_wrap
                            .read()
                            .ok()
                            .and_then(|e| e.as_ref().map(|w| w.label().to_string()))
                            .and_then(|label| app.get_webview_window(&label))
                        {
                            let _ = open_new_window_sync(&last, None);
                        } else {
                            let _ = open_new_window_sync_from_app(app, None);
                        }
                    }
                });
            }
        })();
    }
    if let TrayIconEvent::Click { button, .. } = &event {
        if *button == MouseButton::Left {
            let last_wrap = app.state::<LastFocusedWindow<R>>();
            if let Ok(last) = last_wrap.read() {
                let _ = last.as_ref().and_then(|l| l.set_focus().ok());
            };
        }
    }
}
