use tauri::{
    AppHandle, Manager, Runtime,
    menu::{Menu, MenuItem},
    tray::TrayIconBuilder,
};

use crate::{
    commands::open_new_window::{open_new_window_sync, open_new_window_sync_from_app},
    states::last_focused_window::LastFocusedWindow,
};

pub fn setup<R: Runtime>(app: &AppHandle<R>) -> tauri::Result<()> {
    let quit = MenuItem::new(app, "Quit", true, None::<&str>)?;
    let new_window = MenuItem::new(app, "Open a new window", true, None::<&str>)?;
    let menu = Menu::with_items(app, &[&quit, &new_window])?;
    let focus_last = MenuItem::new(app, "Focus last window", true, None::<&str>)?;

    let _tray = TrayIconBuilder::new()
        .show_menu_on_left_click(false)
        .menu(&menu)
        .on_menu_event(move |app, event| {
            if event.id() == quit.id() {
                app.exit(0);
            }
            if event.id == new_window.id() && app.get_webview_window("splashcreen").is_none() {
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
            if event.id() == focus_last.id() {
                let last_wrap = app.state::<LastFocusedWindow<R>>();
                if let Ok(last) = last_wrap.read() {
                    let _ = last.as_ref().and_then(|l| l.set_focus().ok());
                };
            }
        })
        .on_tray_icon_event(|_app, _event| {
            #[cfg(not(target_os = "linux"))]
            if let TrayIconEvent::Click { button, .. } = &_event {
                if *button == MouseButton::Left {
                    let last_wrap = _app.state::<LastFocusedWindow<R>>();
                    if let Ok(last) = last_wrap.read() {
                        let _ = last.as_ref().and_then(|l| l.set_focus().ok());
                    };
                }
            }
        })
        .build(app)?;
    Ok(())
}
