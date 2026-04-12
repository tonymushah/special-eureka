use special_eureka_notification::Notification;
use tauri::{AppHandle, Runtime};

#[tauri::command]
pub async fn send_notification<R: Runtime>(app: AppHandle<R>, notification: Notification) {
    notification.show(&app);
}
