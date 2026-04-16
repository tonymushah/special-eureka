use crate::Notification as CrateNotification;
use notify_rust::Notification;
use tauri::{AppHandle, Runtime};

impl From<CrateNotification> for Notification {
    fn from(value: CrateNotification) -> Self {
        let mut notif = Self::new();
        notif.summary(&value.summary);
        if let Some(body) = value.body {
            notif.body(&body);
        }
        if let Some(timeout) = value.timeout {
            notif.timeout(*timeout);
        }
        #[cfg(not(target_os = "macos"))]
        if let Some(urgency) = value.urgency {
            notif.urgency(urgency.into());
        }
        notif
    }
}

impl From<crate::Urgency> for notify_rust::Urgency {
    fn from(value: crate::Urgency) -> Self {
        match value {
            crate::Urgency::Low => Self::Low,
            crate::Urgency::Normal => Self::Normal,
            crate::Urgency::Critical => Self::Critical,
        }
    }
}

pub fn notify<R: Runtime>(_app: &AppHandle<R>, notification: CrateNotification) {
    let mut notif: Notification = notification.into();
    notif.auto_icon();
    if let Err(err) = notif.show() {
        log::error!("{err}");
    }
}
