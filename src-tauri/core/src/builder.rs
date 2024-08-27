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
        /* 
            .register_uri_scheme_protocol("tony", |_app, req| {
                println!("{:#?}", req);
                tauri::http::ResponseBuilder::new()
                    .header("access-control-allow-origin", "*")
                    .status(tauri::http::status::StatusCode::OK)
                    .mimetype(tauri::http::MimeType::Txt.to_string().as_str())
                    .body(b"some string".to_vec())
            })
        */
        .system_tray(tray::get_tray())
        .on_system_tray_event(tray::on_system_tray_event)
        .invoke_handler(tauri::generate_handler![
            close_splashscreen,
            open_new_window,
            toggle_decoration
        ])
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(mangadex::init())
        .setup(setup::setup)
}
