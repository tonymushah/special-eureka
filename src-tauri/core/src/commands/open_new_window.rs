use tauri::{AppHandle, Result, Runtime, Url, WebviewUrl, WebviewWindow, command};
use uuid::Uuid;

// use crate::builder::menu::set_menu_window;

pub fn open_new_window_sync_from_app<R: Runtime>(
    app: &AppHandle<R>,
    url: Option<WebviewUrl>,
) -> Result<()> {
    let builder = WebviewWindow::builder(
        app,
        format!("main-{}", Uuid::new_v4()),
        url.unwrap_or_default(),
    )
    .title(String::from("Special Eureka"))
    .decorations(false)
    .use_https_scheme(true);
    let _ww = builder.build()?;
    //set_menu_window(&ww.as_ref().window())?;
    Ok(())
}

pub fn open_new_window_sync<R: Runtime>(
    webview: &WebviewWindow<R>,
    url: Option<Url>,
) -> Result<()> {
    let current_url = url.unwrap_or(webview.url()?);
    let builder = WebviewWindow::builder(
        webview,
        format!("main-{}", Uuid::new_v4()),
        if tauri::is_dev() {
            tauri::WebviewUrl::External(current_url)
        } else if cfg!(windows) {
            tauri::WebviewUrl::App(current_url.path().into())
        } else {
            tauri::WebviewUrl::CustomProtocol(current_url)
        },
    )
    .title(webview.title().unwrap_or(String::from("Special Eureka")))
    .decorations(false)
    .use_https_scheme(true);

    let _ww = builder.build()?;
    Ok(())
}

#[command]
pub async fn open_new_window<R: Runtime>(window: WebviewWindow<R>, url: Option<Url>) -> Result<()> {
    open_new_window_sync(&window, url)
}
