use tauri::{command, Runtime, Url, Window};
use uuid::Uuid;

#[command]
pub fn open_new_window<R: Runtime>(window: Window<R>, url: Option<Url>) {
    let current_url = url.unwrap_or(window.url());
    let _ = Window::builder(
        &window,
        Uuid::new_v4().to_string(),
        tauri::WindowUrl::External(current_url),
    )
    .title("Special Eureka")
    .decorations(window.is_decorated().unwrap_or(true))
    .build();
}
