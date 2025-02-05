#[cfg(debug_assertions)]
mod export_sdl;
mod init_client_state;
mod init_states;
mod init_watches_states;
mod plugin_config;
mod register_mangadex_client;
mod register_uri_scheme_protocol;

use async_graphql::Schema;
use serde_json::Value;

#[cfg(debug_assertions)]
use export_sdl::export_sdl;
use tauri::{AppHandle, Runtime};

use crate::{M, Q, S};

use self::plugin_config::PluginConfig;

use init_states::init_states;
use register_mangadex_client::register_mangadex_client;
use register_uri_scheme_protocol::register_uri_scheme_protocol;

pub type PluginSetupResult<T> = Result<T, Box<dyn std::error::Error>>;

pub fn setup<R: Runtime>(
    app: &AppHandle<R>,
    config: Value,
    schema: &Schema<Q, M, S>,
) -> crate::PluginSetupResult<()> {
    let plug_config: PluginConfig = serde_json::from_value(config.clone())?;
    #[cfg(debug_assertions)]
    export_sdl(schema, &plug_config)?;
    register_mangadex_client(app, &plug_config)?;
    init_states(app)?;
    register_uri_scheme_protocol(app, config)?;
    Ok(())
}
