use actix_web::dev::{Server, ServerHandle};
use mangadex_desktop_api2;
use mangadex_desktop_api2::settings::server_options::ServerOptions;
use once_cell::sync::OnceCell;
use serde::{ser::Serializer, Deserialize, Serialize};
use std::{collections::HashMap, sync::Mutex, thread::JoinHandle};
use tauri::{
    command,
    plugin::{Builder, TauriPlugin},
    AppHandle, Manager, Runtime, State, Window,
};

use crate::get_indentifier;

use self::intelligent_notification_system::Download_Entry;
use tauri::api::notification::Notification;
pub mod intelligent_notification_system;
type Result<T> = std::result::Result<T, Error>;

static mut INS_CHAPTER: OnceCell<Download_Entry<String>> = OnceCell::new();

static mut INS_CHAPTER_CHECKER: OnceCell<JoinHandle<()>> = OnceCell::new();

#[derive(Serialize, Deserialize)]
struct ErrorPayload {
    result: String,
    message: String,
}

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

fn set_ins_chapter_checker_handle(joinhandle: JoinHandle<()>) -> Result<()> {
    match std::thread::spawn(move || -> Result<()> {
        unsafe {
            match INS_CHAPTER_CHECKER.set(joinhandle) {
                Ok(_) => return Ok(()),
                Err(_) => {
                    return Err(Error::Io(std::io::Error::new(
                        std::io::ErrorKind::AlreadyExists,
                        "The ins chapter checker handle already setted",
                    )));
                }
            }
        }
    })
    .join()
    {
        Ok(res) => res,
        Err(_) => Err(Error::Io(std::io::Error::new(
            std::io::ErrorKind::Other,
            "Error on loading the ins chapter checker",
        ))),
    }
}

pub fn get_ins_checker_handle() -> Result<&'static JoinHandle<()>> {
    let data_: &'static JoinHandle<()>;
    unsafe {
        match INS_CHAPTER_CHECKER.get() {
            None => {
                return Err(Error::Io(std::io::Error::new(
                    std::io::ErrorKind::NotFound,
                    "INS Chapter checker handle not found",
                )))
            }
            Some(data) => {
                data_ = data;
            }
        }
    }
    Ok(data_)
}

fn init_ins_chapter_handle() -> Result<()> {
    match std::thread::spawn(move || -> Result<()> {
        unsafe {
            match INS_CHAPTER.set(Download_Entry::new()) {
                Ok(_) => return Ok(()),
                Err(_) => Err(Error::Io(std::io::Error::new(
                    std::io::ErrorKind::AlreadyExists,
                    "The ins chapter handle already setted",
                ))),
            }
        }
    })
    .join()
    {
        Ok(res) => res,
        Err(_) => Err(Error::Io(std::io::Error::new(
            std::io::ErrorKind::Other,
            "Something inexecpeted happens when initializing the INS Handler",
        ))),
    }
}

fn get_ins_handle() -> Result<&'static Download_Entry<String>> {
    let data_: &'static Download_Entry<String>;
    unsafe {
        match INS_CHAPTER.get() {
            None => {
                return Err(Error::Io(std::io::Error::new(
                    std::io::ErrorKind::NotFound,
                    "INS CHAPTER handle not found",
                )))
            }
            Some(data) => {
                data_ = data;
            }
        }
    }
    Ok(data_)
}

fn get_ins_handle_mut() -> Result<&'static mut Download_Entry<String>> {
    let data_: &'static mut Download_Entry<String>;
    unsafe {
        match INS_CHAPTER.get_mut() {
            None => {
                return Err(Error::Io(std::io::Error::new(
                    std::io::ErrorKind::NotFound,
                    "INS CHAPTER handle not found",
                )))
            }
            Some(data) => {
                data_ = data;
            }
        }
    }
    Ok(data_)
}

fn reset_ins_handle() -> Result<()> {
    unsafe {
        match INS_CHAPTER.take() {
            None => {
                return Err(Error::Io(std::io::Error::new(
                    std::io::ErrorKind::NotFound,
                    "INS CHAPTER handle not found",
                )))
            }
            Some(_) => (),
        }
    }
    init_ins_chapter_handle()?;
    Ok(())
}

fn add_in_chapter_queue(id: String) -> Result<()> {
    let handle = get_ins_handle_mut()?;
    handle.add_in_queue(id)?;
    Ok(())
}

fn add_in_chapter_success(id: String) -> Result<()> {
    let handle = get_ins_handle_mut()?;
    handle.add_in_success(id)?;
    Ok(())
}

fn add_in_chapter_failed(id: String) -> Result<()> {
    let handle = get_ins_handle_mut()?;
    handle.add_in_failed(id)?;
    Ok(())
}

fn check_if_ins_finished() -> Result<bool> {
    let handle = get_ins_handle_mut()?;
    if handle.is_empty() == true{
        return Ok(false);
    }
    Ok(handle.is_all_finished())
}

fn check_plus_notify() -> Result<()> {
    
    let check_ = check_if_ins_finished()?;
    let ins_chapter = get_ins_handle_mut()?;
    let identifier = get_indentifier()?;
    let identifier = format!("{}", identifier);
    let notification_handle = Notification::new(identifier);
    if check_ == true {
        match notification_handle
            .title("Chapter download finished")
            .body(format!("Success {} \n Failed {}", ins_chapter.get_success_len(), ins_chapter.get_failed_len()))
            .show(){
                Ok(_) => (),
                Err(error) => {
                    println!("{}", error.to_string());
                }
            }
        reset_ins_handle()?;
    }
    Ok(())
}

