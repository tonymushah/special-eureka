#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
//use mangadex_desktop_api2::{verify_all_fs, launch_async_server_default};

#[tokio::main]
async fn main() {
    let client = sentry_tauri::sentry::init((
        "https://9ded544d4e5945459c62371ec4177585@o4505556825473024.ingest.sentry.io/4505556830322688",
        sentry_tauri::sentry::ClientOptions {
            release: sentry_tauri::sentry::release_name!(),
            ..Default::default()
        },
    ));
    // Everything before here runs in both app and crash reporter processes
    let _guard = sentry_tauri::minidump::init(&client);
    // Everything after here runs in only the app process

    let context = tauri::generate_context!("./examples/tauri.conf.json");
    match tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![])
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_aptabase::Builder::new("A-EU-7568015669").build())
        .plugin(tauri_plugin_speu_mangadex::init())
        .plugin(sentry_tauri::plugin())
        .build(context)
    {
        Ok(app) => app.run(|_app_handle, _event| {}),
        Err(error) => {
            panic!("{}", error.to_string());
        }
    };
}
