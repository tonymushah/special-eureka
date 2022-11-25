
use serde::{ser::Serializer, Serialize};
use tauri::{
  command,
  plugin::{Builder, TauriPlugin},
  AppHandle, Manager, Runtime, State, Window
};
use mangadex_desktop_api2;
use std::{collections::HashMap, sync::Mutex};
use actix_web::dev::{Server, ServerHandle};
type Result<T> = std::result::Result<T, Error>;

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
  key : Mutex<String>,
  def : Mutex<
    HashMap<String, ServerHandle>
  >
}

impl Default for MangadexDesktopApiHandle {
  fn default() -> Self {
    let hash_maps : HashMap<String, ServerHandle> = HashMap::new();
      MangadexDesktopApiHandle{
        def : Mutex::new(
          hash_maps
        ),
        key : Mutex::new("default".to_string())
      }
  }
}

// remember to call `.manage(MyState::default())`
#[command]
async fn launch_server<R : Runtime>(
  _app: AppHandle<R>,
  _window: Window<R>,
  state: State<'_, MangadexDesktopApiHandle>,
) -> Result<String>{
  mangadex_desktop_api2::verify_all_fs()?;
  let server: Server = mangadex_desktop_api2::launch_async_server_default()?;
  let handle: ServerHandle = server.handle();
  tauri::async_runtime::spawn(server);
  state.def.lock().expect("can't get the hashmap").insert(
    state.key.lock().expect("can't get the key").to_string(), handle);
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

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("mangadex-desktop-api")
    .invoke_handler(tauri::generate_handler![
      launch_server,
      stop_server
    ])
    .setup(|app| {
      app.manage(MyState::default());
      app.manage(MangadexDesktopApiHandle::default());
      Ok(())
    })
    .build()
}