#[tauri::command]
async fn download_manga(manga_id: String) -> Result<String> {
    let server_option = match ServerOptions::new() {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    let client = reqwest::Client::new();
    let request = client.put(format!(
        "http://{}:{}/manga/{}",
        server_option.hostname, server_option.port, manga_id
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)
}

#[tauri::command]
async fn update_cover_data(cover_id: String) -> Result<String> {
    let server_option = match ServerOptions::new() {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    let client = reqwest::Client::new();
    let request = client.patch(format!(
        "http://{}:{}/cover/{}",
        server_option.hostname, server_option.port, cover_id
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)
}

#[tauri::command]
async fn download_cover(cover_id: String) -> Result<String> {
    let server_option = match ServerOptions::new() {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    let client = reqwest::Client::new();
    let request = client.put(format!(
        "http://{}:{}/cover/{}",
        server_option.hostname, server_option.port, cover_id
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)
}

#[tauri::command]
async fn download_cover_with_quality(cover_id: String, quality: u32) -> Result<String> {
    let server_option = match ServerOptions::new() {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    let client = reqwest::Client::new();
    let request = client.patch(format!(
        "http://{}:{}/cover/{}/{}",
        server_option.hostname, server_option.port, cover_id, quality
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)
}

async fn download_chapter_normal_func(chapter_id: String) -> Result<String>{
    let server_option = match ServerOptions::new() {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    let client = reqwest::Client::new();
    let request = client.put(format!(
        "http://{}:{}/chapter/{}/data",
        server_option.hostname, server_option.port, chapter_id
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            add_in_chapter_failed(chapter_id)?;
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)    
}

#[tauri::command]
async fn download_chapter(chapter_id: String) -> Result<String> {
    Ok(download_chapter_normal_mode(chapter_id).await?)
}

#[tauri::command]
async fn download_chapter_normal_mode(chapter_id: String) -> Result<String> {
    let chap_id_ = chapter_id.clone();
    let chap_id__ = chapter_id.clone();
    add_in_chapter_queue(chap_id_)?;
    match download_chapter_normal_func(chapter_id).await {
        Ok(data) => {
            add_in_chapter_success(chap_id__)?;
            return Ok(data);
        },
        Err(err) => {
            add_in_chapter_failed(chap_id__)?;
            return Err(err);
        }
    }
}

#[tauri::command]
async fn download_chapter_data_saver_mode(chapter_id: String) -> Result<String> {
    let server_option = match ServerOptions::new() {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    let client = reqwest::Client::new();
    let request = client.put(format!(
        "http://{}:{}/chapter/{}/data-saver",
        server_option.hostname, server_option.port, chapter_id
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)
}

#[tauri::command]
async fn download_manga_cover(manga_id: String) -> Result<String> {
    let server_option = match ServerOptions::new() {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    let client = reqwest::Client::new();
    let request = client.put(format!(
        "http://{}:{}/manga/{}/cover",
        server_option.hostname, server_option.port, manga_id
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)
}

#[tauri::command]
async fn download_manga_covers(manga_id: String) -> Result<String> {
    let server_option = match ServerOptions::new() {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    let client = reqwest::Client::new();
    let request = client.put(format!(
        "http://{}:{}/manga/{}/covers",
        server_option.hostname, server_option.port, manga_id
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)
}

#[tauri::command]
async fn refetch_all_manga() -> Result<String> {
    let server_option = match ServerOptions::new() {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    let client = reqwest::Client::new();
    let request = client.patch(format!(
        "http://{}:{}/chapter/all/patch-manga",
        server_option.hostname, server_option.port
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)
}

#[tauri::command]
async fn patch_all_manga_cover() -> Result<String> {
    let server_option = match ServerOptions::new() {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    let client = reqwest::Client::new();
    let request = client.patch(format!(
        "http://{}:{}/mangas/all/cover",
        server_option.hostname, server_option.port
    ));
    let response = this_eureka_reqwest_result!(request);
    let response_text = match response.text().await {
        Err(e) => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                e.to_string().as_str(),
            )));
        }
        Ok(f) => f,
    };
    Ok(response_text)
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
    handle_error!(state.def.lock()).insert(handle_error!(state.key.lock()).to_string(), handle);
    Ok("server launched".to_string())
}

#[tauri::command]
async fn stop_server(state: tauri::State<'_, MangadexDesktopApiHandle>) -> Result<String> {
    let key = handle_error!(state.key.lock()).to_string();
    let mut start = handle_error!(state.def.lock());
    let handle_base = match start.get_mut(&(key)) {
        Some(data) => data,
        None => {
            return Err(Error::Io(std::io::Error::new(
                std::io::ErrorKind::Other,
                "Can't find the server handle".to_string(),
            )))
        }
    };
    let handle = handle_base.stop(true);
    tauri::async_runtime::spawn(handle);
    Ok("stopped server".to_string())
}

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
            launch_server,
            stop_server,
            refetch_all_manga,
            patch_all_manga_cover,
            download_manga_covers,
            download_manga_cover,
            download_manga,
            update_cover_data,
            download_cover,
            download_cover_with_quality,
            download_chapter,
            download_chapter_normal_mode,
            download_chapter_data_saver_mode,
            emit_events_to_webview,
            reset_queue
        ])
        .setup(move |app| {
            app.manage(MangadexDesktopApiHandle::default());
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
