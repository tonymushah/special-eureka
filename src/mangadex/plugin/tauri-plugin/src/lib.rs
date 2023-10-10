use reqwest::header::InvalidHeaderValue;
use tauri::{
    plugin::{Builder, TauriPlugin},
    Manager, Runtime
};
pub mod utils;
pub mod intelligent_notification_system;
use ins_handle::{reset_ins_handle, set_ins_chapter_checker_handle, init_ins_chapter_handle, check_plus_notify};
use utils::set_indentifier;
use serde::{ser::Serializer, Deserialize, Serialize};
use crate::commands::{download, server};
pub mod ins_handle;
pub mod commands;
pub type Result<T> = std::result::Result<T, Error>;


#[derive(Serialize, Deserialize)]
pub struct ErrorPayload {
    result: String,
    message: String,
}

#[macro_export]
macro_rules! this_eureka_reqwest_result {
    ($to_use:expr) => {
        match $to_use.send().await {
            Err(e) => {
                return Err(Error::Io(std::io::Error::new(
                    std::io::ErrorKind::Other,
                    e.to_string().as_str(),
                )));
            }
            Ok(f) => {
                if f.status().is_success() {
                    f
                } else {
                    let to_return: ErrorPayload = match f.json().await {
                        Ok(data) => data,
                        Err(e) => {
                            return Err(Error::Io(std::io::Error::new(
                                std::io::ErrorKind::Other,
                                e.to_string().as_str(),
                            )));
                        }
                    };
                    return Err(Error::Io(std::io::Error::new(
                        std::io::ErrorKind::Other,
                        to_return.message,
                    )));
                }
            }
        }
    };
}

#[derive(Clone, serde::Serialize)]
struct ExportPayload {
    message: String,
}

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("an io error occured {0}")]
    Io(#[from] std::io::Error),
    #[error("An internal manager error occures : {0}")]
    InternalServerError(#[from] mangadex_desktop_api2::Error),
    #[error("Internal Tauri Error : {0}")]
    TauriError(#[from] tauri::Error),
    #[error("Serde json serialization error : {0}")]
    SerdeJsonError(#[from] serde_json::Error),
    #[error("reqwest crate error : {0}")]
    ReqwestError(#[from] reqwest::Error),
    #[error("invalid header value : {0}")]
    InvalidHeaderValue(#[from] InvalidHeaderValue)
}

impl Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}


#[tauri::command]
async fn reset_queue() -> Result<String>{
    reset_ins_handle()?;
    Ok("Queue reinitialized".to_string())
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("mangadex-desktop-api")
        .invoke_handler(tauri::generate_handler![
            server::launch_server,
            server::stop_server,
            server::is_server_started,
            download::refetch_all_manga,
            download::patch_all_manga_cover,
            download::download_manga_covers,
            download::download_manga_cover,
            download::download_manga,
            download::update_cover_data,
            download::download_cover,
            download::download_cover_with_quality,
            download::download_chapter,
            download::download_chapter_normal_mode,
            download::download_chapter_data_saver_mode,
            reset_queue,
            server::get_running_tasks,
            server::get_tasks_limit
        ])
        .setup(move |app| {
            let identifier = app.config().tauri.bundle.identifier.clone();

            match set_indentifier(identifier){
                    Ok(_) => (),
                    Err(err) => {
                    panic!("{}", err.to_string());
                    }
                };
            app.manage(server::MangadexDesktopApiHandle::default());
            init_ins_chapter_handle()?;
            set_ins_chapter_checker_handle(std::thread::spawn(|| {
                loop {
                    match check_plus_notify() {
                        Ok(()) => (),
                        Err(error) => {
                            println!("{}", error.to_string());
                        }
                    }
                    std::thread::sleep(std::time::Duration::from_millis(500));
                }
                
            }))?;
            Ok(())
        })
        .build()
}
