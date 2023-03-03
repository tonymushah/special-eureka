use tauri::{
    plugin::{Builder, TauriPlugin},
    AppHandle, Manager, Runtime
};
pub mod utils;
pub mod intelligent_notification_system;
use ins_handle::{reset_ins_handle, set_ins_chapter_checker_handle, init_ins_chapter_handle, check_plus_notify};
use utils::{set_indentifier};
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

#[macro_export]
macro_rules! handle_error {
    ($to_use:expr) => {
        match $to_use {
            Err(e) => {
                return Err(Error::Io(std::io::Error::new(
                    std::io::ErrorKind::Other,
                    e.to_string().as_str(),
                )))
            }
            Ok(f) => f,
        }
    };
}

#[derive(Clone, serde::Serialize)]
struct ExportPayload {
    message: String,
}

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error(transparent)]
    Io(#[from] std::io::Error),
}

impl Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

//#[derive(Default)]


// remember to call `.manage(MyState::default())`

fn emit_events<R: Runtime>(app_handle: AppHandle<R>) -> fern::Output {
    fern::Output::call(move |record| {
        let app = &app_handle;
        if record.level() == log::LevelFilter::Info {
            app.emit_all(
                "mangadesk_api_info",
                ExportPayload {
                    message: record.args().to_string(),
                },
            )
            .unwrap();
        } else if record.level() == log::LevelFilter::Warn {
            app.emit_all(
                "mangadesk_api_warn",
                ExportPayload {
                    message: record.args().to_string(),
                },
            )
            .unwrap();
        } else if record.level() == log::LevelFilter::Debug {
            app.emit_all(
                "mangadesk_api_debug",
                ExportPayload {
                    message: record.args().to_string(),
                },
            )
            .unwrap();
        } else if record.level() == log::LevelFilter::Error {
            app.emit_all(
                "mangadex_api_error",
                ExportPayload {
                    message: record.args().to_string(),
                },
            )
            .unwrap();
        } else if record.level() == log::LevelFilter::Trace {
            app.emit_all(
                "mangadesk_api_trace",
                ExportPayload {
                    message: record.args().to_string(),
                },
            )
            .unwrap();
        }
        println!(" log : {}", record.args().to_string());
    })
}

#[tauri::command]
async fn reset_queue() -> Result<String>{
    reset_ins_handle()?;
    Ok("Queue reinitialized".to_string())
}

#[tauri::command]
async fn emit_events_to_webview<R: Runtime>(app: tauri::AppHandle<R>) -> Result<String> {
    let output = emit_events(app);
    let dispatch = fern::Dispatch::new().chain(output);
    match dispatch.apply() {
        Ok(_) => (),
        Err(error) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                error.to_string(),
            )))
        }
    };
    Ok("Result setted".into())
}

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("mangadex-desktop-api")
        .invoke_handler(tauri::generate_handler![
            server::launch_server,
            server::stop_server,
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
            emit_events_to_webview,
            reset_queue
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
