use serde_json::Value;
use tauri::{plugin::Result, AppHandle, Runtime};

use crate::scheme::register_scheme;

pub fn register_uri_scheme_protocol<R: Runtime>(app: &AppHandle<R>, config: Value) -> Result<()> {
    register_scheme(app, config)
}
