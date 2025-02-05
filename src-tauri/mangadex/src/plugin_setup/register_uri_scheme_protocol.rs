use serde_json::Value;
use tauri::{AppHandle, Runtime};

use crate::scheme::register_scheme;

pub fn register_uri_scheme_protocol<R: Runtime>(
    app: &AppHandle<R>,
    config: Value,
) -> crate::PluginSetupResult<()> {
    register_scheme(app, config)
}
