use serde::Deserialize;

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PluginConfig {
    #[serde(default)]
    user_agent: Option<String>,
    #[serde(default)]
    timeout: Option<f64>,
    sdl_export_path: String,
}
