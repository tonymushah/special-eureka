use crate::intelligent_notification_system::DownloadEntry;
use std::sync::Mutex;
use tauri::AppHandle;
use tauri::Manager;
use tauri::Runtime;
use tauri::State;
use tauri_plugin_notification::NotificationExt;
use tauri_plugin_notification::PermissionState;
use uuid::Uuid;

type INSHandle = Mutex<DownloadEntry<Uuid>>;

pub fn get_ins_handle<R: Runtime>(app: &AppHandle<R>) -> State<'_, INSHandle> {
    if let Some(handle) = app.try_state::<INSHandle>() {
        handle
    } else {
        app.manage(Mutex::new(DownloadEntry::<Uuid>::new()));
        app.state()
    }
}

pub fn add_in_queue<R: Runtime>(app: &AppHandle<R>, id: Uuid) -> crate::Result<()> {
    let handle = get_ins_handle(app);
    let Ok(mut guard) = handle.lock() else {
        return Err(crate::Error::NoAccessChapterINSHandle);
    };
    guard.add_in_queue(id)?;
    Ok(())
}

fn check_and_notify<R: Runtime>(
    app: &AppHandle<R>,
    handle: &mut DownloadEntry<Uuid>,
) -> crate::Result<()> {
    if handle.is_all_finished() {
        if app.notification().permission_state()? == PermissionState::Prompt {
            app.notification().request_permission()?;
        }
        if app.notification().permission_state()? == PermissionState::Granted {
            let res = app
                .notification()
                .builder()
                .title("Chapters Downloads Finished")
                .body(format!(
                    "Success {}\nFailed{}",
                    handle.get_success_len(),
                    handle.get_failed_len()
                ))
                .show();
            handle.clear();
            res?;
        }
    }
    Ok(())
}

pub fn add_in_success<R: Runtime>(app: &AppHandle<R>, id: Uuid) -> crate::Result<()> {
    let handle = get_ins_handle(app);
    let Ok(mut guard) = handle.lock() else {
        return Err(crate::Error::NoAccessChapterINSHandle);
    };
    guard.add_in_success(id)?;
    check_and_notify(app, &mut guard)?;
    Ok(())
}

pub fn add_in_failed<R: Runtime>(app: &AppHandle<R>, id: Uuid) -> crate::Result<()> {
    let handle = get_ins_handle(app);
    let Ok(mut guard) = handle.lock() else {
        return Err(crate::Error::NoAccessChapterINSHandle);
    };
    guard.add_in_failed(id)?;
    check_and_notify(app, &mut guard)?;
    Ok(())
}
