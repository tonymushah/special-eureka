use tauri::{command, Result, Runtime, Url, Window};
use uuid::Uuid;

pub fn open_new_window_sync<R: Runtime>(window: &Window<R>, url: Option<Url>) -> Result<()> {
    let current_url = url.unwrap_or(window.url());
    Window::builder(
        window,
        Uuid::new_v4().to_string(),
        tauri::WindowUrl::External(current_url),
    )
    .title(window.title().unwrap_or(String::from("Special Eureka")))
    .decorations(if cfg!(target_os = "linux") {
        true
    } else {
        window.is_decorated().unwrap_or(true)
    })
    .build()?;
    Ok(())
}

#[command]
pub async fn open_new_window<R: Runtime>(window: Window<R>, url: Option<Url>) -> Result<()> {
    open_new_window_sync(&window, url)
}
