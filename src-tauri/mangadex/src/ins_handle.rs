use crate::intelligent_notification_system::DownloadEntries;
use special_eureka_notification::Notification;
use std::sync::Mutex;
use tauri::AppHandle;
use tauri::Manager;
use tauri::Runtime;
use tauri::State;
use uuid::Uuid;

type INSHandle = Mutex<DownloadEntries<Uuid>>;

#[cfg_attr(feature = "hotpath", hotpath::measure)]
pub fn get_ins_handle<R: Runtime>(app: &AppHandle<R>) -> State<'_, INSHandle> {
    if let Some(handle) = app.try_state::<INSHandle>() {
        handle
    } else {
        app.manage(Mutex::new(DownloadEntries::<Uuid>::new()));
        app.state()
    }
}

#[cfg_attr(feature = "hotpath", hotpath::measure)]
pub fn add_in_queue<R: Runtime>(app: &AppHandle<R>, id: Uuid) -> crate::Result<()> {
    let handle = get_ins_handle(app);
    let Ok(mut guard) = handle.lock() else {
        return Err(crate::Error::NoAccessChapterINSHandle);
    };
    guard.add_in_queue(id)?;
    Ok(())
}

#[cfg_attr(feature = "hotpath", hotpath::measure)]
fn check_and_notify<R: Runtime>(
    app: &AppHandle<R>,
    handle: &mut DownloadEntries<Uuid>,
) -> crate::Result<()> {
    if handle.is_all_finished() {
        let notif = Notification {
            summary: "Chapters Downloads Finished".into(),
            body: Some(format!(
                "Success {}\nFailed {}",
                handle.get_success_len(),
                handle.get_failed_len()
            )),
            ..Default::default()
        };
        handle.clear();
        handle.shrink_to_fit();
        {
            let app = app.clone();
            tauri::async_runtime::spawn_blocking(move || {
                notif.show(&app);
            });
        }
    }
    Ok(())
}

#[cfg_attr(feature = "hotpath", hotpath::measure)]
pub fn add_in_success<R: Runtime>(app: &AppHandle<R>, id: Uuid) -> crate::Result<()> {
    let handle = get_ins_handle(app);
    let Ok(mut guard) = handle.lock() else {
        return Err(crate::Error::NoAccessChapterINSHandle);
    };
    guard.add_in_success(id)?;
    check_and_notify(app, &mut guard)?;
    Ok(())
}

#[cfg_attr(feature = "hotpath", hotpath::measure)]
pub fn add_in_failed<R: Runtime>(app: &AppHandle<R>, id: Uuid) -> crate::Result<()> {
    let handle = get_ins_handle(app);
    let Ok(mut guard) = handle.lock() else {
        return Err(crate::Error::NoAccessChapterINSHandle);
    };
    guard.add_in_failed(id)?;
    check_and_notify(app, &mut guard)?;
    Ok(())
}
