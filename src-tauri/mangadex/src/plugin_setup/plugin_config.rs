use std::time::Duration;

use duration_string::DurationString;
use serde::Deserialize;
use tower::limit::RateLimitLayer;

use crate::rate_limit::SpecificRateLimitConfig;

#[derive(Debug, Clone, Deserialize)]
pub struct RateLimitConfig {
    pub(crate) number: u64,
    pub(crate) period: DurationString,
    pub(crate) specific: SpecificRateLimitConfig,
}

impl Default for RateLimitConfig {
    fn default() -> Self {
        Self {
            number: 5,
            period: DurationString::new(Duration::from_secs(1)),
            specific: Default::default(),
        }
    }
}

impl From<RateLimitConfig> for RateLimitLayer {
    fn from(value: RateLimitConfig) -> Self {
        Self::new(value.number, *value.period)
    }
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PluginConfig {
    #[serde(default)]
    pub(crate) user_agent: Option<String>,
    #[serde(default)]
    pub(crate) timeout: Option<DurationString>,
    pub(crate) sdl_export_path: String,
    #[serde(default)]
    pub(crate) ratelimit: RateLimitConfig,
    #[serde(default)]
    pub(crate) max_concurrency: Option<usize>,
}
