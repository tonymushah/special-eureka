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
	// Ref: https://github.com/tauri-apps/plugins-workspace/blob/1bb7beb3076a8bf76b084223d0e4225bb2e53bc9/plugins/notification/src/desktop.rs#L195
	#[cfg(windows)]
    {
    	let exe = match tauri::utils::platform::current_exe() {
    		Ok(exe) => exe,
    		Err(err) => {
    			log::warn!();
    			return;
    		}	
    	};
        let exe_dir = exe.parent().expect("failed to get exe directory");
        let curr_dir = exe_dir.display().to_string();
        // set the notification's System.AppUserModel.ID only when running the installed app
        if !(curr_dir.ends_with(format!("{SEP}target{SEP}debug").as_str())
            || curr_dir.ends_with(format!("{SEP}target{SEP}release").as_str()))
        {
            notif.app_id(&_app.config().identifier);
        }
    }
    #[cfg(target_os = "macos")]
    {
    	let _ = notify_rust::set_application(if tauri::is_dev() {
        	"com.apple.Terminal"
    	} else {
        	&_app.config().identifier
        });
    }

    if let Err(err) = notif.show() {
        log::error!("{err}");
    }
}
