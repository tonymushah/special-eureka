pub mod menu;
pub mod setup;
pub mod tray;

use tauri::{Builder, Wry};

use crate::commands::{
    close_splashcreen::{__cmd__close_splashscreen, close_splashscreen},
    open_new_window::{__cmd__open_new_window, open_new_window},
    toggle_decoration::{__cmd__toggle_decoration, toggle_decoration},
};

pub fn get_builder() -> Builder<Wry> {
    let mut builder = tauri::Builder::default();
    builder = builder
        .menu(menu::get_menu())
        .on_menu_event(menu::on_menu_event);
    builder
        .system_tray(tray::get_tray())
        .on_system_tray_event(tray::on_system_tray_event)
        .invoke_handler(tauri::generate_handler![
            close_splashscreen,
            open_new_window,
            toggle_decoration
        ])
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_speu_mangadex::init())
        .setup(setup::setup)
}
