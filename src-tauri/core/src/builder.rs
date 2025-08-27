pub mod menu;
pub mod setup;
pub mod tray;

use tauri::{Builder, Wry};
use tray::on_tray;

pub fn get_builder() -> Builder<Wry> {
    let builder = tauri::Builder::default();
    /*builder = builder
    .menu(menu::get_menu())*/
    // .on_menu_event(menu::on_menu_event);
    builder
        /*
            .register_uri_scheme_protocol("tony", |_app, req| {
                log::debug!("{:#?}", req);
                tauri::http::Response::builder()
                    .header("access-control-allow-origin", "*")
                    .status(tauri::http::status::StatusCode::OK)
                    .mimetype(tauri::http::MimeType::Txt.to_string().as_str())
                    .body(b"some string".to_vec())
            })
        */
        // .system_tray(tray::get_tray())
        // .on_system_tray_event(tray::on_system_tray_event)
        .on_tray_icon_event(on_tray)
        .invoke_handler(tauri::generate_handler![
            crate::commands::close_splashcreen::close_splashscreen,
            crate::commands::open_new_window::open_new_window,
            crate::commands::toggle_decoration::toggle_decoration,
            crate::commands::is_linux::is_linux,
            crate::commands::sys_locale::sys_locale,
            crate::commands::context_menu::context_menu
        ])
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(mangadex::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_dialog::init())
        // TODO Implement cli function
        .plugin(tauri_plugin_single_instance::init(|_app, _args, _cmd| {}))
        .setup(setup::setup)
}
