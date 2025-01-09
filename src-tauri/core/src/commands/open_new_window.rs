use tauri::{command, AppHandle, Result, Runtime, Url, WebviewUrl, WebviewWindow};
use uuid::Uuid;

use crate::builder::menu::get_menu;

pub fn open_new_window_sync_from_app<R: Runtime>(
    app: &AppHandle<R>,
    url: Option<WebviewUrl>,
) -> Result<()> {
    let mut builder = WebviewWindow::builder(
        app,
        format!("main-{}", Uuid::new_v4()),
        url.unwrap_or_default(),
    )
    .title(String::from("Special Eureka"));
    if cfg!(desktop) {
        builder = get_menu(app, builder)?;
    }
    builder.build()?;
    Ok(())
}

pub fn open_new_window_sync<R: Runtime>(
    webview: &WebviewWindow<R>,
    url: Option<Url>,
) -> Result<()> {
    let current_url = url.unwrap_or(webview.url()?);
    let mut builder = WebviewWindow::builder(
        webview,
        format!("main-{}", Uuid::new_v4()),
        tauri::WebviewUrl::External(current_url),
    )
    .title(webview.title().unwrap_or(String::from("Special Eureka")))
    .decorations(if cfg!(target_os = "linux") {
        true
    } else {
        webview.is_decorated().unwrap_or(true)
    });
    if cfg!(desktop) {
        builder = get_menu(webview, builder)?;
    }

    builder.build()?;
    Ok(())
}

#[command]
pub async fn open_new_window<R: Runtime>(window: WebviewWindow<R>, url: Option<Url>) -> Result<()> {
    open_new_window_sync(&window, url)
}
