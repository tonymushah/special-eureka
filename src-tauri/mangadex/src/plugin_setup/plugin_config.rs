use serde::Deserialize;

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PluginConfig {
    #[serde(default)]
    pub(crate) user_agent: Option<String>,
    #[serde(default)]
    pub(crate) timeout: Option<f64>,
    pub(crate) sdl_export_path: String,
}
