pub mod deep_link;
pub mod tray;

use actix::System;
use tauri::{App, Manager, Runtime};

use crate::states::last_focused_window::LastFocusedWindow;

// use super::menu::set_menu_window;

type SetupResult = Result<(), Box<dyn std::error::Error>>;

pub fn setup<R: Runtime>(app: &mut App<R>) -> SetupResult {
    #[cfg(all(desktop, feature = "updater"))]
    app.handle()
        .plugin(tauri_plugin_updater::Builder::new().build())?;
    app.manage(LastFocusedWindow::<R>::default());
    if let Some(system) = System::try_current() {
        log::debug!("has sys!");
        app.manage(system);
    }
    /*
    if let Some(main) = app.get_webview_window("main") {
        let _ = set_menu_window(&main.as_ref().window());
    }
    */
    deep_link::setup(app.app_handle());
    if let Err(err) = tray::setup(app.app_handle()) {
        log::error!("{err}");
    }
    Ok(())
}
