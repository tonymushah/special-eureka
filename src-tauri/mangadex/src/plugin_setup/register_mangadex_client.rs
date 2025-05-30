use mangadex_api::MangaDexClient;
use reqwest::{
    header::{HeaderMap, HeaderValue, USER_AGENT},
    Client,
};
use tauri::{Manager, Runtime};
use tower::{
    buffer::BufferLayer,
    limit::{ConcurrencyLimitLayer, RateLimitLayer},
    ServiceBuilder,
};

use super::plugin_config::PluginConfig;

pub fn register_mangadex_client<R: Runtime>(
    app: &tauri::AppHandle<R>,
    config: &PluginConfig,
) -> crate::PluginSetupResult<()> {
    let mut default_headers = HeaderMap::new();
    let default_user_agent = String::from("special-eureka/0.2.0");

    let mut ua = config.user_agent.clone().unwrap_or(default_user_agent);
    if let Some(version) = app.config().version.clone() {
        ua = ua.replacen("{{current_version}}", &version, 1);
    }
    /*
    #[cfg(debug_assertions)]
    log::debug!("{ua}");
     */

    default_headers.append(USER_AGENT, HeaderValue::from_str(&ua)?);
    let mut cli_builder = Client::builder().default_headers(default_headers);
    if let Some(timeout) = config.timeout {
        cli_builder = cli_builder.timeout(*timeout);
    }

    let rate_limit = ServiceBuilder::new()
        .layer(BufferLayer::new(1024))
        .layer(Into::<RateLimitLayer>::into(config.ratelimit.clone()));
    cli_builder = cli_builder.connector_layer(rate_limit);
    if let Some(max_concurrency) = config.max_concurrency {
        cli_builder = cli_builder.connector_layer(
            ServiceBuilder::new().layer(ConcurrencyLimitLayer::new(max_concurrency)),
        );
    }
    app.manage(MangaDexClient::new(tauri::async_runtime::block_on(
        async { cli_builder.build() },
    )?));
    Ok(())
}
