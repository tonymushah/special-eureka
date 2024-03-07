use std::time::Duration;

use mangadex_api::MangaDexClient;
use reqwest::{
    header::{HeaderMap, HeaderValue, USER_AGENT},
    Client,
};
use tauri::{plugin::Result, Manager, Runtime};

use super::plugin_config::PluginConfig;

pub fn register_mangadex_client<R: Runtime>(
    app: &tauri::AppHandle<R>,
    config: &PluginConfig,
) -> Result<()> {
    let mut default_headers = HeaderMap::new();
    let default_user_agent = String::from("special-eureka 0.2.0");

    let mut ua = config.user_agent.clone().unwrap_or(default_user_agent);
    if let Some(version) = app.config().package.version.clone() {
        ua = ua.replacen("{{current_version}}", &version, 1);
    }
    /*
    #[cfg(debug_assertions)]
    println!("{ua}");
     */

    default_headers.append(USER_AGENT, HeaderValue::from_str(&ua)?);
    let mut cli_builder = Client::builder().default_headers(default_headers);
    if let Some(timeout) = config.timeout {
        cli_builder = cli_builder.timeout(Duration::from_secs_f64(timeout));
    }
    app.manage(MangaDexClient::new(cli_builder.build()?));
    Ok(())
}
