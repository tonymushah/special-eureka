use tauri::{CustomMenuItem, Menu, Runtime, Window, WindowMenuEvent};
use uuid::Uuid;

pub fn get_menu() -> Menu {
    Menu::new()
        .add_item(CustomMenuItem::new(String::from("home"), "Home"))
        .add_item(CustomMenuItem::new(
            String::from("new_window"),
            "New Window",
        ))
}

pub fn on_menu_event<R: Runtime>(e: WindowMenuEvent<R>) {
    match e.menu_item_id() {
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
    }
}
