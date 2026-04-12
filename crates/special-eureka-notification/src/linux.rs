use std::{process::Command, time::Duration};

use crate::Notification as CrateNotification;
use tauri::{AppHandle, Runtime};

pub fn notify<R: Runtime>(app: &AppHandle<R>, notification: CrateNotification) {
    let mut cmd = Command::new("notify-send");
    cmd.args([
        "-a",
        app.config()
            .product_name
            .as_deref()
            .unwrap_or(app.config().identifier.as_str()),
    ]);
    if let Some(timeout) = notification.timeout {
        cmd.args(["-t", format!("{}", timeout.as_millis()).as_str()]);
    } else {
        cmd.args([
            "-t",
            Duration::from_millis(10000)
                .as_millis()
                .to_string()
                .as_str(),
        ]);
    }
    if let Some(urgency) = notification.urgency {
        cmd.arg("-u");
        match urgency {
            crate::Urgency::Low => {
                cmd.arg("low");
            }
            crate::Urgency::Normal => {
                cmd.arg("normal");
            }
            crate::Urgency::Critical => {
                cmd.arg("critical");
            }
        }
    }
    cmd.arg(notification.summary);
    match cmd.spawn() {
        Ok(mut child) => match child.wait() {
            Ok(e) => log::info!("Notification exited ({e})"),
            Err(err) => {
                log::error!("Cannot wait for `notify-send` command ~> {err}");
            }
        },
        Err(err) => {
            log::error!("Cannot send notification ~> {err}");
        }
    }
}

#[cfg(test)]
mod tests {
    use tauri::{Manager, test::mock_app};

    use crate::Notification;

    #[test]
    fn test_notify() {
        let app = mock_app();
        super::notify(
            app.app_handle(),
            Notification {
                summary: "aaaaaaaaaaaaaaaaaaaaaaa".into(),
                ..Default::default()
            },
        );
    }
}
