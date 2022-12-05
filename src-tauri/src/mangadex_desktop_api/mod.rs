use actix_web::dev::{Server, ServerHandle};
use mangadex_desktop_api2;
use serde::{ser::Serializer, Serialize};
use std::{collections::HashMap, sync::Mutex, };
use tauri::{
    command,
    plugin::{Builder, TauriPlugin},
    AppHandle, Manager, Runtime, State, Window,
};
type Result<T> = std::result::Result<T, Error>;

#[derive(Clone)]
struct Payload {
    message: String,
    level : log::Level
}
#[derive(Clone, serde::Serialize)]
struct ExportPayload {
    message: String
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

#[derive(Default)]
struct MyState(Mutex<HashMap<String, String>>);

//#[derive(Default)]
struct MangadexDesktopApiHandle {
    key: Mutex<String>,
    def: Mutex<HashMap<String, ServerHandle>>,
}

impl Default for MangadexDesktopApiHandle {
    fn default() -> Self {
        let hash_maps: HashMap<String, ServerHandle> = HashMap::new();
        MangadexDesktopApiHandle {
            def: Mutex::new(hash_maps),
            key: Mutex::new("default".to_string()),
        }
    }
}

// remember to call `.manage(MyState::default())`
#[command]
async fn launch_server<R: Runtime>(
    _app: AppHandle<R>,
    _window: Window<R>,
    state: State<'_, MangadexDesktopApiHandle>,
) -> Result<String> {
    mangadex_desktop_api2::verify_all_fs()?;
    let server: Server = mangadex_desktop_api2::launch_async_server_default()?;
    let handle: ServerHandle = server.handle();
    tauri::async_runtime::spawn(server);
    state.def.lock().expect("can't get the hashmap").insert(
        state.key.lock().expect("can't get the key").to_string(),
        handle,
    );
    Ok("server launched".to_string())
}

#[tauri::command]
async fn stop_server(state: tauri::State<'_, MangadexDesktopApiHandle>) -> Result<String> {
    let key = state.key.lock().expect("can't get the key").to_string();
    let mut start = state.def.lock().expect("can't get the hashmap");
    let handle_base = start.get_mut(&(key)).expect("can't get the current handle");
    let handle = handle_base.stop(true);
    tauri::async_runtime::spawn(handle);
    Ok("stopped server".to_string())
}

/*fn emit_events<R: Runtime>(app_handle: &AppHandle<R>) -> fern::Output {
    let app = app_handle.app_handle();
    fern::Output::call(move|record| {
        if record.level() == log::LevelFilter::Info {
            app.emit_all(
                "mangadesk_api_info",
                Payload {
                    message: record.args().to_string(),
                },
            )
            .unwrap();
        } else if record.level() == log::LevelFilter::Warn {
            app.emit_all(
                "mangadesk_api_warn",
                Payload {
                    message: record.args().to_string(),
                },
            )
            .unwrap();
        } else if record.level() == log::LevelFilter::Debug {
            app.emit_all(
                "mangadesk_api_debug",
                Payload {
                    message: record.args().to_string(),
                },
            )
            .unwrap();
        } else if record.level() == log::LevelFilter::Error {
            app.emit_all(
                "mangadex_api_error",
                Payload {
                    message: record.args().to_string(),
                },
            )
            .unwrap();
        } else if record.level() == log::LevelFilter::Trace {
            app.emit_all(
                "mangadesk_api_trace",
                Payload {
                    message: record.args().to_string(),
                },
            )
            .unwrap();
        }
        println!(" log : {}", record.args().to_string());
    })
}*/

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("mangadex-desktop-api")
        .invoke_handler(tauri::generate_handler![launch_server, stop_server])
        .setup(move |app| {
            let app2 = app.app_handle();
            app.manage(MyState::default());
            app.manage(MangadexDesktopApiHandle::default());
            let out_put = fern::Output::call(move |record1|{
                let payload : Payload = Payload { message: record1.args().to_string(), level : record1.level() };
                //let app2 = app3.app_handle();
                    if payload.level == log::LevelFilter::Info {
                            app2.emit_all(
                                "info",
                                ExportPayload{
                                    message : payload.message
                                }
                            )
                            .unwrap();
                        } else if payload.level == log::LevelFilter::Warn {
                            app2.emit_all(
                                "warn",
                                ExportPayload{
                                    message : payload.message
                                }
                            )
                            .unwrap();
                        } else if payload.level == log::LevelFilter::Debug {
                            app2.emit_all(
                                "debug",
                                ExportPayload{
                                    message : payload.message
                                }
                            )
                            .unwrap();
                        } else if payload.level == log::LevelFilter::Error {
                            app2.emit_all(
                                "error",
                                ExportPayload{
                                    message : payload.message
                                }
                            )
                            .unwrap();
                        } else if payload.level == log::LevelFilter::Trace {
                            app2.emit_all(
                                "trace",
                                ExportPayload{
                                    message : payload.message
                                }
                            )
                            .unwrap();
                        }
                    println!(" log : {}", record1.args().to_string());
                });
            fern::Dispatch::new()
                .level(log::LevelFilter::Info)
                .chain(out_put)
                .apply()?;
            app.listen_global("info", |event| {
                println!("event captured {:?}", event.payload());
            });
            Ok(())
        })
        .build()
}
