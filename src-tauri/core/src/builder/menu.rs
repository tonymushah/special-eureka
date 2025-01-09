use tauri::{
    menu::{Menu, MenuItem, Submenu},
    Emitter, EventTarget, Manager, Runtime, WebviewWindowBuilder, Window,
};

use crate::commands::{
    open_new_window::open_new_window_sync, toggle_decoration::toggle_decoration,
};

pub fn get_menu<'a, R: Runtime, M: Manager<R>>(
    manager: &M,
    mut builder: WebviewWindowBuilder<'a, R, M>,
) -> tauri::Result<WebviewWindowBuilder<'a, R, M>> {
    let menu = Menu::new(manager)?;
    let home_menu = MenuItem::new(manager, "Home", true, None::<&str>)?;
    let new_window = MenuItem::new(manager, "New window", true, None::<&str>)?;
    let toggle_deco = MenuItem::new(manager, "Toggle Decoration", true, None::<&str>)?;

    if cfg!(target_os = "macos") {
        let submenu = Submenu::new(manager, "Submenu", true)?;
        submenu.append_items(&[&home_menu, &new_window, &toggle_deco])?;
        menu.append(&submenu)?;
    } else {
        menu.append_items(&[&home_menu, &new_window, &toggle_deco])?;
    }
    builder = builder.on_menu_event(move |app, event| {
        if event.id == home_menu.id() {
            let _ = app.emit_to(
                EventTarget::Window {
                    label: app.label().into(),
                },
                "redirect",
                "/",
            );
        }
        if event.id == toggle_deco.id() {
            let _ = toggle_decoration(app.clone());
        }
        if let Some(webview) = app.webview_windows().get(app.label()) {
            if event.id == new_window.id() {
                let _ = open_new_window_sync(webview, None);
            }
        }
    });
    Ok(builder)
}

pub fn set_menu_window<R: Runtime>(window: &Window<R>) -> tauri::Result<()> {
    let menu = Menu::new(window)?;
    let home_menu = MenuItem::new(window, "Home", true, None::<&str>)?;
    let new_window = MenuItem::new(window, "New window", true, None::<&str>)?;
    let toggle_deco = MenuItem::new(window, "Toggle Decoration", true, None::<&str>)?;

    if cfg!(target_os = "macos") {
        let submenu = Submenu::new(window, "Submenu", true)?;
        submenu.append_items(&[&home_menu, &new_window, &toggle_deco])?;
        menu.append(&submenu)?;
    } else {
        menu.append_items(&[&home_menu, &new_window, &toggle_deco])?;
    }
    window.on_menu_event(move |app, event| {
        if event.id == home_menu.id() {
            let _ = app.emit_to(
                EventTarget::Window {
                    label: app.label().into(),
                },
                "redirect",
                "/",
            );
        }
        if event.id == toggle_deco.id() {
            let _ = toggle_decoration(app.clone());
        }
        if let Some(webview) = app.webview_windows().get(app.label()) {
            if event.id == new_window.id() {
                let _ = open_new_window_sync(webview, None);
            }
        }
    });
    Ok(())
}
