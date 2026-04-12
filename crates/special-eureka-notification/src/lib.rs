use duration_string::DurationString;
use serde::Deserialize;
use tauri::{AppHandle, Runtime};

#[cfg(target_os = "linux")]
mod linux;
#[cfg(not(target_os = "linux"))]
mod other;

#[derive(Debug, Clone, Deserialize, Default)]
pub struct Notification {
    pub summary: String,
    pub body: Option<String>,
    pub timeout: Option<DurationString>,
    pub urgency: Option<Urgency>,
}

#[derive(Debug, Clone, Copy, Deserialize)]
pub enum Urgency {
    Low,
    Normal,
    Critical,
}

impl Notification {
    pub fn show<R: Runtime>(self, app: &AppHandle<R>) {
        #[cfg(target_os = "linux")]
        {
            linux::notify(app, self);
        }
        #[cfg(not(target_os = "linux"))]
        {
            other::notify(app, self);
        }
    }
}
