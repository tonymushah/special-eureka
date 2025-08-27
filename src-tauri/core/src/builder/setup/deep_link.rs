use std::path::Path;

use tauri::{AppHandle, Runtime, WebviewUrl};
use tauri_plugin_deep_link::DeepLinkExt;

use crate::commands::open_new_window::open_new_window_sync_from_app;

pub fn setup<R: Runtime>(app: &AppHandle<R>) {
    let app_clone = app.clone();
    app.deep_link().on_open_url(move |event| {
        for url in event.urls() {
            if let Err(err) = open_new_window_sync_from_app(
                &app_clone,
                Some(WebviewUrl::App(Path::new(url.path()).to_path_buf())),
            ) {
                log::error!("{err}");
            }
        }
    });
}
