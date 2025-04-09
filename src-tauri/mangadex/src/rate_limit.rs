use std::{num::NonZero, time::Duration};

use duration_string::DurationString;
use governor::DefaultDirectRateLimiter;
use governor::Quota;
use serde::Deserialize;

#[derive(Debug, Clone, Deserialize)]
pub struct SpecificRateLimitConfigEntry {
    pub num: NonZero<u32>,
    pub duration: DurationString,
}

impl From<&SpecificRateLimitConfigEntry> for Quota {
    fn from(value: &SpecificRateLimitConfigEntry) -> Self {
        Self::with_period(*value.duration)
            .unwrap_or(Self::per_minute(NonZero::new(5).unwrap()))
            .allow_burst(value.num)
    }
}

impl From<SpecificRateLimitConfigEntry> for Quota {
    fn from(value: SpecificRateLimitConfigEntry) -> Self {
        (&value).into()
    }
}

macro_rules! specific {
    ($($name:ident = {$num:expr, $period:expr}, )*) => {
		#[derive(Debug, Clone, Deserialize)]
		#[serde(default)]
		pub struct SpecificRateLimitConfig {
			$(
				pub $name: SpecificRateLimitConfigEntry,
			)*
		}

		impl Default for SpecificRateLimitConfig {
			fn default() -> Self {
				Self {
					$(
						$name: SpecificRateLimitConfigEntry {
							num: $num,
							duration: $period
						},
					)*
				}
			}
		}
		pub struct SpecificRateLimits {
			$(pub $name: DefaultDirectRateLimiter,)*
		}
		impl From<&SpecificRateLimitConfig> for SpecificRateLimits {
			fn from(value: &SpecificRateLimitConfig) -> Self {
				Self {
					$($name: DefaultDirectRateLimiter::direct((&value.$name).into()),)*
				}
			}
		}
		impl From<SpecificRateLimitConfig> for SpecificRateLimits {
			fn from(value: SpecificRateLimitConfig) -> Self {
				Self {
					$($name: DefaultDirectRateLimiter::direct(value.$name.into()),)*
				}
			}
		}
	};
}

specific! {
    // AtHome
    at_home = {
        NonZero::new(40).unwrap(),
        Duration::from_secs(60).into()
    },
    // Authentication
    login = {
        NonZero::new(30).unwrap(),
        Duration::from_secs(60 * 60).into()
    },
    refresh = {
        NonZero::new(60).unwrap(),
        Duration::from_secs(60 * 60).into()
    },
    // Author
    post_author = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60 * 60).into()
    },
    put_author = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60).into()
    },
    delete_author = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60 * 10).into()
    },
    // Captcha (reCaptcha)
    solve_captcha = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60 * 10).into()
    },
    // Cover
    post_cover = {
        NonZero::new(100).unwrap(),
        Duration::from_secs(60 * 10).into()
    },
    put_cover = {
        NonZero::new(100).unwrap(),
        Duration::from_secs(60 * 10).into()
    },
    delete_cover = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60 * 10).into()
    },
    // Chapter
    read_chapter = {
        NonZero::new(300).unwrap(),
        Duration::from_secs(60 * 10).into()
    },
    put_chapter = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60).into()
    },
    delete_chapter = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60).into()
    },
    // Forums
    post_thread = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60).into()
    },
    // Manga
    post_manga = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60 * 60).into()
    },
    put_manga = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60 * 60).into()
    },
    delete_manga = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60 * 10).into()
    },
    commit_manga_draft = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60 * 60).into()
    },
    random_manga = {
        NonZero::new(60).unwrap(),
        Duration::from_secs(60).into()
    },
    // Reports
    post_report = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60).into()
    },
    get_report = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60).into()
    },
    // Scanlation Group
    post_group = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60 * 60).into()
    },
    put_group = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60).into()
    },
    delete_group = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60 * 10).into()
    },
    // Upload
    // -> Sessions
    get_upload = {
        NonZero::new(30).unwrap(),
        Duration::from_secs(60).into()
    },
    begin_upload = {
        NonZero::new(20).unwrap(),
        Duration::from_secs(60).into()
    },
    commit_upload = {
        NonZero::new(10).unwrap(),
        Duration::from_secs(60).into()
    },
    delete_upload = {
        NonZero::new(30).unwrap(),
        Duration::from_secs(60).into()
    },
    // -> Files
    upload_files = {
        NonZero::new(250).unwrap(),
        Duration::from_secs(60).into()
    },
}
