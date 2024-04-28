use tauri::{CustomMenuItem, Menu, Runtime, WindowMenuEvent};

use crate::commands::{
    open_new_window::open_new_window_sync, toggle_decoration::toggle_decoration,
};

pub fn get_menu() -> Menu {
    Menu::new()
        .add_item(CustomMenuItem::new(String::from("home"), "Home"))
        .add_item(CustomMenuItem::new(
            String::from("new_window"),
            "New Window",
        ))
        .add_item(CustomMenuItem::new(
            String::from("toggle_decoration"),
            "Toggle Decoration",
        ))
}

pub fn on_menu_event<R: Runtime>(e: WindowMenuEvent<R>) {
    match e.menu_item_id() {
        "new_window" => {
            let _ = open_new_window_sync(e.window(), None);
        }
        "home" => {
            let _ = e.window().emit("redirect", "/");
        }
        "toggle_decoration" => {
            let _ = toggle_decoration(e.window().clone());
        }
        _ => {}
    }
}
