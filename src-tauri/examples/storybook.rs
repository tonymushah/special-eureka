#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
//use mangadex_desktop_api2::{verify_all_fs, launch_async_server_default};

#[tokio::main]
async fn main() {
    let context = tauri::generate_context!("./examples/tauri.conf.json");
    match tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![])
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_speu_mangadex::init())
        .build(context)
    {
        Ok(app) => app.run(|_app_handle, _event| {}),
        Err(error) => {
            panic!("{}", error.to_string());
        }
    };
}
