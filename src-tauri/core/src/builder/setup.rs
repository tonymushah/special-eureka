use actix::System;
use tauri::{App, Manager, Runtime};
#[cfg(any(windows, target_os = "macos"))]
use window_shadows::set_shadow;
#[cfg(target_os = "windows")]
use window_vibrancy::apply_blur;
#[cfg(target_os = "macos")]
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};

use crate::states::last_focused_window::LastFocusedWindow;

// use super::menu::set_menu_window;

type SetupResult = Result<(), Box<dyn std::error::Error>>;

pub fn setup<R: Runtime>(app: &mut App<R>) -> SetupResult {
    #[cfg(desktop)]
    app.handle()
        .plugin(tauri_plugin_updater::Builder::new().build())?;
    app.manage(LastFocusedWindow::<R>::default());
    if let Some(system) = System::try_current() {
        println!("has sys!");
        app.manage(system);
    }
    /*
    if let Some(main) = app.get_webview_window("main") {
        let _ = set_menu_window(&main.as_ref().window());
    }
    */

    #[cfg(any(windows, target_os = "macos"))]
    if let Some(splashscreen) = app.get_window("splashscreen") {
        set_shadow(&splashscreen, true).unwrap();
        #[cfg(target_os = "macos")]
        apply_vibrancy(&splashscreen, NSVisualEffectMaterial::HudWindow, None, None)
            .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

        #[cfg(target_os = "windows")]
        apply_blur(&splashscreen, Some((18, 18, 18, 125)))
            .expect("Unsupported platform! 'apply_blur' is only supported on Windows");
    }
    Ok(())
}
