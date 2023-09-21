use crate::Error;
use crate::Result;
use actix_web::dev::{Server, ServerHandle};
use mangadex_api::HttpClientRef;
use mangadex_desktop_api2;
use mangadex_desktop_api2::download::DownloadTaks;
use mangadex_desktop_api2::r#static::history::HistoryMap;
use mangadex_desktop_api2::server::AppState;
use mangadex_desktop_api2::settings::files_dirs::DirsOptions;
use mangadex_desktop_api2::settings::server_options::ServerOptions;
use mangadex_desktop_api2::verify_all_fs;
use reqwest::header::HeaderMap;
use reqwest::header::HeaderValue;
use tauri::{AppHandle, Runtime, State, Window};

use super::MangadexDesktopApiHandle;

use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct LaunchArgs {
    #[serde(default = "LaunchArgs::default_download_limits")]
    download_limits : u16,
    #[serde(default)]
    user_agent : Option<String>
}

impl LaunchArgs {
    fn default_download_limits() -> u16 {
        20
    }
    fn init_http_client(&self) -> Result<HttpClientRef> {
        let mut headers = HeaderMap::new();
        let user_agent = self.user_agent.clone().unwrap_or("special-eureka-manager/0.5.2".to_string());
        let user_agent = user_agent.as_str();
        headers.insert(
            "User-Agent",
            HeaderValue::from_str(user_agent)?,
        );
        let client = reqwest::Client::builder().default_headers(headers).build()?;
        Ok(mangadex_api::v5::MangaDexClient::new(client).get_http_client())
    }
    pub async fn init_app_state(&self) -> Result<AppState> {
        verify_all_fs()?;
        let download_tasks : DownloadTaks = DownloadTaks::new(self.download_limits);
        let dir_options : DirsOptions = DirsOptions::new()?;
        let http_client_ref : HttpClientRef = self.init_http_client()?;
        let server_options : ServerOptions = ServerOptions::new()?;
        let history : HistoryMap = HistoryMap::default();
        HistoryMap::init_history_dir(&dir_options)?;
        let app_state = AppState::new(http_client_ref, dir_options, server_options, download_tasks, history);
        Ok(app_state)
    }
}

impl Default for LaunchArgs {
    fn default() -> Self {
        Self { download_limits: 20, user_agent: Some("special-eureka-manager/0.5.2".to_string()) }
    }
}

#[tauri::command(rename_all = "snake_case")]
pub async fn launch_server<R: Runtime>(
    _app: AppHandle<R>,
    _window: Window<R>,
    args : Option<LaunchArgs>,
    state: State<'_, MangadexDesktopApiHandle>,
) -> Result<String> {
    let args = args.unwrap_or_default();
    let mut inner_sirv = state.server.clone().lock_owned().await;
    let mut inner_sirv_handle = state.server_handle.clone().lock_owned().await;
    let mut inner_app_state = state.app_state.clone().lock_owned().await;
    if inner_sirv_handle.is_some() || inner_sirv.is_some() || inner_app_state.is_some() {
        return Err(Error::Io(std::io::Error::new(
            std::io::ErrorKind::AlreadyExists,
            "The server handle already exist",
        )));
    } else {
        let app_state = args.init_app_state().await?;
        let server: Server = mangadex_desktop_api2::launch_server_w_app_state(app_state.clone()).await?;
        let handle: ServerHandle = server.handle();
        inner_app_state.replace(app_state);
        inner_sirv_handle.replace(tauri::async_runtime::spawn(async move {
            return server.await;
        }));
        inner_sirv.replace(handle);
        Ok("Server launched".to_string())
    }
}
